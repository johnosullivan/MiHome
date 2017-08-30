#include <SPI.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <RH_RF69.h>
#include <ArduinoJson.h>
#include <Ticker.h>

#include "WiFiManager.h" 

#define RF69_FREQ 915.0
#define RFM69_CS      2    
#define RFM69_IRQ     15   
#define RFM69_RST     16   
#define LED           0
#define FREQUENCY RF69_915MHZ
RH_RF69 rf69(RFM69_CS, RFM69_IRQ);

Ticker ticker;

// The data variables
double temperature = 0;
double humidity = 0;
double co2 = 0;
double voc = 0;
double visible = 0;
double UV = 0;
double IR = 0;
double light = 0;
double pressure = 0;

// Setups up the Arduino Wifi 
//const char* ssid     = "";
//const char* password = "";
// The WiFi Host and PostURL
const char* postURI = "http://pacific-springs-32410.herokuapp.com/";

void tick()
{
  int state = digitalRead(0);  // get the current state of GPIO1 pin
  digitalWrite(LED, !state);     // set pin to the opposite state
}

void configModeCallback (WiFiManager *myWiFiManager) {
  ticker.attach(0.5, tick);
}

void setup() 
{
  Wire.begin();
  Serial.begin(9600);
  //delay(5000);
  //while (!Serial) { delay(1000); } 
  delay(5000);
  pinMode(0, OUTPUT);
  //Connecting to the WiFi network
  WiFiManager wifiManager;
  wifiManager.setDebugOutput(false);
  Serial.println(); 
  Serial.print("Connecting... "); 
  Serial.println(WiFi.macAddress());
  wifiManager.setAPCallback(configModeCallback);
  wifiManager.autoConnect("MiHome");
   
  //Serial.println(ssid);  
  //WiFi.begin(ssid,password);
  //while (WiFi.status() != WL_CONNECTED) {
  //  delay(1000);
  //}
  // Prints details to the serial ports
  Serial.println();
  Serial.println("-----------------------------------------");
  Serial.println("ESP8266 (WiFi): RFM69 TX/RX Hub");
  Serial.println("-----------------------------------------");
  Serial.println("WiFi Connected => Details: "); 
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Netmask: ");
  Serial.println(WiFi.subnetMask());
  Serial.println("Gateway: ");
  Serial.println(WiFi.gatewayIP());
  Serial.println("Mac Address: ");
  Serial.println(WiFi.macAddress());
  Serial.println("-----------------------------------------");
  Serial.println();
  delay(2000);
  
  pinMode(LED, OUTPUT);    
  pinMode(RFM69_RST, OUTPUT);
  digitalWrite(RFM69_RST, LOW);
  // Reset
  digitalWrite(RFM69_RST, HIGH);
  delay(10);
  digitalWrite(RFM69_RST, LOW);
  delay(10);

  ticker.detach();

  if (!rf69.init()) {
    Serial.println("RFM69 Radio Init. Failed!");
    int status = 1;
    while (1) {
      if (status) {
        wifiManager.resetSettings();
        status = 0;
      }
      delay(5000);
    }
  }
  Serial.println("RFM69 Radio Init Good!");

  if (!rf69.setFrequency(RF69_FREQ)) {
    Serial.println("Setting Frequency Failed!");
  }

  rf69.setTxPower(20, true); 

  uint8_t key[] = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08};
  rf69.setEncryptionKey(key);
    
  Serial.print("RFM69 Radio @");  Serial.print((int)RF69_FREQ);  Serial.println(" MHz");
  Serial.println();
}

void send(String payload,int size) {
  // Creates the JSON object and POST it to the web server
  Serial.println("[Send Start]");
  Serial.print("Radio Response: ");
  Serial.print(payload);
  
  char sz[size];
  payload.toCharArray(sz, size);
  char *p = sz;
  char *str;
  int index = 0;
  while ((str = strtok_r(p, ";", &p)) != NULL) {
    if (index == 0) { temperature = strtod(str,NULL); }
    if (index == 1) { humidity = strtod(str,NULL); }
    if (index == 2) { co2 = strtod(str,NULL); }
    if (index == 3) { voc = strtod(str,NULL); }
    if (index == 4) { visible = strtod(str,NULL); }
    if (index == 5) { light = strtod(str,NULL); }
    if (index == 6) { UV = strtod(str,NULL); }
    if (index == 7) { IR = strtod(str,NULL); }
    if (index == 8) { pressure = strtod(str,NULL); }
    index++;
  }
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["temperature"] = temperature;
  root["humidity"] = humidity;
  root["co2"] = co2;
  root["voc"] = voc;
  root["visible"] = visible;
  root["light"] = light;
  root["UV"] = UV;
  root["IR"] = IR;
  root["pressure"] = pressure;
  char cbuf[256];
  root.printTo(cbuf,sizeof(cbuf));
  Serial.print("Post Payload: ");
  Serial.println(cbuf);
  
  String content = cbuf;
  HTTPClient http;
  http.begin(postURI);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(content);
  Serial.print("HTTP-Status-Code: ");
  Serial.println(httpCode);
  if(httpCode == 200) {
     String res = http.getString();
     Serial.print("Response: ");
     Serial.println(res);
  }
  http.end();
  Blink(LED, 100, 5); 
  Serial.println("[Send End]");
}

String transmit(String name) {
  digitalWrite(LED,HIGH);
  char radiopacket[20];
  name.toCharArray(radiopacket, 20);
  //itoa(packetnum++, radiopacket+13, 10);
  Serial.print("Sending - Command Data: ");
  rf69.send((uint8_t *)radiopacket, strlen(radiopacket));
  rf69.waitPacketSent();
  uint8_t buf[RH_RF69_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);
  String res = "";
  if (rf69.waitAvailableTimeout(2000))  { 
    if (rf69.recv(buf, &len)) {
      //Serial.print("Response: ");
      //Serial.println((char*)buf);
      res = (char*)buf;
      Blink(LED, 200, 3); 
    } else { }
  } else { 
    Serial.print("No Response?");
    Serial.println();   
  }
  return res;
}

void loop() {
  String data = transmit("data");
  if (data != "") {
    Serial.print(data);
    Serial.println();  
    send(data,data.length());
  }
  delay(60000);
}
void blink(){
  Serial.println("blinking");  
}
void Blink(byte PIN, byte DELAY_MS, byte loops) {
  for (byte i=0; i<loops; i++)  {
    digitalWrite(PIN,HIGH);
    delay(DELAY_MS);
    digitalWrite(PIN,LOW);
    delay(DELAY_MS);
  }
}
