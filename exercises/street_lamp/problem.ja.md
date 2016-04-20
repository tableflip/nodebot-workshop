__暗くなると点灯する街灯を作りましょう__

* 照度センサとLEDを使いましょう
* 照度センサをA0に、LEDを9pinに接続しましょう
* 照度センサの値が600以上のときにLEDが点くようにしましょう

## 回路図

```
            PhotoR     10K
     +5 o---/\/\/--.--/\/\/--.--o GND
                   |         |
 Pin A0 o-----------         |
                             |
            LED     330      |
  Pin 9 o--->|-----/\/\/------
```

## コンポーネント

- Photoresistor - http://node-ardx.org/electronics-primer#photoresistor

> Produces a variable resistance dependant on the amount of incident light.

## ドキュメント

- Sensor - https://github.com/rwaldron/johnny-five/wiki/Sensor

## ヒント

`johnny-five` has a generic Sensor object for handling various analog inputs.
It fires a data event with the current reading of the sensor.
The sensor value is available to the callback as `this.value`

---
