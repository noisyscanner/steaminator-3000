struct PinRecipe {
  byte pin;
  byte ml;
};

struct PinRecipe recipe[8];

const unsigned int MAX_MESSAGE_LENGTH = 12;
int len = 0;

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
 while (Serial.available() > 0)
 {
   static char message[MAX_MESSAGE_LENGTH];
   static unsigned int message_pos = 0;

   //Read the next available byte in the serial receive buffer
   char inByte = Serial.read();
   len += 1;

   //Message coming in (check not terminating character) and guard for over message size
   if ( inByte != '\n' && (message_pos < MAX_MESSAGE_LENGTH - 1) )
   {
     //Add the incoming byte to our message
     message[message_pos] = inByte;
     message_pos++;
   }
   //Full message received...
   else
   {
     //Add null character to string
     message[message_pos] = '\0';

     String str = String(message);

     //Print the message (or do other things)
//     Serial.println(str);
//     Serial.println(len - 1);

     byte pin = message[0] - '0';
     int ml = str.substring(2).toInt();
     dispense(pin, ml);

     //Reset for the next message
     message_pos = 0;
     len = 0;
   }
 }
}

// TODO: message format [pin][ml] space separated, to avoid dispensing before receiving whole recipe
// TODO: "pull through" mechanism, where we can turn on/off at will to get liquid to end of pipe
// TODO: pump at once, set timeouts for turning pumps off

// 1.5-2L per minute, 1.75 avg, 1750ml
const float FLOW = 1.75 / 60;
const float MS_PER_ML = 1750 / 60;

void dispense(byte pin, int ml) {
  Serial.print("Pin ");
  Serial.println(pin);
  Serial.println(MS_PER_ML * ml);
//  Serial.print(ml);
//  Serial.println(" ml");

  digitalWrite(pin, HIGH);
  Serial.println("On");
  delay(MS_PER_ML * ml);
  digitalWrite(pin, LOW);
  Serial.println("Off");
}
