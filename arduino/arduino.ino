// 1.5-2L per minute, 1.75 avg, 1750ml
const float FLOW = 1.75 / 60;
const float MS_PER_ML = 1750 / 60;

// TODO: "pull through" mechanism, where we can turn on/off at will to get liquid to end of pipe
// TODO: allow querying arduino for currently installed ingredients

struct PinRecipe {
  byte pin;
  unsigned long ms;
};

struct PinRecipe recipe[8];

const unsigned int MAX_MESSAGE_LENGTH = 12;
unsigned int len = 0;
byte ingredientIndex = 0;
unsigned long dispenseStartTime = 0;
unsigned long longestDispenseTime = 0;

void setup() {
  Serial.begin(9600);
  pinMode(0, OUTPUT);
  pinMode(1, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
}

void loop() {
  while (Serial.available() > 0) {
    static char message[MAX_MESSAGE_LENGTH];
    static unsigned int message_pos = 0;
    char inByte = Serial.read();
    len += 1;

    if (inByte != '\n' && message_pos < MAX_MESSAGE_LENGTH - 1) {
      message[message_pos] = inByte;
      message_pos++;
    } else {
      message[message_pos] = '\0';
      String str = String(message);

      if (str == "go") {
        dispense();
        reset();
      } else {
        byte pin = message[0] - '0';
        int ml = str.substring(2).toInt();
        prepare(pin, ml);
      }

      // Reset for the next message
      message_pos = 0;
      len = 0;
    }
  }
}

void reset() {
  ingredientIndex = 0;
  longestDispenseTime = 0;
}

void prepare(byte pin, int ml) {
  unsigned long ms = MS_PER_ML * ml;
  struct PinRecipe ingredient = { pin, ms };
  recipe[ingredientIndex] = ingredient;
  ingredientIndex++;

  if (ms > longestDispenseTime) {
    longestDispenseTime = ms;
  }
}

void dispense() {
  unsigned long dispenseStartTime = millis();
  unsigned long endTime = dispenseStartTime + longestDispenseTime;
  Serial.print("Ends at ");
  Serial.println(endTime);

  for (byte i = 0; i < ingredientIndex; i++) {
    byte pin = recipe[i].pin;
    Serial.print("On ");
    Serial.println(pin);

    digitalWrite(pin, HIGH);
  }

  unsigned long mil;
  while ((mil = millis()) <= endTime) {
    for (byte i = 0; i < ingredientIndex; i++) {
      unsigned long endTimeForPin = dispenseStartTime + recipe[i].ms;
      if (mil >= endTimeForPin) {
        byte pin = recipe[i].pin;
        Serial.print("Off ");
        Serial.println(pin);
        digitalWrite(pin, LOW);
      }
    }

//    delay(10);
  }
}
