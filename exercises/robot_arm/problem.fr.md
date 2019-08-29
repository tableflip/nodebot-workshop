**Construis un bras robot controlable a distance**

Utilise un potentiomètre (potard) pour controller la position d'un servomoteur.

- Fixez un potentiomètre à borne **A2**
- Branche un piezo sur la broche **9**
- Fais tourner le servomoteur quand le potard est tourné

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
             | | ------------------o  Pin 9
             | |
             | ----------------.---o  +5
             |                 |
             |  Potentiomètre  |
    GND  o---.------/\/\/------.
                       ^
                       |
                       |
     A2  o--------------
    
    

## Composants

- Potentiomètre - http://node-ardx.org/electronics-primer#pot

> Exerce une résistance variable selon l'angle du curseur métalique.

## Documentation

- Sensor - https://github.com/rwaldron/johnny-five/wiki/Sensor

## Conseils

- Un potard est un autre cas d'utilisation de l'objet 'Sensor'...
- Un potard a produit des valeurs dans une plage allant de 0 a 1023.
- Un servomoteur peut généralement étre orienté dans un angle de 0 a 180°.

* * *
