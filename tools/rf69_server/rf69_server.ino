#include <SPI.h>
#include <RH_RF69.h>
#include <Wire.h>

#define RF69_FREQ 915.0
#define RFM69_INT     2
#define RFM69_CS      3
#define RFM69_RST     4

#define FREQUENCY RF69_915MHZ

RH_RF69 rf69(RFM69_CS, RFM69_INT);

void setup() 
{
  Serial.begin(9600);
  Serial.println("Starting...");
  pinMode(RFM69_RST, OUTPUT);
  digitalWrite(RFM69_RST, LOW);

  Wire.begin();

  Serial.println("RFM69 RX Test!");
  Serial.println();

  digitalWrite(RFM69_RST, HIGH);
  delay(20);
  digitalWrite(RFM69_RST, LOW);
  delay(20);

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
  uint8_t key[] = { 0x73, 0x61, 0x6D, 0x70, 0x6C, 0x65, 0x45, 0x6E, 
                    0x63, 0x72, 0x79, 0x70, 0x74, 0x4B, 0x65, 0x79, 0x0A };

  
  //rf69.setEncryptionKey(key);


  Serial.print("RFM69 radio @");  Serial.print((int)RF69_FREQ);  Serial.println(" MHz");
}

void loop()
{
  if (rf69.available())
  {
    // Should be a message for us now   
    uint8_t buf[RH_RF69_MAX_MESSAGE_LEN];
    uint8_t len = sizeof(buf);
    if (rf69.recv(buf, &len))
    {
//      RH_RF69::printBuffer("request: ", buf, len);
      Serial.print("got request: ");
      Serial.println((char*)buf);
//      Serial.print("RSSI: ");
//      Serial.println(rf69.lastRssi(), DEC);
      
      // Send a reply
      uint8_t data[] = "And hello back to you";
      rf69.send(data, sizeof(data));
      rf69.waitPacketSent();
      Serial.println("Sent a reply");
    }
    else
    {
      Serial.println("recv failed");
    }
  }
}
