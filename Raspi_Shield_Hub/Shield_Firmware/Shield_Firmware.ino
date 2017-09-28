#include <Wire.h>
#include <SPI.h>
#include <RH_RF69.h>
#include <ArduinoJson.h>
// The default address for the slave
#define SLAVE_ADDRESS 0x04
// Data transfer lifecycle
int command = 0;
char data[200];
int datalen = 0;
int index = 0;
// Sets up the radio connects
#define RF69_FREQ 915.0
#define RFM69_INT     3
#define RFM69_CS      4
#define RFM69_RST     2
#define LED           13
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
const char* nodeID = "00000012340987011";
// Radio objects
#define FREQUENCY RF69_915MHZ
RH_RF69 rf69(RFM69_CS, RFM69_INT);
// Setups up the firmware
void setup() {
    Serial.begin(9600); 
    pinMode(RFM69_RST, OUTPUT);
    digitalWrite(RFM69_RST, LOW);
    if (!rf69.init()) {
    Serial.println("RFM69 Radio Initialization Failed!");
      while (1) {
        delay(2000);
      }
    }
    Serial.println("RFM69 Radio Initialization Ok!");
    if (!rf69.setFrequency(RF69_FREQ)) {
      Serial.println("Set Frequency Initialization Failed!");
    }
    // If you are using a high power RF69 eg RFM69HW, you *must* set a Tx power with the
    // ishighpowermodule flag set like this:
    rf69.setTxPower(20, true);  // range from 14-20 for power, 2nd arg must be true for 69HCW
    // The encryption key has to be the same as the one in the server
    uint8_t key[] = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08};
    rf69.setEncryptionKey(key);
    pinMode(LED, OUTPUT);
    Serial.print("RFM69 radio @");  Serial.print((int)RF69_FREQ);  Serial.println(" MHz");
   
    // initialize i2c as slave
    Wire.begin(SLAVE_ADDRESS);
    Wire.onReceive(receiveData);
    Wire.onRequest(sendData);
}
// Parse the data coming from the radio
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
// Takes the prepare sensor input and creates a JSON object to transmit 
void set() {
    Serial.println("[Set Start]");
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
    char cuf[256];
    
    root.printTo(data,sizeof(data));
    index = 0;
    String payload = data;
    datalen = payload.length();
    Serial.println(payload);
    Serial.println("[Set End]");
}
// Tramsit a coomand to the radios to get the sensor data from them
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
// Tells the arduino to blink from x ms and y loops
void Blink(byte PIN, byte DELAY_MS, byte loops) {
  for (byte i=0; i<loops; i++)  {
    digitalWrite(PIN,HIGH);
    delay(DELAY_MS);
    digitalWrite(PIN,LOW);
    delay(DELAY_MS);
  }
}
// Receives the data from the Wire/I2C
void receiveData(int byteCount){
  //Receives the command and set current command
  while(Wire.available()) { command = Wire.read(); }
}
// Loops and run task based on current command 
void loop() {
  // Checks the command and runs the radio
  if (command == 1) {
    String data_1 = transmit("data_1");
    if (data_1 != "") {
      parse(data_1,data_1.length(),"data_1");
    }
    String data_2 = transmit("data_2");
    if (data_2 != "") {
      parse(data_2,data_2.length(),"data_2");
    }
    // Sets sensor data points
    set();
    // Updates the current command
    command = 2;
  }
  if(command == 0) { /*Serial.println("Idle");*/ }
  delay(500);
}
// Sends data to Wire/I2C based on current command.
void sendData() {
  // Checks the command can sent proper response
  if (command == 1) { Wire.write(0); }
  if (command == 2) { Wire.write(1); }
  if (command == 3) { Wire.write(datalen); }
  if (command == 4) {
    // Writes the payload to Wire
    Wire.write(data[index]);
    ++index;
    if (index >= datalen) {
      index = 0;
    }
  }
}
