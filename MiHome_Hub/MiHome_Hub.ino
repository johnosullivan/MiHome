#include <SPI.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <RH_RF69.h>
#include <ArduinoJson.h>
#include <Ticker.h>
#include <Adafruit_NeoPixel.h>

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
bool isSending = 0;
// Setups up the Arduino Wifi
//const char* ssid     = "";
//const char* password = "";

//int Reset = 14;
 
#define NEOPIN 4
#define NEOSIZE 1
Adafruit_NeoPixel neostrip = Adafruit_NeoPixel(NEOSIZE, NEOPIN, NEO_GRB + NEO_KHZ800);

// The WiFi Host and PostURL
const char* postURI = "http://pacific-springs-32410.herokuapp.com/api/data";

const char* hubID = "00000012340987011";
const char* hubID_RES = "00000012340987011_RES_HUB";

const char* socketHost = "pacific-springs-32410.herokuapp.com";
const int socketPort = 80;
const char* socketPath = "/socket.io/?transport=websocket";

long previousMillis = 0;
long interval = 60000;

int setup_status = 0;

const char* firmware = "1.0.2";

int resetState = 0;
const int resetPin = 12;

WiFiManager wifiManager;

enum LED_BLINK_STATUS {
  BLINK_CONNECTING, 
  BLINK_CONNECTED,
  BLINK_RADIO_CONNECTING,
  BLINK_RADIO_CONNECTED,
  BLINK_IDLE,
  BLINK_SENTING,
  BLINK_PINGING,
  BLINK_RUNNING
};

void updateStatus(LED_BLINK_STATUS status) {
  switch (status) {
    case BLINK_CONNECTING: 
    
      break;
    case BLINK_CONNECTED: 
    
      break;
    case BLINK_RADIO_CONNECTING: 
    
      break;
    case BLINK_RADIO_CONNECTED: 
    
      break;
    case BLINK_IDLE: 
    
      break;
    case BLINK_SENTING:
     
      break;
    case BLINK_PINGING:
     
      break;
    case BLINK_RUNNING: 
    
      break;
    default:
      break;
  }
}

int tickstate = 1;

void(* resetFunc) (void) = 0;

void tick()
{
  //int state = digitalRead(0);
  if (tickstate) {
    tickstate = 0;
    neostrip.setPixelColor(0, neostrip.Color(255, 0, 0));
    neostrip.show();
  } else {
    tickstate = 1;
    neostrip.setPixelColor(0, neostrip.Color(0, 0, 0));
    neostrip.show();
  }
}

void configModeCallback (WiFiManager *myWiFiManager) {
  ticker.attach(0.5, tick);
}

uint32_t colorWheel(byte pos) {
  if(pos < 85) {
   return neostrip.Color(pos * 3, 255 - pos * 3, 0);
  } else if(pos < 170) {
   pos -= 85;
   return neostrip.Color(255 - pos * 3, 0, pos * 3);
  } else {
   pos -= 170;
   return neostrip.Color(0, pos * 3, 255 - pos * 3);
  }
}

void pinging(uint8_t wait) {
  uint16_t i, j;
  for(j=0; j<256*5; j++) {
    for(i=0; i< neostrip.numPixels(); i++) {
      neostrip.setPixelColor(i, colorWheel(((i * 256 / neostrip.numPixels()) + j) & 255));
    }
    neostrip.show();
    delay(wait);
  }
}

void webSocketDeviceCallBack(const char * payload, size_t length) {
  Serial.println(payload);
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(payload);
  const char* command = root["command"];
  const char* data_payload = root["payload"];
  Serial.println(command);
  
  if (strcmp(command, "info") == 0) {
    JsonObject& rootinfo = jsonBuffer.createObject();
    rootinfo["emit"] = hubID_RES;
    JsonObject& infopayload = rootinfo.createNestedObject("payload");    
    infopayload["macaddress"] = WiFi.macAddress();
    infopayload["firmware"] = firmware;
    infopayload["hubID"] = hubID;
    infopayload["type"] = "info";
    char cbuf[200];
    rootinfo.printTo(cbuf,sizeof(cbuf));    
    webSocket.emit("send", cbuf);
  }

  if (strcmp(command, "ping") == 0) {
    pinging(5);
    neostrip.setPixelColor(0, neostrip.Color(0, 255, 0));
    neostrip.show();
  }

  if (strcmp(command, "reset") == 0) {
    wifiManager.resetSettings();
    //soft_restart();
  }

  if (strcmp(command, "linked") == 0) {
    neostrip.setPixelColor(0, neostrip.Color(0, 255, 0));
    neostrip.show();
  }
 
}
void webSocketConnect(const char * payload, size_t length) { }

void setup()
{
  Wire.begin();
  Serial.begin(9600);
  // Default setup led blinking
  pinMode(resetPin, INPUT);
  pinMode(LED, OUTPUT);
  //Blink(LED, 1000, 2);
  //Blink(LED, 100, 5);
  //Blink(LED, 1000, 2);
  // Neo Pixel
  neostrip.begin();
  neostrip.setBrightness(200);
  //digitalWrite(LED, 0);
  // Settle delay
  digitalWrite(LED, HIGH);
  delay(5000);
  //pinMode(0, OUTPUT);
  //Connecting to the WiFi network
  //wifiManager.resetSettings();
  wifiManager.setDebugOutput(false);
  resetState = digitalRead(resetPin);
  if (resetState == HIGH) {
    wifiManager.resetSettings();
  }
  Serial.println();
  Serial.print("Connecting... ");
  Serial.println(WiFi.macAddress());
  wifiManager.setAPCallback(configModeCallback);
  //wifiManager.connectWifi("loyola","");

  String mihome = "MiHome " + WiFi.macAddress();
  
  
  wifiManager.autoConnect(mihome.c_str());
   
  // Prints details to the serial ports
  Serial.println();
  Serial.println("-----------------------------------------");
  Serial.println("MiHome Hub ESP8266 (WiFi): RFM69 TX/RX Hub");
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
  

  ticker.detach();
  neostrip.setPixelColor(0, neostrip.Color(255, 255, 255));
  neostrip.show();
  
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
        status = 0;
      }
      delay(5000);
    }
  }
  Serial.println("RFM69 Radio Init Good!");
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
  webSocket.on(hubID, webSocketDeviceCallBack);
  webSocket.begin(socketHost, socketPort, socketPath);

  checkedLinkedStatus();
}

void checkedLinkedStatus() {
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["hubID"] = hubID;
  char cbuf[256];
  root.printTo(cbuf,sizeof(cbuf));
  Serial.print("Link Payload: ");
  Serial.println(cbuf);

  String content = cbuf;
  HTTPClient http;
  http.begin("http://pacific-springs-32410.herokuapp.com/api/hardware/linked");
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(content);
  Serial.print("HTTP-Status-Code: ");
  Serial.println(httpCode);
  if(httpCode == 200) {
    String res = http.getString();
    Serial.print("Response: ");
    Serial.println(res);
    JsonObject& getobj = jsonBuffer.parseObject(res);
    boolean linked = getobj["success"];
    if (linked) {
      neostrip.setPixelColor(0, neostrip.Color(0, 255, 0));
      neostrip.show();
    } else {
      neostrip.setPixelColor(0, neostrip.Color(255, 255, 0));
      neostrip.show();
    }
  }
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
    root["nodeID"] = hubID;
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
    //Blink(LED, 100, 5);
    Serial.println("[Send End]");
  }
}

String transmit(String name) {
  //digitalWrite(LED,HIGH);
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
      //Blink(LED, 200, 3);
    } else { }
  } else {
    Serial.print("No Response?");
    //digitalWrite(LED,LOW);
    Serial.println();
  }
  return res;
}

void loop() {
  // Loops the websocket for the client
  webSocket.loop();

 
  if (setup_status) {
    String setup_data = transmit("setup");
    if (setup_data != "") {
      Serial.println(setup_data);
    } else {

    }
    setup_status = 0;
  }

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
