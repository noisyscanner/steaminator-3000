#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>

const char* ssid     = "OnlyLANs";
const char* password = "2B-or-not-2B";
const char* host = "steaminator";

ESP8266WebServer server(3000);

void handleRoot() {
  server.send(200, "text/plain", "hello from esp8266!");
}

void handleBrew() {
  for (uint8_t i=0; i<server.args(); i++){
    String pin = server.argName(i);
    String ml = server.arg(i);
    
    
    Serial.println(pin + ": " + ml);
    prepare(pin, ml.toInt());
  }

  dispense();
  server.send(200);
}

void serverSetup() {
  WiFi.mode(WIFI_STA);
  Serial.printf("Default hostname: %s\n", WiFi.hostname().c_str());
  WiFi.hostname(host);
  Serial.printf("New hostname: %s\n", WiFi.hostname().c_str());
  
  WiFi.begin(ssid, password);
  Serial.print("Connecting to ");
  Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(++i); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");  
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/brew", HTTP_POST, handleBrew);

  server.begin();
}

void serverLoop() {
  server.handleClient();
}
