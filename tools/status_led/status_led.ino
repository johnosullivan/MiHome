#include <Adafruit_NeoPixel.h>
 
#define PIN  6
#define N_LEDS 1
 
Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_LEDS, PIN, NEO_GRB + NEO_KHZ800);
 
void setup() {
  strip.begin();
}
 
void loop() {
  chase(strip.Color(255, 255, 255));
}
 
static void chase(uint32_t c) {
  strip.setPixelColor(0  , c);
  strip.show();
  delay(2000);
}
