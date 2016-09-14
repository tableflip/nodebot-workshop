**Fait faire la vague a un servomoteur pour toi pendant 3 secondes, s'arrêter, puis revenir a sa position centrale.**

- Crée une nouvelle instance de `Servo` attaché a la broche (pin) **9**
- Utilise `servo.sweep` pour le faire tourner entre 0 ° et 180 °
- Utilise `board.wait` pour appeler une fonction de rappel 'reset' au bout de **3 secondes**
- La fonction de rappel 'reset' doit `stop` et `center` le servomoteur
- Vérifiez la documentation pour voir comment le remettre en ligne

## Base

```js
  var five = require('johnny-five')
  var board = new five.Board()
  board.on('ready', function () {

    // Ta solution sera ici !

  })
```

## Diagramme du circuit

            Servomoteur
            .---.
            | | |
          -===+===-
            | | |
            |   |
            '---'
            | | |
            | | |
    GND  o--. | .--o  Broche 9
              |
     +5  o----.
    
    

## Composants

- Servomoteur - http://node-ardx.org/electronics-primer#servo

> Prends une impulsion cadencée et la convertis en une angle de l'axe du servomoteur.

## Documentation

- Servo - https://github.com/rwaldron/johnny-five/wiki/Servo#apiservomoteur
- Board - https://github.com/rwaldron/johnny-five/wiki/Board#api

* * *