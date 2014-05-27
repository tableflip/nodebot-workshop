var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var servo = new five.Servo(9)
  var pot = new five.Sensor('A2')

  pot.on('change', function () {
    var position = five.Fn.map(this.value,
      0, 1023,
      0,  179
    )

    servo.to(position)
  })

  // Alternatively, sensor provides a `scale` method as an alias to Fn.map
  /*
  pot.scale(0, 179).on('change', function () {

    // `this.value` will reflect a scaling from 0-1023 to 0-179
    servo.to(this.value)
  })
  */
})
