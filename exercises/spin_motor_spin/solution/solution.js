var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var motor = new five.Motor(9)

  motor.on('start', function () {
    board.wait(2000, function () {
      motor.stop()
    })
  })

  motor.on('stop', function () {
    board.wait(1000, function () {
      motor.start(200)
    })
  })

  motor.start(200)
})
