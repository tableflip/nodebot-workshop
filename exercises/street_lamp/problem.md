Build a working street lamp using a Photoresistor and an LED.

Connect the Photoresistor to A0 and the LED to 9.

Make the LED turn on when the photoresistor's value is greater than 600.

## Circuit diagram

```
           PhotoR     10K
    +5 o---/\/\/--.--/\/\/--.--o GND
                  |         |
 Pin 0 o-----------         |
                            |
           LED     330      |
 Pin 9 o--->|-----/\/\/------
```

## Docs
- Photoresistor - https://github.com/rwaldron/johnny-five/blob/master/docs/photoresistor.md