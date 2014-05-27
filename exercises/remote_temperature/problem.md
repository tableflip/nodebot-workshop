__Use dnode to create an rpc server that allows anyone to query the last known temperature of a TMP36 temperature sensor.__

* Attach temperature sensor to **A0**.
* Install dnode `npm install dnode`.
* Setup your dnode server to listen on port 1337.
* Your rpc endpoint should expose a function called `getTemperature`.
* `getTemperature` should return the temperature in **celsius**.

## Circuit diagram

```
 +5  o-----.
           |
           |
          __
         |   \
 A0  o---|    ) TMP36
         |__ /
           |
           |
GND  o-----'
```

## Docs

- dnode - https://github.com/substack/dnode
- TMP36 - https://github.com/rwaldron/johnny-five/blob/master/docs/sensor-temperature-tmp36.md