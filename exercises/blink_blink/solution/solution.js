var five = require('johnny-five.js'),
  board = new five.Board();

board.on('ready', function() {
  var led = new five.Led(13);
  led.strobe(1000)
});
