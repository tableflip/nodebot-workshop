**Écris un programme qui agit comme un interrupteur pour allumer ou éteindre une LED.**

- Branche un interrupteur sur la broche 5 et une LED sur la broche **9**
- Utilises la classe `Button` pour détecter des événements `press` et activer/désactiver votre LED

## Diagramme du circuit

                330      LED
    Pin 9  o---/\/\/------>|------
                                 |
    Pin 5  o------------         |
                       |         |
                10k    |         |
       +5  o---/\/\/---.         |
                       |         |
                       |         |
          .---------.  |         |
          |         |  |         |
         -+-_______-+--+         |
          |    |    |            |
         -+-___|___-+--+         |
          |    |    |  |         |
          '____|____'  |         |
               |       |         |
          Intérupteur  |         |
                       +---------+---o  GND
    

## Composants

- Button - http://node-ardx.org/electronics-primer#pushbutton

> Ferme un circuit quand on lui appuie dessus.

## Documentation

- Button - https://github.com/rwaldron/johnny-five/wiki/Button#usage
- LED - https://github.com/rwaldron/johnny-five/wiki/Led#api

* * *