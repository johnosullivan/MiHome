#include <adafruit-sht31.h>
#include "math.h"

int led1 = D0;
int led2 = D7;

Adafruit_SHT31 sht31 = Adafruit_SHT31();

void setup() {

  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);

  if (!sht31.begin(0x44)) {
    Serial.println("Couldn't find SHT31");
  }

}

void loop() {

  digitalWrite(led1, HIGH);
  digitalWrite(led2, HIGH);

  delay(2000);

  digitalWrite(led1, LOW);
  digitalWrite(led2, LOW);

  delay(2000);

  int x = random(0,1000);
  float t = sht31.readTemperature();
  float h = sht31.readHumidity();
  float tF = (t* 9) /5 + 32;
  Particle.publish("random",String(x));

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
  Serial.println();

  delay(30000);
}
