**Crée un serveur UDP qui émet un son lorsqu’un message est reçu.**

- Branche un piezo sur la broche 9
- Utilise le module `dgram` de node pour créer un socket **udp4**
- Attache ton serveur au port **1337** et écoutes les messages
- Quand un message est reçu, fait sonner le piezzo

## Diagramme du circuit

                Piezo
                  _
                || ||
     Pin 8  o---|| ||---o  GND
                ||_||
    

## Documentation

- http://nodejs.org/api/dgram.html
- https://github.com/rwaldron/johnny-five/blob/master/docs/piezo.md

* * *