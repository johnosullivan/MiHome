#include <adafruit-sht31.h>
#include "math.h"

Adafruit_SHT31 sht31 = Adafruit_SHT31();

void setup() {

  if (!sht31.begin(0x44)) {
    Serial.println("Couldn't find SHT31");
  }

}

void loop() {

  float t = sht31.readTemperature();
  float h = sht31.readHumidity();
  float tF = (t * 9) / 5 + 32;

  if (!isnan(t)) {
    Particle.publish("Temp *C = ",String(t));
    Particle.publish("Temp *F = ",String(tF));
  } else {
    Serial.println("Failed to read temperature");
  }

  if (! isnan(h)) {
    Particle.publish("Hum. % = ",String(h));
  } else {
    Serial.println("Failed to read humidity");
  }

  delay(3000);
}
