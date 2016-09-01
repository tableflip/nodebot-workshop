**Construis une "alarme à incendie" qui émet un son quand la température de l'air passe au dessus de 50°.**

- Fixe le capteur de température TMP36 à la broche **A0**
- Attaches un piezo à la broche **9**
- Attaches une LED à la broche **13**
- Attaches un bouton à la broche **5**
- Quand le capteur de température détecte une température supérieure à 50° C, le piezo dois sonner et la LED dois clignoter en continuellement
- Si la température descends en dessous de 50° C, le piezo et la LED doivent s’éteindre
- Si le bouton est pressé le piézo et la LED doivent s’éteindre et ne doivent pas s’allumer à nouveau à moins que la température soit inférieure à 50° C

## Diagramme du circuit

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
    

## Documentation

- LED - https://github.com/rwaldron/johnny-five/wiki/Led
- Piezo - https://github.com/rwaldron/johnny-five/blob/master/docs/piezo.md
- TMP36 - https://github.com/rwaldron/johnny-five/blob/master/docs/temperature-tmp36.md
- Button - https://github.com/rwaldron/johnny-five/wiki/Button#usage

* * *