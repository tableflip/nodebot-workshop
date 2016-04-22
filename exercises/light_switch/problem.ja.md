__スイッチを押すとLEDのon/offが切り替わるプログラムを書きましょう__

* ボタンを5pinに、LEDを9pinに接続しましょう
* `Button`クラスと`press`イベントを使い、LEDのon/offを切り替えましょう

## 回路図

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
      .---------.  |         |
      |         |  |         |
     -+-_______-+--+         |
      |    |    |            |
     -+-___|___-+--+         |
      |    |    |  |         |
      '____|____'  |         |
           |       |         |
        Button     |         |
                   +---------+---o  GND
```

## コンポーネント

- Button - http://node-ardx.org/electronics-primer#pushbutton

> 押されている状態のときに回路がつながります。

## ドキュメント

- Button - https://github.com/rwaldron/johnny-five/wiki/Button#usage
- LED - https://github.com/rwaldron/johnny-five/wiki/Led#api

---
