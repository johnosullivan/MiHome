// Imported the libraries
#include <ArduinoJson.h>
#include <Adafruit_Sensor.h>
// Sensors import
#include "TSL2561.h"
#include "CCS811.h"
#include "SHT31.h"
#include "SI1145.h"
#include "pgmspace.h"
// Defined the programs variables
#define CCS811_ADDR 0x5B
#define TRUE 1
#define FALSE 0
#define isParticle 1
// The data variables
double temperature = 0;
double humidity = 0;
double co2 = 0;
double voc = 0;
double visible = 0;
double UV = 0;
double IR = 0;
double light = 0;
// Bool for startup
int startUpMode = FALSE;
// Sensors Objects
CCS811 ccs811(CCS811_ADDR);
SHT31 sht31 = SHT31();
TSL2561 tsl = TSL2561(TSL2561_ADDR_FLOAT, 12345);
SI1145 uv = SI1145();
// Setups up the Arduino
void setup() {
  // Begans the setup
  Wire.begin();
  Serial.begin(9600);
  while (!Serial);


  ccs811.begin();
  // Setups the light sensor
  tsl.enableAutoRange(true);
  tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS);
  // Setupss the temperature / humidity sensor
  if (!sht31.begin(0x44)) {
    Serial.println("Error SHT31");
    while (1) delay(2000);
  }
  // Setups the UV sensor
  if (!uv.begin()) {
    Serial.println("Error Si1145");
    while (1) delay(2000);
  }
  // Configs the Particle Cloud variables
  if (isParticle) {
    Particle.variable("temperature", &temperature, DOUBLE);
    Particle.variable("humidity", &humidity, DOUBLE);
    Particle.variable("co2", &co2, DOUBLE);
    Particle.variable("voc", &voc, DOUBLE);
    Particle.variable("visible", &visible, DOUBLE);
    Particle.variable("UV", &UV, DOUBLE);
    Particle.variable("IR", &IR, DOUBLE);
    Particle.variable("light", &light, DOUBLE);
  }
}
// Send the data to the cloud and stores the data in mongo
void send() {
  if (startUpMode) {
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
  char cbuf[256];
  root.printTo(cbuf,sizeof(cbuf));
  Particle.publish("payload",cbuf);
  } else {
    startUpMode = TRUE;
  }
}
// Loops through the sensor object and get readings then waits a minute
void loop() {
  if (ccs811.dataAvailable())
  {
    ccs811.readAlgorithmResults();
    co2 = ccs811.getCO2();
    voc = ccs811.getTVOC();
  }

  float t = sht31.readTemperature();
  float h = sht31.readHumidity();

  if (!isnan(t)) {
    temperature = t;
  } else {
    Serial.println("Failed to read temperature");
  }

  if (!isnan(h)) {
    humidity = h;
  } else {
    Serial.println("Failed to read humidity");
  }

  sensors_event_t event;
  tsl.getEvent(&event);

  if (event.light)
  {
    light = event.light;
  }
  else
  { Serial.println("Sensor overload"); }

  IR = uv.readIR();
  visible = uv.readVisible();
  float UVindex = uv.readUV();
  UVindex /= 100.0;
  UV = UVindex;

  send();

  delay(60000);
}
