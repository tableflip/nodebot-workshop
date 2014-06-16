# Welcome to the nodebot-workshop

We're going to learn the basics of the `johnny-five` api, as a series of code challenges.

`johnny-five` is an api for working with Arduino and other rapid prototyping boards, but

**You _don't_ need an Arduino for this workshop**

The workshop will pose a challenge, and test your solution.
The low level code to talk to the Ardunio is stubbed out.

**You _will_ be writing working, executable `johnny-five` code**

Each of your solutions can be run directly as a `node` program.
Wire up an Arduino, connect the USB and you can see your solution run for real.

-------------------------------------------------------------------------------

# Blink...Blink

**Write a program that blinks an LED attached to pin 13 once every second.**

- When the board is ready, create a new `Led` instance.
- Pass a number to the `Led` constructor to tell it which pin to attach to.
- `Led` has a `strobe` method; it takes an interval in milliseconds.

## For this you will need

1. A directory for your answers and `cd` into it.
2. Get johnny-five from npm: `npm install johnny-five`
3. Add a file for your solution (e.g. 01-blink-blink.js)

In all of your solutions you will need to:

- `require` the `johnny-five` module
- Create a `new Board` instance
- Add a callback to the board's **ready** event
- Your solution goes inside that callback...

```js
  var five = require('johnny-five')
  var board = new five.Board()
  board.on('ready', function () {

    // Your solution here!

  })
```

## Circuit diagram

```
           LED     330
 Pin 13 o--->|----/\/\/----o GND
```

## Components

- LED - http://node-ardx.org/electronics-primer#led

> Emits light when a small current is passed through it (only in one direction).

## Docs

- Board - https://github.com/rwaldron/johnny-five/wiki/Board
- Led - https://github.com/rwaldron/johnny-five/wiki/Led#api

---
