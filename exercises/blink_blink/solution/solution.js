var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var led = new five.Led(5, { mode: 2 })
  led.blink(1000)
});
