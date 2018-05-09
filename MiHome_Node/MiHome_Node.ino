#include <SPI.h>
#include <RH_RF69.h>
#include <ArduinoJson.h>
#include <Adafruit_BMP085.h>
#include <Adafruit_Sensor.h>
#include <Thread.h>
#include <Wire.h>

// Sensors import
#include "TSL2561.h"
#include "CCS811.h"
#include "SHT31.h"
#include "SI1145.h"
#include "pgmspace.h"

#define RF69_FREQ 915.0
#define RFM69_INT     3
#define RFM69_CS      4
#define RFM69_RST     2
#define LED           13
#define CCS811_ADDR 0x5B

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
// For the blinking light on setup
Thread blinkingThread = Thread();
// Sensors Objects
//CCS811 ccs811;
CCS811 ccs811(CCS811_ADDR);
SHT31 sht31 = SHT31();
TSL2561 tsl = TSL2561(TSL2561_ADDR_FLOAT, 12345);
SI1145 uv = SI1145();
Adafruit_BMP085 bmp;

#define CCS811_ADDR      0x5B
#define CCS811_WAKE_PIN  8

#define FREQUENCY RF69_915MHZ

RH_RF69 rf69(RFM69_CS, RFM69_INT);

int16_t packetnum = 0;

int setup_status = 0;
int SETUP_LCD = 6;
void lightCallback(){
  if (setup_status) {
    int state = digitalRead(SETUP_LCD);
    digitalWrite(SETUP_LCD, !state);
  }
}

void setupMode() {

}

void errorMode() {

}

void runningMode() {

}

void setup()
{
  Serial.begin(9600);
  Serial.println("Starting...");
  pinMode(RFM69_RST, OUTPUT);
  digitalWrite(RFM69_RST, LOW);

  pinMode(SETUP_LCD, OUTPUT);

  Wire.begin();

  pinMode(A4, INPUT);      // define as input for now, will get redifined by I2C functions
  pinMode(A5, INPUT);      // define as input for now, will get redifined by I2C functions


   byte error, address;
  int devices;

  Serial.println("Scanning...");

  devices = 0;
  for(address = 1; address < 127; address++ )
  {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0)
    {
      Serial.print("I2C device found at address | 0x");
      if (address<16)
        Serial.print("0");
      Serial.print(address,HEX);
      Serial.println("  !");

      devices++;
    }
    else if (error==4)
    {
      Serial.print("Unknow error at address | 0x");
      if (address<16)
        Serial.print("0");
      Serial.println(address,HEX);
    }
  }
  if (devices == 0)
    Serial.println("No I2C devices found\n");
  else
    Serial.println("done\n");

  //if(!ccs811.begin(uint8_t(CCS811_ADDR), uint8_t(CCS811_WAKE_PIN))) {
  //  Serial.println("CCS811 Initialization Failed!");
  //}
  //ccs811.begin();

  //Setups the pressure sensor
  if (!bmp.begin()) {
    Serial.println("BMP085 Initialization Failed!");
    //while (1) {}
  } else {
    Serial.println("BMP085 Initialization Good!");
  }
  if (!sht31.begin(0x44)) {
    Serial.println("SHT31 Initialization Failed!");
    //while (1) delay(2000);
  } else {
    Serial.println("SHT31 Initialization Good!");
  }
  // Setups the light sensor
  tsl.enableAutoRange(true);
  tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS);
  // Setups the temperature / humidity sensor
  if (!sht31.begin(0x44)) {
    Serial.println("SHT31 Initialization Failed!");
    //while (1) delay(2000);
  } else {
    Serial.println("SHT31 Initialization Good!");
  }
  // Setups the UV sensor
  if (!uv.begin()) {
    Serial.println("SI114 Initialization Failed!");
    //while (1) delay(2000);
  } else {
    Serial.println("SI114 Initialization Good!");
  }

  Serial.println("RFM69 RX Test!");
  Serial.println();

  // manual reset
  digitalWrite(RFM69_RST, HIGH);
  delay(10);
  digitalWrite(RFM69_RST, LOW);
  delay(10);

  if (!rf69.init()) {
    Serial.println("RFM69 Radio Initialization Failed!");
    while (1);
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

  blinkingThread.onRun(lightCallback);
  blinkingThread.setInterval(500);
}

void getSensorData_1() {
  if (ccs811.dataAvailable())
  {
    ccs811.readAlgorithmResults();
    co2 = ccs811.getCO2();
    voc = ccs811.getTVOC();
  }
  float t = sht31.readTemperature();
  float h = sht31.readHumidity();
  // Checks and makes sure the temp is a number and sets to global
  if (!isnan(t)) {
    temperature = t;
  } else {
    Serial.println("Failed to read temperature");
  }
  // Checks and makes sure the humidity is a number and sets to global
  if (!isnan(h)) {
    humidity = h;
  } else {
    Serial.println("Failed to read humidity");
  }
  // Sets all the data points
  visible = uv.readVisible();
}

void getSensorData_2() {
  IR = uv.readIR();
  float UVindex = uv.readUV();
  UVindex /= 100.0;
  UV = UVindex;
  pressure = bmp.readPressure();
  // Gets the light sensor data
  delay(50);
  sensors_event_t event;
  tsl.getEvent(&event);
  // See if the light object is valid
  if (event.light)
  {
    light = event.light;
  } else {
    Serial.println("Sensor overload");
  }
}

void loop() {
 if(blinkingThread.shouldRun()) {
   blinkingThread.run();
 }
 if (rf69.available()) {
    uint8_t buf[RH_RF69_MAX_MESSAGE_LEN];
    uint8_t len = sizeof(buf);
    if (rf69.recv(buf, &len)) {
      if (!len) return;
      buf[len] = 0;
      Serial.print("Received [");
      Serial.print(len);
      Serial.print("]: ");
      Serial.println((char*)buf);
      Serial.print("RSSI: ");

      Serial.println(rf69.lastRssi(), DEC);
      if (strstr((char *)buf, "data_1")) {
        getSensorData_1();
        String message = String(temperature) + ";" + String(humidity) + ";" + String(co2) + ";" + String(voc) + ";" + String(visible) + ";";
        Serial.println(message);
        uint8_t data[message.length()];
        message.getBytes(data, message.length());
        rf69.send(data, sizeof(data));
        rf69.waitPacketSent();
        //Blink(LED, 40, 3);
      }

      if (strstr((char *)buf, "data_2")) {
        getSensorData_2();
        String message = String(light) + ";" + String(UV) + ";" + String(IR) + ";" + String(pressure) + ";";
        Serial.println(message);
        uint8_t data[message.length()];
        message.getBytes(data, message.length());
        rf69.send(data, sizeof(data));
        rf69.waitPacketSent();
        //Blink(LED, 40, 3);
      }

      if (strstr((char *)buf, "setup")) {
        String message = "ok";
        uint8_t data[message.length()];
        message.getBytes(data, message.length());
        rf69.send(data, sizeof(data));
        rf69.waitPacketSent();
        setup_status = 1;
      }
      if (strstr((char *)buf, "sdone")) {
        String message = "ok";
        uint8_t data[message.length()];
        message.getBytes(data, message.length());
        rf69.send(data, sizeof(data));
        rf69.waitPacketSent();
        setup_status = 0;
        digitalWrite(SETUP_LCD, 0);
      }
    } else {
      Serial.println("Receive failed");
    }
  }
}


void Blink(byte PIN, byte DELAY_MS, byte loops) {
  for (byte i=0; i<loops; i++)  {
    digitalWrite(PIN,HIGH);
    delay(DELAY_MS);
    digitalWrite(PIN,LOW);
    delay(DELAY_MS);
  }
}
