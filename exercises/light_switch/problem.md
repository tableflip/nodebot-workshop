__Write a program that acts like a light switch to turn an LED on and off.__

* Attach a button to pin 5 and an LED to pin 9
* Use the `Button` class to detect `press` events and toggle your LED on/off

## Circuit diagram

```
           LED       330
Pin 9  o--->|-------/\/\/-----
                             |
Pin 5  o------------         |
                   |         |
            10k    |         |
   +5  o---/\/\/---.         |
                   |         |
                   |         |
                .--|--|--.   |
                | |  |   |   |
      Button  --+-|  |   |   |
                | |  |   |   |
                '--|--|--'   |
                   |         |
                   ----------.---o  GND
```

## Components

- Button - http://node-ardx.org/electronics-primer#pushbutton

> Completes a circuit when it is pressed.

## Docs

- Button - https://github.com/rwaldron/johnny-five/wiki/Button#usage
- LED - https://github.com/rwaldron/johnny-five/wiki/Led#api

---