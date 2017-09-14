#include <SPI.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <RH_RF69.h>
#include <ArduinoJson.h>
#include <Ticker.h>
// WiFi AP Mode library for setup on on the hub
#include "WiFiManager.h" 
// Radio Configs
#define RF69_FREQ 915.0
#define RFM69_CS      2    
#define RFM69_IRQ     15   
#define RFM69_RST     16   
#define LED           0
#define FREQUENCY RF69_915MHZ
RH_RF69 rf69(RFM69_CS, RFM69_IRQ);
// For the blinking light on setup
Ticker ticker;
// Socket.IO library for the node setup process
#include "SocketIoClient.h"
SocketIoClient webSocket;
// The data points
double temperature = 0;
double humidity = 0;
double co2 = 0;
double voc = 0;
double visible = 0;
double UV = 0;
double IR = 0;
double light = 0;
double pressure = 0;
// Debugging tool
bool isSending = 1;
// Setups up the Arduino Wifi
//const char* ssid     = "";
//const char* password = "";

// The WiFi Host and PostURL
const char* postURI = "http://pacific-springs-32410.herokuapp.com/api/data"; 
const char* nodeID = "00000012340987011";

const char* socketHost = "192.168.50.52";
const int socketPort = 8888;
const char* socketPath = "/socket.io/?transport=websocket";

long previousMillis = 0;        
long interval = 60000;

int setup_status = 0;
 
void tick()
{
  int state = digitalRead(0);  
  digitalWrite(LED, !state);
}

void configModeCallback (WiFiManager *myWiFiManager) {
  ticker.attach(0.5, tick);
}

void webSocketDeviceCallBack(const char * payload, size_t length) {
  Serial.println(payload);
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(payload);
  const char* command = root["command"];
  const char* data_payload = root["payload"];
  Serial.println(command);
  Serial.println(data_payload);
  String setup_data = transmit(command);
  if (setup_data != "") {  
    Serial.println(setup_data);
  } else {
      
  }
  webSocket.emit("back", "\"ok\"");   
}
void webSocketConnect(const char * payload, size_t length) { }

void setup() 
{
  Wire.begin();
  Serial.begin(9600);
  // Default setup led blinking
  pinMode(LED, OUTPUT);  
  Blink(LED, 1000, 2); 
  Blink(LED, 100, 5);
  Blink(LED, 1000, 2); 
  // Settle delay
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
  // Setuping the pins  
  pinMode(RFM69_RST, OUTPUT);
  digitalWrite(RFM69_RST, LOW);
  // Reset Radio
  digitalWrite(RFM69_RST, HIGH);
  delay(10);
  digitalWrite(RFM69_RST, LOW);
  delay(10);
  // Setting up the radio
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
  ticker.detach();
  if (!rf69.setFrequency(RF69_FREQ)) {
    Serial.println("Setting Frequency Failed!");
  }
  // Sets the power and the encryption key
  rf69.setTxPower(20, true); 
  uint8_t key[] = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08};
  rf69.setEncryptionKey(key);
  // Prints out the final details
  Serial.print("RFM69 Radio @");  Serial.print((int)RF69_FREQ);  Serial.println(" MHz");
  Serial.println();

  webSocket.on("connect", webSocketConnect);
  webSocket.on(nodeID, webSocketDeviceCallBack);
  webSocket.begin(socketHost, socketPort, socketPath); 
} 

void parse(String payload,int size,String command) {
  // Creates the JSON object and POST it to the web server
  Serial.print("[Parse Start] Body Size: ");
  Serial.println(size);
  Serial.print("Radio Response: ");
  Serial.println(payload);
  // Creates the sized char for the paylaod
  char sz[size];
  payload.toCharArray(sz, size);
  char *p = sz;
  char *str;
  int index = 0;
  while ((str = strtok_r(p, ";", &p)) != NULL) {
    if (command == "data_1") {
      if (index == 0) { temperature = strtod(str,NULL); }
      if (index == 1) { humidity = strtod(str,NULL); }
      if (index == 2) { co2 = strtod(str,NULL); }
      if (index == 3) { voc = strtod(str,NULL); }
      if (index == 4) { visible = strtod(str,NULL); } 
    }
    if (command == "data_2") {
      if (index == 0) { light = strtod(str,NULL); }
      if (index == 1) { UV = strtod(str,NULL); }
      if (index == 2) { IR = strtod(str,NULL); }
      if (index == 3) { pressure = strtod(str,NULL); }
    }
    index++;
  }
  Serial.println("[Parse End]");
}

void send() {
  if (isSending) {
    Serial.println("[Send Start]");
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
    root["nodeID"] = nodeID;
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
}

String transmit(String name) {
  digitalWrite(LED,HIGH);
  char radiopacket[20];
  name.toCharArray(radiopacket, 20); 
  //itoa(packetnum++, radiopacket+13, 10);
  Serial.print("Sending - Command Data: ");
  Serial.println(name);
  rf69.send((uint8_t *)radiopacket, strlen(radiopacket));
  rf69.waitPacketSent();
  uint8_t buf[RH_RF69_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);
  String res = "";
  if (rf69.waitAvailableTimeout(2000))  { 
    if (rf69.recv(buf, &len)) {
      Serial.print("Response: ");
      Serial.println((char*)buf);
      res = (char*)buf;
      Blink(LED, 200, 3); 
    } else { }
  } else { 
    Serial.print("No Response?");
    digitalWrite(LED,LOW);
    Serial.println();   
  }
  return res;
}

void loop() {
  // Loops the websocket for the client 
  webSocket.loop();

  /*if (setup_status) {
    String setup_data = transmit("setup");
    if (setup_data != "") {  
      Serial.println(setup_data);
    } else {
      
    }
    setup_status = 0;
  }*/
  
  // Gets the current timestamp in millis()
  unsigned long currentMillis = millis();
  // Check the time pasted to see if match interval
  if(currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;
    
    String data_1 = transmit("data_1");
    if (data_1 != "") {  
      parse(data_1,data_1.length(),"data_1");
    }
    
    String data_2 = transmit("data_2");
    if (data_2 != "") {
      parse(data_2,data_2.length(),"data_2");
    }
 
    send();
  }
  
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
