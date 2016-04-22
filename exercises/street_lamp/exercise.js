var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var path = require('path')
var verifyProcessor = require('../../lib/verify-processor')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {
  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Led', 'Sensor')})

  setTimeout(function() {
    console.log(exercise.__('please_wait'))
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 2000)
})

var pins = {
  led: 9
}

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(verifyProcessor(exercise, function (test, done) {
  var io = five.stubs.firmata.singleton

  test.truthy(io, 'create_board_instance')

  // Get the listener that is listening for reads on pin A0
  var analogReadListener = null

  for (var i = 0; i < io.analogRead.callCount; i++) {
    var call = io.analogRead.getCall(i)
    if (call.args[0] === 0) {
      analogReadListener = call.args[1]
      break
    }
  }

  test.truthy(analogReadListener, 'read_analogue_values', {pin: 'A0'})

  var led = five.Led.instances[0]
  var sensor = five.Sensor.instances[0]

  test.truthy(led, 'create_led_instance')
  test.equals(led.pin, pins.led, 'connect_led_to_pin', {pin: pins.led})

  test.truthy(sensor, 'create_sensor_instance')

  // User may have set a high value for analog noise filtering
  var freq = sensor ? sensor.freq : 100

  analogReadListener(random(600, 900))

  setTimeout(function () {
    try {
      test.truthy(led.on.called, 'led_turned_on_when_resistor_value_high')
    } catch (error) {
      return done(error)
    }

    analogReadListener(random(0, 600))

    setTimeout(function () {
      try {
        test.truthy(led.off.called, 'led_turned_off_when_resistor_value_low')
        test.truthy(led.off.lastCall.calledAfter(led.on.lastCall), 'led_turned_off_after_turned_on')
      } catch (error) {
        return done(error)
      }

      analogReadListener(random(600, 900))

      setTimeout(function () {
        try {
          test.truthy(led.on.lastCall.calledAfter(led.off.lastCall), 'led_turned_on_after_turned_off')

          done()
        } catch (error) {
          return done(error)
        }
      }, freq)
    }, freq)
  }, freq)
}))

function random (min, max) {
  return Math.random() * (max - min + 1) + min
}

module.exports = exercise
