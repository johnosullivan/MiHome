#include <ArduinoJson.h>
#include <adafruit-sht31.h>
#include "math.h"

// Setup the instances of the sensors
Adafruit_SHT31 sht31 = Adafruit_SHT31();

// Executes setup of the sensors
void setup() {

  if (!sht31.begin(0x44)) {
    Serial.println("Couldn't find SHT31");
  }

}

// Starts the program loop
void loop() {

  float t = sht31.readTemperature();
  float h = sht31.readHumidity();
  float tF = (t * 9) / 5 + 32;

  if (!isnan(t)) {
    //Particle.publish("Temp *C = ",String(t));
    //Particle.publish("Temp *F = ",String(tF));
  } else {
    Serial.println("Failed to read temperature");
  }

  if (! isnan(h)) {
    //Particle.publish("Hum. % = ",String(h));
  } else {
    Serial.println("Failed to read humidity");
  }

  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["hubID"] = 'MI54768634';

  JsonObject& payload = root.createNestedObject("payload");
  JsonArray& fields = payload.createNestedArray("fields");
  JsonObject& data = payload.createNestedObject("data");

  fields.add("temperature_celsius");
  fields.add("temperature_fahrenheit");
  fields.add("humidity");

  data["temperature_celsius"] = t;
  data["temperature_fahrenheit"] = tF;
  data["humidity"] = h;

  char jsonbuf[300];
  root.printTo(jsonbuf,sizeof(jsonbuf));
  Particle.publish("data", jsonbuf);

  delay(30000);
}
