__9pinにモーターを接続してスピンさせましょう！__

* 200mphでモーターを回転させます
* `board.wait`を使い2秒回転後に停止させましょう
* 1秒後に回転再開させます
* この流れを無限ループさせてください

ヒント:
Hint: You could use the motor `start` and `stop` events to stop/start the motor.

## 回路図

```
                     ----o  GND
                     |
            330    |>
Pin 9  o---/\/\/---|  Transistor
                   |\
                     |
                     |
               ------.
               |     |
               |     _
               |    / \
        Diode  v   ( o )  Motor
               -    \_/
               |     |
               |     |
   +5  o-------.------
```

## コンポーネント

- Motor - http://node-ardx.org/electronics-primer#dcmotor

> 電流を流すと回転します。

## ドキュメント

- Board - https://github.com/rwaldron/johnny-five/wiki/Board#api
- Motor - https://github.com/rwaldron/johnny-five/wiki/Motor#api

---
