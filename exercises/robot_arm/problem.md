__Make a remote control robot arm__

Use a rotary potentiometer (pot) to control the position of a servo.

* Attach a potentiometer to pin **A2**
* Attach a servo to pin **9**
* Have the servo rotate as the potentiometer is turned

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

## Components

- Potentiometer - http://node-ardx.org/electronics-primer#pot

> Produces a variable resistance dependant on the angular position of the shaft.

## Docs

- Sensor - https://github.com/rwaldron/johnny-five/wiki/Sensor

## Hints

- A potentiometer is another use case for the Sensor object...
- A pot produces input values between 0 and 1023.
- A servo can typically be moved between 0 and 179 degrees.

---
