__遠隔制御できるロボットアームを作りましょう__

回転式ポテンショメータを使いサーボの位置をコントロールします。

* ポテンショメータをA2pinに接続します
* 9pinにサーボを接続します
* ポテンショメータを回転させるとサーボが回転します

## 回路図

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

## コンポーネント

- Potentiometer - http://node-ardx.org/electronics-primer#pot

> Produces a variable resistance dependant on the angular position of the shaft.

## ドキュメント

- Sensor - https://github.com/rwaldron/johnny-five/wiki/Sensor
- Fn - https://github.com/rwaldron/johnny-five/blob/master/lib/fn.js

## ヒント

- A potentiometer is another use case for the Sensor object...
- A pot produces input values between 0 and 1023.
- A servo can typically be moved between 0 and 179 degrees.
- `five.Fn.map` can map the pot values (0 - 1023) to servo angles (0 - 179).

---
