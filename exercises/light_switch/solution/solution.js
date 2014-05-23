var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function (){
  var led = new five.Led(9)
  var btn = new five.Button(5)

  btn.on('press', function (){
    led.toggle()
  })
})
