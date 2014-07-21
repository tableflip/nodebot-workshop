var five = require('johnny-five')
var dgram = require('dgram')
var board = new five.Board()

board.on('ready', function () {
  var piezo = new five.Piezo(8)
  var server = dgram.createSocket('udp4')

  server.on('message', function () {
    piezo.tone(five.Piezo.Notes.c4, 1000)
  })

  server.bind(1337)
})
