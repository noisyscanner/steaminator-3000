const byte ON = LOW;
const byte OFF = HIGH;

void setup() {
  Serial.begin(115200);

  pinMode(D0, OUTPUT); // "pin 8"
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);
  pinMode(D4, OUTPUT);
  pinMode(D5, OUTPUT);
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);

  digitalWrite(D0, OFF);
  digitalWrite(D1, OFF);
  digitalWrite(D2, OFF);
  digitalWrite(D3, OFF);
  digitalWrite(D4, OFF);
  digitalWrite(D5, OFF);
  digitalWrite(D6, OFF);
  digitalWrite(D7, OFF);

  serverSetup();
}

void loop() {
  serverLoop();
}
