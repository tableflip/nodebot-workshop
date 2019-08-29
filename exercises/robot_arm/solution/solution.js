var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var servo = new five.Servo(9)
  var pot = new five.Sensor('A2')

  pot.scaleTo(0,179).on('change', function () {
    servo.to(this.value)
  })
})
