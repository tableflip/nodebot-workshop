Create a UDP server that plays a sound when a message is received.

Attach a piezo to pin 8.

Use the `dgram` node module to create a **udp4** socket.

Bind your server to port **1337** and listen for messages.

When a message is received, have the piezo play a tune.

See:
- http://nodejs.org/api/dgram.html
- https://github.com/rwaldron/johnny-five/blob/master/lib/piezo.js
- https://github.com/rwaldron/johnny-five/blob/master/docs/piezo.md
