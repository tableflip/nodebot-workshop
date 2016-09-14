# Nodebot Workshop

[![Build Status](https://travis-ci.org/tableflip/nodebot-workshop.svg?branch=master)](https://travis-ci.org/tableflip/nodebot-workshop) [![Dependency Status](https://david-dm.org/tableflip/nodebot-workshop.svg)](https://david-dm.org/tableflip/nodebot-workshop) [![Gitter](https://badges.gitter.im/join_chat.svg)](https://gitter.im/tableflip/nodebot-workshop?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<img src="http://nodebots.io/img/nodebot.png" width="175">

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

The workshop will pose a challenge, you will code a solution which the workshop will then verify.

**You will be writing _working, executable johnny-five code_.**

Each of your solutions can be run by the workshop or directly as a `node` program.

When run through the workshop the low level code to talk to the Arduino is stubbed out.

Wire up an Arduino, connect the USB and run your solution directly to see it run for real.

## Contributing

### Code style

To move towards a consistent style for nodeschool projects we use the .jshintrc
as defined in learnyounode: https://github.com/rvagg/learnyounode/blob/master/.jshintrc

### Building

npm scripts are present for testing and linting:

```
$ npm run test
$ npm run lint
```

A `pre-commit` hook will be installed in your repo clone to run the test/lint scripts with every commit.

## Thanks

- @rvagg - and the [nodeschool.io][1] team
- @rwaldron and the [johnny-five team](https://github.com/rwaldron/johnny-five/graphs/contributors)
- @voodootikigod and the [nodebots team](http://nodebots.io/core.html)
- @AnnaGerber of [node-ardx.org](http://node-ardx.org/)

## Translations

- @gorhgorh - French
- @n0bisuke - Japanese

[1]: http://nodeschool.io/
[2]: https://github.com/rwaldron/johnny-five

Brought to you by [@NodeBotsUK](https://twitter.com/NodeBotsUK)
