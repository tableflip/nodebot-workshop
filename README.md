# Nodebot Workshop

[![Build Status](https://travis-ci.org/tableflip/nodebot-workshop.svg?branch=master)](https://travis-ci.org/tableflip/nodebot-workshop) [![Dependency Status](https://david-dm.org/tableflip/nodebot-workshop.svg)](https://david-dm.org/tableflip/nodebot-workshop) [![Gitter](https://badges.gitter.im/join_chat.svg)](https://gitter.im/tableflip/nodebot-workshop?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A [nodeschool][1] workshop that will make your Arduino alive with [rwaldron/johnny-five][2]

No hardware required!

```shell
# Install
npm install -g nodebot-workshop
# Run
nodebot-workshop
```

<img src="https://raw.githubusercontent.com/tableflip/nodebot-workshop/master/screenshot.png" width="560" alt="Nodebot workshop menu">

A series of code challenges will teach you the basics of the [johnny-five][2] api, a framework for working with Arduino and other rapid prototyping boards.

## Hardware is optional

The workshop will pose a challenge, and will test your code.

The low level code to talk to the Arduino is stubbed out.

**You _will_ be writing working, executable johnny-five code.**

Each of your solutions can be run directly as a `node` program.

Wire up an Arduino, connect the USB and you can see your solution run for real.

## Code style

To move towards a consistent style for nodeschool projects we use the .jshintrc
as defined in learnyounode: https://github.com/rvagg/learnyounode/blob/master/.jshintrc

Your favourite jshint runner will work but a gulpfile is provided for hipsters.

```shell
npm install -g gulp
gulp
```

...to run it.

## Thanks

- @rvagg - and the [nodeschool.io][1] team. This workshopper is based on the new 1.0 release of [rvagg/learnyounode](https://github.com/rvagg/learnyounode). It's ace, go try it https://github.com/rvagg/learnyounode
- @rwaldron and the [johnny-five team](https://github.com/rwaldron/johnny-five/graphs/contributors)
- @voodootikigod and the [nodebots team](http://nodebots.io/core.html)
- @AnnaGerber of [node-ardx.org](http://node-ardx.org/)

## Translations

- @NodeBotsUK - English
- @n0bisuke - Japanese

[1]: http://nodeschool.io/
[2]: https://github.com/rwaldron/johnny-five

Brought to you by [@NodeBotsUK](https://twitter.com/NodeBotsUK)

<img src="http://nodebots.io/img/nodebot.png" width="175">
