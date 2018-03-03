var five = require('johnny-five')
var dgram = require('dgram')
var board = new five.Board()

board.on('ready', function () {
  var piezo = new five.Piezo(8)
  var server = dgram.createSocket('udp4')

  server.on('message', function () {
    piezo.play({
      song: 'C D F D A',
      beats: 1 / 4,
      tempo: 100
    });
  });

  server.bind(1337)
});
