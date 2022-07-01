// 1.5-2L per minute, 1.75 avg, 1750ml
const float FLOW = 1.75 / 60;
const float MS_PER_ML = 1750 / 60;

struct PinRecipe {
  uint8_t pin;
  unsigned long ms;
  boolean isDone;
};

struct PinRecipe recipe[8];

const unsigned int MAX_MESSAGE_LENGTH = 12;
unsigned int len = 0;
byte ingredientIndex = 0;
unsigned long dispenseStartTime = 0;
unsigned long longestDispenseTime = 0;

const uint8_t NO_PIN = 255;

uint8_t pinForStr(String pin) {
  Serial.println("pinForStr: " + pin);
  if (pin == "1") return D1;
  if (pin == "2") return D2;
  if (pin == "3") return D3;
  if (pin == "4") return D4;
  if (pin == "5") return D5;
  if (pin == "6") return D6;
  if (pin == "7") return D7;
  if (pin == "8") return D0; // D8 causes the mcu not to turn on

  return NO_PIN;
}

void reset() {
  ingredientIndex = 0;
  longestDispenseTime = 0;
}

void prepare(String pinStr, int ml) {
  uint8_t pin = pinForStr(pinStr);
  if (pin == NO_PIN) return;

  unsigned long ms = MS_PER_ML * ml;
  struct PinRecipe ingredient = { pin, ms, false };
  recipe[ingredientIndex] = ingredient;
  ingredientIndex++;

  if (ms > longestDispenseTime) {
    longestDispenseTime = ms;
  }
}

void dispense() {
  unsigned long dispenseStartTime = millis();
  Serial.print("Started at ");
  Serial.println(dispenseStartTime);
  unsigned long endTime = dispenseStartTime + longestDispenseTime;
  Serial.print("Ends at ");
  Serial.println(endTime);

  for (byte i = 0; i < ingredientIndex; i++) {
    uint8_t pin = recipe[i].pin;
    Serial.print("On ");
    Serial.println(pin);

    digitalWrite(pin, ON);
  }

  byte ingredientsDispensed = 0;

  unsigned long mil;
  do {
    mil = millis();
    for (byte i = 0; i < ingredientIndex; i++) {
      if (recipe[i].isDone) continue;

      unsigned long endTimeForPin = dispenseStartTime + recipe[i].ms;
      if (mil >= endTimeForPin) {
        recipe[i].isDone = true;
        uint8_t pin = recipe[i].pin;
        Serial.print("Off ");
        Serial.println(pin);
        digitalWrite(pin, OFF);
      }
    }

    delay(10);
  } while (mil <= endTime);

  reset();
}
