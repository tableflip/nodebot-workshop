var five = require('johnny-five'),
  board = new five.Board();

board.on('ready', function() {
  var btn = new five.Button(5);
  var led = new five.Led(9);
  var on;

  btn.on('press', function () {
    if (on) {
      led.off();
    } else {
      led.on();
    }
    on = !on;
  });
});
