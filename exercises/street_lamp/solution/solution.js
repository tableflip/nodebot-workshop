var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var led = new five.Led(9)
  var pr = new five.Sensor('A0')

  pr.on('change', function () {
    if (this.value > 600) {
      led.on()
    } else {
      led.off()
    }
  })
})
