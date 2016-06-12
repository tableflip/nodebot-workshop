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

> 周囲の温度によって変化する可変抵抗を生成します。

## ヒント

- 常にピンの電圧で作業していることを覚えておいてください。
- センサーからの値はそのピンの電圧の表現です。
- 有用な温度の読取り値に値を変換する必要があります。
- エンドポイントを作成するには、エンドポイントのメソッドにdnodeオブジェクトを渡します。
- あなたのエンドポイントは、コールバックと値を渡す必要があります。

## ドキュメント

- https://github.com/rwaldron/johnny-five/blob/master/docs/temperature-tmp36.md
- dnode - https://github.com/substack/dnode
- dnodeの使い方 - http://qiita.com/n0bisuke/items/5a9d3e2fd1785ad60e44
---
