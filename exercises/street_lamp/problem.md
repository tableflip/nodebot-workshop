__Build a street lamp that turns on as it gets dark.__

* Use photoresistor and an LED
* Connect the photoresistor to A0 and the LED to 9
* Make the LED turn on when the photoresistor's value is greater than 600

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

## Components

- Photoresistor - http://node-ardx.org/electronics-primer#photoresistor

> Produces a variable resistance dependant on the amount of incident light.

## Docs

- Sensor - https://github.com/rwaldron/johnny-five/wiki/Sensor

## Hints

`johnny-five` has a generic Sensor object for handling various analog inputs.
It fires a data event with the current reading of the sensor.
The sensor value is available to the callback as `this.value`

---