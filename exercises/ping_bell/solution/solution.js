var five = require('johnny-five')
var dgram = require('dgram')
var board = new five.Board()

board.on('ready', function () {
  var piezo = new five.Piezo(8)
  var server = dgram.createSocket('udp4')

  server.on('message', function () {
    piezo.song('cdfda ag cdfdg gf ', '111111442111111442')
  })

  server.bind(1337)
})
