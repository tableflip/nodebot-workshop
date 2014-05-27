__Attach a servo to pin 9 and a potentiometer to A2.__

* Setup the potentiometer so what when it's value changes the servo is moved.

Hint: You could use `five.Fn.map` to map the potentiometer values (0 - 1023) to servo angles (0 - 179).

## Circuit diagram

```
         Servo
         .---.
         | | |
       -===+===-
         | | |
         |   |
         '---'
         | | |
         | | |
         | | ------------------o  Pin 9
         | |
         | ----------------.---o  +5
         |                 |
         |  Potentiometer  |
GND  o---.------/\/\/------.
                   ^
                   |
                   |
 A2  o--------------

```

## Docs

- Fn - https://github.com/rwaldron/johnny-five/blob/master/lib/fn.js

