var five = require('johnny-five')
var dnode = require('dnode')

var board = new five.Board()

board.on('ready', function () {
  var sensor = new five.Thermometer({
    controller: 'TMP36',
    pin: 'A0'
  })
  var temp = null

  sensor.on('data', function () {
    temp = this.celsius
  })

  var server = dnode({
    getTemperature: function (cb) {
      cb(temp)
    }
  })

  server.listen(1337)
})
