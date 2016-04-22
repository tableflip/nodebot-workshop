var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var piezo = new five.Piezo(9)
  var led = new five.Led(13)
  var btn = new five.Button(5)
  var thermo = new five.Thermometer({
    controller: 'TMP36',
    pin: 'A0'
  })

  var threshold = 50
  var isOnFire = false
  var isReset = false

  var sirenInterval = null

  // Sound the alarm
  function panic () {
    if (isOnFire) return
    isOnFire = true

    led.strobe(1000)
    piezo.tone(five.Piezo.Notes.c4, 750)
    sirenInterval = setInterval(function () {
      piezo.tone(five.Piezo.Notes.c4, 750)
    }, 1000)
  }

  // Silence the things
  function calm () {
    if (!isOnFire) return
    isOnFire = false

    led.stop().off()
    clearInterval(sirenInterval)
    piezo.noTone()
  }

  // The reset button
  btn.on('press', function () {
    if (!isOnFire) return
    isReset = true
    calm()
  })

  // Watch the temp
  thermo.on('change', function () {
    if (this.celsius > threshold) {
      if (!isReset) {
        panic()
      }
    } else {
      calm()
      isReset = false // clear the reset flag when temp drops below threshold
    }
  })
})
