#include <SPI.h>
#include <RH_RF69.h>
#include <Adafruit_SHT31.h>

#define RF69_FREQ 915.0
#define RFM69_INT     3
#define RFM69_CS      4
#define RFM69_RST     2

#define FREQUENCY RF69_915MHZ

RH_RF69 rf69(RFM69_CS, RFM69_INT);

Adafruit_SHT31 sht31 = Adafruit_SHT31();

void setup() {
  Serial.begin(9600);
  Serial.println("Starting...");
  pinMode(RFM69_RST, OUTPUT);
  digitalWrite(RFM69_RST, LOW);

  Serial.println("RFM69 RX Test!");
  Serial.println();

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
  
  rf69.setTxPower(20, true); 

  uint8_t key[] = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08 };
  rf69.setEncryptionKey(key);

  Serial.print("RFM69 radio @");  Serial.print((int)RF69_FREQ);  Serial.println(" MHz");

  sht31.begin(0x44);
}

void loop() {
  float temp = sht31.readTemperature();
  float hum = sht31.readHumidity();
  
  String payload = String(temp) + "," + String(hum);
  uint8_t data[payload.length()];
  payload.getBytes(data, payload.length());
  rf69.send(data, sizeof(data));
  rf69.waitPacketSent();

  Serial.println(payload);
 
  delay(5000);
}
