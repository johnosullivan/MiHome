#include <SPI.h>
#include <RH_RF69.h>
#include <Wire.h>

#define RF69_FREQ 915.0
#define RFM69_CS 4
#define RFM69_INT 3
#define RFM69_RST 2

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
  delay(10);
  digitalWrite(RFM69_RST, LOW);
  delay(10);
  
  if (!rf69.init()) {
    Serial.println("RFM69 Radio Init. Failed!");   
    while(1) {
      delay(4000);
    }
  }
  Serial.println("RFM69 Radio Init Good!");
  if (!rf69.setFrequency(RF69_FREQ)) {
    Serial.println("Setting Frequency Failed!");
  }
  // Sets the power and the encryption key
  rf69.setTxPower(15, false);
  //uint8_t key[] = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
  //                  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08};
  //rf69.setEncryptionKey(key);
  // Prints out the final details
  Serial.print("RFM69 Radio @");  Serial.print((int)RF69_FREQ);  Serial.println(" MHz");
  Serial.println();
}


void loop()
{
  Serial.println("Sending to rf69_server");
  // Send a message to rf69_server
  uint8_t data[] = "Hello World!";
  rf69.send(data, sizeof(data));
  
  rf69.waitPacketSent();
  // Now wait for a reply
  uint8_t buf[RH_RF69_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);

  if (rf69.waitAvailableTimeout(500))
  { 
    // Should be a reply message for us now   
    if (rf69.recv(buf, &len))
    {
      Serial.print("got reply: ");
      Serial.println((char*)buf);
    }
    else
    {
      Serial.println("recv failed");
    }
  }
  else
  {
    Serial.println("No reply, is rf69_server running?");
  }
  delay(4000);
}
