__温度が50°Cを超えると音がなる火災報知器を作りましょう__

* TMP36温度センサをA0pinに接続しましょう
* ブザーを9pinに接続しましょう
* LEDを13pinに接続しましょう
* ボタンを5pinに接続しましょう
* 温度が50°C 以上になったらブザーの音がなり、LEDが点滅します
* 温度が50°C 以下に変化したらブザーとLEDがオフになります
* また、ボタンを押すとブザーとLEDがオフになり、温度が50°C 以下になるまでは再びつくことはないようにしましょう

## 回路図

```
                  330        LED
Pin 13  o--------/\/\/-------->|---------
                                        |
Pin 5   o----------------------         |
                              |         |
                       10k    |         |
   +5   o----.--------/\/\/---.         |
             |                |         |
             |                |         |
             |             .--|--|--.   |
             |             | |  |   |   |
             |   Button  --+-|  |   |   |
             |             | |  |   |   |
             |             '--|--|--'   |
             |                |         |
             |                ----------.---o  GND
             __                         |
            |   \                       |
    A0  o---|    ) TMP36                |
            |__ /                       |
             |                          |
             ---------------------------.
                                        |
                     Piezo              |
                       _                |
                     || ||              |
 Pin 9   o-----------|| ||---------------
                     ||_||
```

## ドキュメント

- LED - https://github.com/rwaldron/johnny-five/wiki/Led
- Piezo - https://github.com/rwaldron/johnny-five/blob/master/docs/piezo.md
- TMP36 - https://github.com/rwaldron/johnny-five/blob/master/docs/temperature-tmp36.md
- Button - https://github.com/rwaldron/johnny-five/wiki/Button#usage

---
