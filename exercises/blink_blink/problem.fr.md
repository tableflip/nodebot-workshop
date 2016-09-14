# Bienvenue au nodebot-workshop

Nous allons apprendre les rudiments de l'api de `johnny-five`, comme une série de défis de code.

`johnny-five` est une api permettant de travailler avec Arduino et autres cartes de prototypage rapide, mais

**Vous *n’avez pas* besoin d'un Arduino pour cet atelier**

L’atelier va te poser un défi et tester ta solution. Le code de bas niveau pour parler à l’Arduino est simulé.

**Tu *va* écrire du code qui est exécutable par `johnny-five` sur un micro contoleur**

Chacune des solutions peut être exécutée comme un programme `node`. Cable un Arduino, connecte le au port usb et tu peux voir ta solution s'executer devant toi.

* * *

# Clignote

**Ecris un programme qui fais fais clignoter une LED attachée à la broche 13 une fois par seconde.**

- Quand la carte est 'prête', crée une nouvelle instance de `Led`.
- Passe a nombre au constructeur de `Led` pour lui dire a quelle broche l'attacher.
- `Led` a une méthode `strobe`; elle prends comme argument un intervalle, en millisecondes.

## Pour cela, il va te falloir

  1. Un répertoire pour tes réponses, et y entrer en utilisant la commande `cd` de ton terminal.
  2. Récupère johnny-five par npm: `npm install johnny-five`
  3. Crée un fichier pour ta solution (p. ex. 01-clignote.js)

Dans tout tes solution tu devra :

- `require` le module `johnny-five`
- Créer une instance de `new Board`
- Ajouter une fonction de rappel (callback) pour l'événement **ready** de la 'board'
- Ta solution sera dans cette fonction de rappel (callback)...

```js
  var five = require('johnny-five')
  var board = new five.Board()
  board.on('ready', function () {

    // Ta solution sera ici !
  })
```

## Diagramme du circuit

                330     LED
     Pin 13 o--/\/\/---->|------o GND
    

## Composants

- LED - http://node-ardx.org/electronics-primer#led

> Une LED (diode électroluminescente) émet de la lumière lorsqu'un faible courant la traverse dans une direction, et bloque le courant dans l'autre (c'est un composant polarisé).

## Documentation

- Board - https://github.com/rwaldron/johnny-five/wiki/Board
- Led - https://github.com/rwaldron/johnny-five/wiki/Led#api

* * *