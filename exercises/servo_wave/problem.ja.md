__3秒サーボを動かして、止めて、真ん中に戻しましょう。__

- 9pinに接続した`Servoインスタンス`を作成します
- `servo.sweepメソッド`を使い0˚から180˚に回転させます
- `board.waitメソッド`を使い、3秒後にコールバックを発火させます
- コールバック内では`stopメソッド`と`centerメソッド`を使いましょう。
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

> パルスを受け取り、シャフトの角度を指定して回転させます。

## ドキュメント

- Servo - https://github.com/rwaldron/johnny-five/wiki/Servo#api
- Board - https://github.com/rwaldron/johnny-five/wiki/Board#api

---
