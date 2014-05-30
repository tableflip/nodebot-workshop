var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var piezo = new five.Piezo(9)
  var led = new five.Led(13)
  var btn = new five.Button(5)
  var thermo = new five.Sensor('A0')

  var temp = null
  var threshold = 50
  var wasReset = false

  btn.on('press', function () {
    if (temp <= threshold) return
    noFire()
    wasReset = true
  })

  thermo.on('change', function () {
    // Convert to celsius (TMP36)
    temp = ((this.value * 0.004882814) - 0.5) * 100

    if (wasReset && temp <= threshold) {
      wasReset = false
    }

    if (wasReset && temp > threshold) {
      return
    }

    if (temp <= threshold) {
      noFire()
    } else {
      fire()
    }
  })

  var blazing = false

  function fire () {
    if (blazing) return
    led.strobe(1000)
    siren()
    blazing = true
  }

  function noFire () {
    if (!blazing) return
    led.stop().off()
    stopSiren()
    blazing = false
  }

  var sirenTimeout = null

  function siren () {
    sirenTimeout = setTimeout(function () {
      piezo.tone(five.Piezo.Notes.c, 750)
      siren()
    }, 1000)
  }

  function stopSiren () {
    clearTimeout(sirenTimeout)
    piezo.noTone()
  }
})
