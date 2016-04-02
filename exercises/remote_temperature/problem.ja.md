__温度をあなたの身近なサービスに使おう__

最後に測ったTMP36温度センサの温度の値が返ってくるrpcサーバーを`dnode`を使って作りましょう。

* 温度センサをA0pinに接続しましょう
* `dnode`をインストールしましょう。 -> `npm install dnode`
* 1337ポートで待ち受けるdnodeサーバーを立ち上げましょう
* rpcエンドポイントには`getTemperature`という関数を呼び出せるようにします
* `getTemperature`は **celsius** の値がコールバックで取得できるようにしましょう

## 回路図

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

## コンポーネント

- TMP36 - http://node-ardx.org/electronics-primer#tempsensor

> Produces a variable resistance dependant on the ambient temperature.

## ヒント

- Remember, you're always working with voltages on pins
- The value from a sensor is a representation of the voltage on that pin
- You'll need to convert that value into a useful temperature reading...
- To create an enpoint, pass dnode an object with your endpoint as a method
- Your endpoint should take a callback and pass the value to it

## ドキュメント

- https://github.com/rwaldron/johnny-five/blob/master/docs/temperature-tmp36.md
- dnode - https://github.com/substack/dnode

---
