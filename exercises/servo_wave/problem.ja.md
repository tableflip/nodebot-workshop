__3秒サーボを動かして、止めて、真ん中に戻しましょう。__

- 9pinに接続した`Servo`インスタンスを作成します
- `servo.sweep`を使い0˚から180˚に回転させます
- `board.wait`を'reset'コールバックの3秒後に使います
- 'reset'コールバックでは`stop`と`center`にします
- どこの行に書き足せばいいかドキュメントで確認しましょう

## ひな形

```js
  var five = require('johnny-five')
  var board = new five.Board()
  board.on('ready', function () {

    //ここに回答を記述

  })
```

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
GND  o--. | .--o  Pin 9
          |
 +5  o----.

```

## コンポーネント

- Servo - http://node-ardx.org/electronics-primer#servo

> Takes a timed pulse and converts it into an angular position of the output shaft.

## ドキュメント

- Servo - https://github.com/rwaldron/johnny-five/wiki/Servo#api
- Board - https://github.com/rwaldron/johnny-five/wiki/Board#api

---
