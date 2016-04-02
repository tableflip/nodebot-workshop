__メッセージを受信すると音が鳴るUDPサーバーを作りましょう__

* ブザーを8pinに接続します
* `dgram`というNodeモジュールを使い、 **udp4** ソケットを作ります
* **1337** ポートでメッセージを待ち受けるサーバーにしましょう
* メッセージを受信したらブザーを鳴らしましょう

## 回路図

```
            Piezo
              _
            || ||
 Pin 8  o---|| ||---o  GND
            ||_||
```

## ドキュメント

- http://nodejs.org/api/dgram.html
- https://github.com/rwaldron/johnny-five/blob/master/docs/piezo.md

---
