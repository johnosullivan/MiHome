#include <SPI.h>
#include <RH_RF69.h>
#include <ArduinoJson.h>
#include <Adafruit_BMP085.h>
#include <Adafruit_Sensor.h>

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
 
// Sensors Objects
//CCS811 ccs811(CCS811_ADDR);
SHT31 sht31 = SHT31();
TSL2561 tsl = TSL2561(TSL2561_ADDR_FLOAT, 12345);
SI1145 uv = SI1145();
Adafruit_BMP085 bmp;

#define FREQUENCY RF69_915MHZ

RH_RF69 rf69(RFM69_CS, RFM69_INT);

int16_t packetnum = 0; 
void setup() 
{
  Serial.begin(9600);

  pinMode(LED, OUTPUT);     
  pinMode(RFM69_RST, OUTPUT);
  digitalWrite(RFM69_RST, LOW);

  //Setups the pressure sensor
  if (!bmp.begin()) {
    Serial.println("Error BMP085.");
    //while (1) {}
  }
  if (!sht31.begin(0x44)) {
    Serial.println("Error SHT31.");
    //while (1) delay(2000);
  }
  // Setups the light sensor
  tsl.enableAutoRange(true);
  tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS);
  // Setups the temperature / humidity sensor
  if (!sht31.begin(0x44)) {
    Serial.println("Error SHT31.");
    //while (1) delay(2000);
  }
  // Setups the UV sensor
  if (!uv.begin()) {
    Serial.println("Error Si114.");
    //while (1) delay(2000);
  }

  Serial.println("Feather RFM69 RX Test!");
  Serial.println();

  // manual reset
  digitalWrite(RFM69_RST, HIGH);
  delay(10);
  digitalWrite(RFM69_RST, LOW);
  delay(10);
  
  if (!rf69.init()) {
    Serial.println("RFM69 radio init failed");
    while (1);
  }
  Serial.println("RFM69 radio init OK!");
  
  if (!rf69.setFrequency(RF69_FREQ)) {
    Serial.println("setFrequency failed");
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
}

void getSensorData() {
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
  // Gets the light sensor data
  sensors_event_t event;
  tsl.getEvent(&event);
  // See if the light object is valid
  if (event.light)
  {
    light = event.light;
  } else { 
    Serial.println("Sensor overload"); 
  }
  // Sets all the data points
  IR = uv.readIR();
  visible = uv.readVisible();
  float UVindex = uv.readUV();
  UVindex /= 100.0;
  UV = UVindex;
  pressure = bmp.readPressure();
}

void loop() {
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
      if (strstr((char *)buf, "data")) {
        getSensorData();
        String message = String(temperature) + ";" + String(humidity) + ";0;0;" + String(visible) + ";" + String(UV) + ";" + String(IR) + ";" + String(light) + ";" + String(pressure) + ";";   
        Serial.println(message);
        uint8_t data[message.length()];
        message.getBytes(data, message.length());
        rf69.send(data, sizeof(data));
        rf69.waitPacketSent();
        Blink(LED, 40, 3);
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
