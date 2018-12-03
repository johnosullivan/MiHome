#include "application.h"
#include <SPI.h>

int led = D7;

void setup() {
    pinMode(led, OUTPUT);
    Serial.begin(9600);
}

void loop() {
    digitalWrite(led, HIGH);   
    delay(2000);               
    digitalWrite(led, LOW);  
    delay(2000);               
}