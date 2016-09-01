**La temperature autour de vous 'as a service'.**

Utilise dnode pour créer un serveur rpc qui permet à quiconque d’interroger la dernière température connue d’un capteur de température TMP36.

- Branche la sonde de température à la broche **A0**
- Installer dnode `npm install dnode`
- Mettre en place votre serveur dnode pour écouter sur le port 1337
- Votre point de terminaison (endpoint) rpc doit exposer une fonction appelée `getTemperature`
- la fonction de rappel de `getTemperature` dois retourner une température en degré **celsius**

## Diagramme du circuit

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
    

## Composants

- TMP36 - http://node-ardx.org/electronics-primer#tempsensor

> Exerce une résistance variable selon la température ambiante.

## Conseils

- N’oubliez pas, vous travaillez toujours avec des tensions sur les broches
- La valeur d’un capteur est une représentation de la tension sur la broche
- Vous aurez besoin de convertir cette valeur en une lecture de température utile...
- Pour créer un point de terminaison, passer à dnode un objet avec votre point de terminaison en tant que méthode
- Votre point de terminaison doit prendre comme argument une fonction de rappel et de lui passer la valeur comme retour

## Documentation

- https://github.com/rwaldron/johnny-five/blob/master/docs/temperature-tmp36.md
- dnode - https://github.com/substack/dnode

* * *