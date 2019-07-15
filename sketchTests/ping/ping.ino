#include <SPI.h>
#include <RH_RF69.h>


#define RF69_FREQ 915.0
#define RFM69_INT     3
#define RFM69_CS      4
#define RFM69_RST     2

#define FREQUENCY RF69_915MHZ

RH_RF69 rf69(RFM69_CS, RFM69_INT);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.println("Starting...");
  pinMode(RFM69_RST, OUTPUT);
  digitalWrite(RFM69_RST, LOW);

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
  uint8_t key[] = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08 };
  rf69.setEncryptionKey(key);

  Serial.print("RFM69 radio @");  Serial.print((int)RF69_FREQ);  Serial.println(" MHz");
}

void loop() {
  // put your main code here, to run repeatedly:
  char radiopacket[20] = "Hello World #";
  Serial.print("Sending "); Serial.println(radiopacket);
  rf69.send((uint8_t *)radiopacket, strlen(radiopacket));
  rf69.waitPacketSent();
  delay(5000);
}
