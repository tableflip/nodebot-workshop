# ようこそ nodebot-workshop へ

このワークショップでは`johnny-five`のAPIを学んでいきます。

`johnny-five`はArduinoや他のプロトタイピングボードを制御するためのAPIです。
**このワークショップではArduinoなどは用意しなくても大丈夫です。**

出題される問題にチャレンジしてみましょう。
The low level code to talk to the Arduino is stubbed out.

**実行可能な`johnny-five`のコードを記述していってください**

それぞれの回答は`node`プログラムとして実行可能となります。
Arduinoに配線をつないだり、USB接続したりして回答コードがどのように動作するか確認してみましょう。

-------------------------------------------------------------------------------

# Lチカ

**Lチカをしてみましょう。 13pinにLEDを一つ接続し、毎秒ごとに点滅させましょう。**

- `board`が`ready`状態になったら`Led`インスタンスを作成しましょう。
- `Led`インスタンス作成の初期化の際には接続するpinの番号を記述しましょう。
- `Led`には`strobe`メソッドがあり、ミリ秒間隔で実行できます。

## まずは以下の手順が必要になります

1. `mkdir mysolutions`など任意のディレクトリを作成します。
2. `cd mysolutions`で作成したディレクトリに移動しましょう。
3. johnny-fiveをnpmから取得します。 `npm install johnny-five`
4. `01-blink-blink.js`など、回答を記述するファイルを作成しましょう。

全ての回答には以下の記述が必要になります。

- `johnny-five`モジュールの`require`
- `new Board`インスタンスの作成
- `board`の **ready** イベントのコールバック
- 回答はこのコールバックの中で行います

```js
  var five = require('johnny-five')
  var board = new five.Board()
  board.on('ready', function () {

    //回答をここに記述

  })
```

## 回路図

```
            330     LED
 Pin 13 o--/\/\/---->|------o GND
```

## コンポーネント

- LED - http://node-ardx.org/electronics-primer#led

> 電流が流れると発光します。一方向のみです。

## ドキュメント

- Board - https://github.com/rwaldron/johnny-five/wiki/Board
- Led - https://github.com/rwaldron/johnny-five/wiki/Led#api

---
