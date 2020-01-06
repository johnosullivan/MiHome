#include <SPI.h>
#include <Wire.h>

#include <RH_RF69.h>

#define SHT31_DEFAULT_ADDR 0x44 /**< SHT31 Default Address */
#define SHT31_MEAS_HIGHREP_STRETCH                                             \
  0x2C06 /**< Measurement High Repeatability with Clock Stretch Enabled */
#define SHT31_MEAS_MEDREP_STRETCH                                              \
  0x2C0D /**< Measurement Medium Repeatability with Clock Stretch Enabled */
#define SHT31_MEAS_LOWREP_STRETCH                                              \
  0x2C10 /**< Measurement Low Repeatability with Clock Stretch Enabled*/
#define SHT31_MEAS_HIGHREP                                                     \
  0x2400 /**< Measurement High Repeatability with Clock Stretch Disabled */
#define SHT31_MEAS_MEDREP                                                      \
  0x240B /**< Measurement Medium Repeatability with Clock Stretch Disabled */
#define SHT31_MEAS_LOWREP                                                      \
  0x2416 /**< Measurement Low Repeatability with Clock Stretch Disabled */
#define SHT31_READSTATUS 0xF32D  /**< Read Out of Status Register */
#define SHT31_CLEARSTATUS 0x3041 /**< Clear Status */
#define SHT31_SOFTRESET 0x30A2   /**< Soft Reset */
#define SHT31_HEATEREN 0x306D    /**< Heater Enable */
#define SHT31_HEATERDIS 0x3066   /**< Heater Disable */

float humidity = 0;
float temp = 0;

#define RF69_FREQ 915.0

#define RFM69_INT     PB10
#define RFM69_CS      PA2
#define RFM69_RST     PA3

#define FREQUENCY RF69_915MHZ

RH_RF69 rf69(RFM69_CS, RFM69_INT);

static uint8_t crc8(const uint8_t *data, int len) {
  /*
   *
   * CRC-8 formula from page 14 of SHT spec pdf
   *
   * Test data 0xBE, 0xEF should yield 0x92
   *
   * Initialization data 0xFF
   * Polynomial 0x31 (x8 + x5 +x4 +1)
   * Final XOR 0x00
   */

  const uint8_t POLYNOMIAL(0x31);
  uint8_t crc(0xFF);

  for (int j = len; j; --j) {
    crc ^= *data++;

    for (int i = 8; i; --i) {
      crc = (crc & 0x80) ? (crc << 1) ^ POLYNOMIAL : (crc << 1);
    }
  }
  return crc;
}


void setup() {
  Serial1.begin(38400);
  Wire.begin();
  
  Serial1.println("Starting...");
  pinMode(RFM69_RST, OUTPUT);
  digitalWrite(RFM69_RST, LOW);

  Serial.println("RFM69 RX Test!");
  Serial.println();

  digitalWrite(RFM69_RST, HIGH);
  delay(1000);
  digitalWrite(RFM69_RST, LOW);
  delay(1000);

  if (!rf69.init()) {
    Serial1.println("RFM69 Radio Initialization Failed!");
    while (1);
  }
  Serial1.println("RFM69 Radio Initialization Ok!");

  if (!rf69.setFrequency(RF69_FREQ)) {
    Serial1.println("Set Frequency Initialization Failed!");
  }
  
  rf69.setTxPower(18, true); 

  uint8_t key[] = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08 };
  rf69.setEncryptionKey(key);

  Serial1.print("RFM69 radio @");  Serial1.print((int)RF69_FREQ);  Serial1.println(" MHz");

  byte error, address;
  int nDevices;

  Serial.println("Scanning...");

  nDevices = 0;
  for(address = 1; address < 127; address++) {
    // The i2c_scanner uses the return value of
    // the Write.endTransmisstion to see if
    // a device did acknowledge to the address.

    Wire.beginTransmission(address);
    error = Wire.endTransmission();
    
    if (error == 0) {
      Serial1.print("I2C device found at address 0x");
      if (address < 16) 
        Serial1.print("0");
      Serial1.println(address, HEX);

      nDevices++;
    }
    else if (error == 4) {
      Serial1.print("Unknown error at address 0x");
      if (address < 16) 
        Serial1.print("0");
      Serial1.println(address, HEX);
    }    
  }
  if (nDevices == 0)
    Serial1.println("No I2C devices found");
  else
    Serial1.println("Done");

  delay(5000);
}

void writeCommand(uint16_t cmd) {
  Wire.beginTransmission(0x44);
  Wire.write(cmd >> 8);
  Wire.write(cmd & 0xFF);
  Wire.endTransmission();
}

void loop() {
  uint8_t readbuffer[6];
  
  writeCommand(SHT31_MEAS_HIGHREP);

  delay(20);
  Wire.requestFrom(0x44, sizeof(readbuffer));
  if (Wire.available() != sizeof(readbuffer)) {
    Serial1.println("Wire.available issue");
  }

  for (size_t i = 0; i < sizeof(readbuffer); i++) {
    readbuffer[i] = Wire.read();
  }

  if (readbuffer[2] != crc8(readbuffer, 2) ||
      readbuffer[5] != crc8(readbuffer + 3, 2)) {
      Serial1.println("crc8 issue");
  }

  int32_t stemp = (int32_t) (((uint32_t)readbuffer[0] << 8) | readbuffer[1]);
  stemp = ((4375 * stemp) >> 14) - 4500;
  temp = (float) stemp / 100.0f;

  uint32_t shum = ((uint32_t)readbuffer[3] << 8) | readbuffer[4];
  shum = (625 * shum) >> 12;
  humidity = (float) shum / 100.0f;

  Serial1.println("SHT31 Done");
  Serial1.println("RFM69 Sending...");

  String payload = String(temp) + "," + String(humidity);
  uint8_t data[payload.length()];
  payload.getBytes(data, payload.length());
  rf69.send(data, sizeof(data));
  rf69.waitPacketSent();

  Serial1.println(payload);
  Serial1.println("RFM69 - Sent!");
  
  delay(10000);
}
