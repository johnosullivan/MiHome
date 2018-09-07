#include <ArduinoJson.h>
#include <Adafruit_CCS811.h>
#include <adafruit-sht31.h>
#include <Adafruit_TSL2561_U.h>
#include "math.h"

#if defined(PARTICLE)
 SYSTEM_THREAD(ENABLED)
#endif

// Setup the instances of the sensors
Adafruit_SHT31 sht31 = Adafruit_SHT31();
Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT, 12345);
//Adafruit_CCS811 ccs;

// Executes setup of the sensors
void setup() {

  if (!sht31.begin(0x44)) {
    Serial.println("Couldn't find SHT31");
  }

  //if(!ccs.begin()){
  //  Serial.println("Couldn't find CCS811");
  //}

  if(!tsl.begin()) {
    Serial.println("Couldn't find TSL2561");
  }

  // Calibrate temperature sensor
  //while(!ccs.available());
  //float temp = ccs.calculateTemperature();
  //ccs.setTempOffset(temp - 25.0);

  tsl.enableAutoRange(true);
  tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS);

}

// Starts the program loop
void loop() {

  //if(ccs.available()){ }

  float t = sht31.readTemperature();
  float h = sht31.readHumidity();
  float tF = (t * 9) / 5 + 32;
  //float temp = ccs.calculateTemperature();

  sensors_event_t event;
  tsl.getEvent(&event);

  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  JsonObject& payload = root.createNestedObject("payload");
  JsonArray& fields = payload.createNestedArray("fields");
  JsonObject& data = payload.createNestedObject("data");

  fields.add("temperature_celsius");
  fields.add("temperature_fahrenheit");
  fields.add("humidity");
  fields.add("co2");
  fields.add("tvoc");
  fields.add("ppb");
  fields.add("lux");

  data["temperature_celsius"] = t;
  data["temperature_fahrenheit"] = tF;
  data["humidity"] = h;
  data["co2"] = 0;
  data["tvoc"] = 0;
  data["lux"] = event.light;
  data["test"] = "sdfjghjksdagjkhagfhkjgdfhkj";

  char jsonbuf[500];
  root.printTo(jsonbuf,sizeof(jsonbuf));
  Particle.publish("data", jsonbuf);

  delay(10000);
}
