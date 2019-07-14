#include <Arduino.h>
#include "WebSocketClient.h"
#include "ESP8266WiFi.h"

WebSocketClient ws(true);

void setup() {
  Serial.begin(115200);
  WiFi.begin("Banner Hill Resident", "");

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void loop() {
  if (!ws.isConnected()) {
    ws.connect("b0d7ff6d.ngrok.io", "/socket/websocket", 443);
  } else {
    //ws.send("{\"topic\":\"phoenix\",\"event\":\"heartbeat\",\"payload\":{},\"ref\":0}");


    String msg;
    if (ws.getMessage(msg)) {
      Serial.println(msg);
    }
  }
  delay(1000);
}
