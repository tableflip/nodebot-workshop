__Make a servo wave at you for 3 seconds, stop, and return to center.__

- Create a new `Servo` instance attached to pin 9.
- Use `servo.sweep` to rotate between 0˚ and 180˚ until you call `stop`
- Use `board.wait` to schedule a callback while your servo keeps sweeping.
- Check the docs to see how to bring it back into line.

## Boilerplate
```js
  var five = require('johnny-five')
  var board = new five.Board()
  board.on('ready', function () {

    // Your solution here!

  })
```

## Circuit diagram

```
        Servo
        .---.
        | | |
      -===+===-
        | | |
        |   |
        '---'
        | | |
        | | |
GND  o--. | .--o  Pin 9
          |
 +5  o----.
 
```

## Docs
- Servo - https://github.com/rwaldron/johnny-five/wiki/Servo#api
- Board - https://github.com/rwaldron/johnny-five/wiki/Board#api

---
