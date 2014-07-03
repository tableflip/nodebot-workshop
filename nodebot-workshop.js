#!/usr/bin/env node

const dgram       = require('dgram')
    , workshopper = require('workshopper')
    , path        = require('path')
    , name        = 'nodebot-workshop'
    , title       = 'Nodebot Workshop'
    , subtitle    = '\x1b[23mSelect an exercise and hit \x1b[3mEnter\x1b[23m to begin'

function fpath (f) {
  return path.join(__dirname, f)
}

var nodebot = workshopper({
    name        : name
  , title       : title
  , subtitle    : subtitle
  , exerciseDir : fpath('./exercises/')
  , appDir      : __dirname
  , helpFile    : fpath('help.txt')
  , menuItems   : []
  , menu        : {fg: 'black', bg: /^win/.test(process.platform) ? 'yellow' : 220}
})

function broadcastProgress (event, exercise, mode, msg) {
  var sock = dgram.createSocket('udp4')
    , packet = new Buffer(JSON.stringify({
        workshop: title,
        exercise: exercise.title,
        mode: mode,
        msg: msg,
        event: event
      }))
    , port = process.env.PROGRESS_BROADCAST_PORT || 1337

  sock.bind(port, '0.0.0.0', function (er) {
    if (er) return;
    sock.setBroadcast(true)

    sock.send(packet, 0, packet.length, port, '255.255.255.255', function () {
      sock.close()
    })
  })
}

nodebot.on('pass', function (exercise, mode) {
  broadcastProgress('pass', exercise, mode)
})

nodebot.on('fail', function (exercise, mode) {
  broadcastProgress('fail', exercise, mode)
})