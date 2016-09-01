**Branche un moteur sur la broche 9 et fais le tourner !**

- Fait tourner le moteur à **200** km/h
- Utilise `board.wait` pour arrêter le moteur au bout de **2 secondes**
- Redémarre le après une autre seconde
- Assure toi que cette boucle se répète infiniment

Astuce : Vous pouvez utiliser les événements de `start` et `stop` de 'motor' pour arrêter/démarrer le moteur.

## Diagramme du circuit

                          ----o  GND
                          |
                   330    |>
    Broche 9  o---/\/\/---|  Transistor
                          |\
                          |
                          |
                    ------.
                    |     |
                    |     _
                    |    / \
             Diode  v   ( o )  Moteur
                    -    \_/
                    |     |
                    |     |
        +5  o-------.------
    

## Composants

- Moteur - http://node-ardx.org/electronics-primer#dcmotor

> Tourne lorsqu’un courant le traverse.

## Documentation

- Board - https://github.com/rwaldron/johnny-five/wiki/Board#api
- Motor - https://github.com/rwaldron/johnny-five/wiki/Motor#api

* * *