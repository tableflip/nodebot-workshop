var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var async = require('async')
var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var path = require('path')
var verifyProcessor = require('../../lib/verify-processor')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {
  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five})

  setTimeout(function() {
    console.log(exercise.__('please_wait'))
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 2000)
})

const pins = {
  temp: 0,
  led: 13,
  btn: 5,
  piezo: 9
}

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(verifyProcessor(exercise, function (test, done) {
  var io = five.stubs.firmata.singleton

  test.truthy(io, 'create_board_instance')

/*
  var piezo = five.Piezo.instances[0]
  var btn = five.Button.instances[0]
  var led = five.Led.instances[0]
  var temp = five.Thermometer.instances[0]

  test.truthy('create_speaker_instance', piezo)
  test.equals('connect_speaker_to_pin', piezo.pin, pins.piezo, {pin: pins.piezo})

  test.truthy('create_button_instance', btn)
  test.equals('connect_button_to_pin', btn.pin, pins.btn, {pin: pins.btn})

  test.truthy('create_led_instance', led)
  test.equals('connect_led_to_pin', led.pin, pins.led, {pin: pins.led})

  test.truthy('create_thermometer_instance', temp)
  test.equals('connect_thermometer_to_pin', temp.pin, pins.temp, {pin: pins.temp})
*/

  // Get the listener that is listening for reads on pin A0
  var analogReadListener = null

  for (var i = 0; i < io.analogRead.callCount; i++) {
    var call = io.analogRead.getCall(i)
    if (call.args[0] === pins.temp) {
      analogReadListener = call.args[1]
      break
    }
  }

  test.truthy(analogReadListener, 'read_analogue_values', {pin: 'A0'})
  test.falsey(io.digitalWrite.called, 'premature_fire_alarm')

  testAlarmTurnsOff(test, analogReadListener, io, function (error) {
    if (error) {
      return done(error)
    }

    testAlarmResets(test, analogReadListener, io, function (error) {
      return done(error)
    })
  })
}))

function testAlarmTurnsOff (test, analogReadListener, io, cb) {
  analogReadListener(random(tempToVoltage(50.1), tempToVoltage(100)))

  // Within 2 seconds, the piezo should have sounded and the LED turned on
  setTimeout(function () {
    try {
      test.truthy(io.digitalWrite.calledWith(pins.piezo, io.HIGH), 'speaker_turned_on')
      test.truthy(io.digitalWrite.calledWith(pins.led, io.HIGH), 'led_turned_on')
    } catch (er) {
      return cb(er)
    }

    analogReadListener(random(tempToVoltage(0), tempToVoltage(50)))

    // Within 2 seconds the last call to digitalWrite should have been with io.LOW
    setTimeout(function () {
      try {
        test.truthy(io.digitalWrite.calledWith(pins.piezo, io.LOW), 'speaker_turned_off')
        test.truthy(io.digitalWrite.calledWith(pins.led, io.LOW), 'led_turned_off')
      } catch (er) {
        return cb(er)
      }

      //var lastPiezoLowCall = lastCallWith(io.digitalWrite, pins.piezo, io.LOW)
      var lastLedLowCall = lastCallWith(io.digitalWrite, pins.led, io.LOW)

      // After 2 more seconds the last piezo/led low call should still have been before the last piezo/led high call
      setTimeout(function () {
        //var lastPiezoHighCall = lastCallWith(io.digitalWrite, pins.piezo, io.HIGH)
        var lastLedHighCall = lastCallWith(io.digitalWrite, pins.led, io.HIGH)

        try {
          // TODO: We can't currently test this as there is no way to stop a piezo from playing a tune
          //test.truthy(lastPiezoLowCall.calledAfter(lastPiezoHighCall), 'speaker_turned_off')

          test.truthy(lastLedLowCall.calledAfter(lastLedHighCall), 'speaker_turned_off')

          cb()
        } catch (er) {
          return cb(er)
        }
      }, 2000)

    }, 2000)

  }, 2000)
}

function testAlarmResets (test, analogReadListener, io, cb) {
  io.digitalWrite.reset()

  analogReadListener(random(tempToVoltage(50.1), tempToVoltage(100)))

  var lastLedLowCall, lastLedHighCall, digitalReadListener

  var tests = [
    function(callback) {
      try {
        test.truthy(io.digitalWrite.calledWith(pins.piezo, io.HIGH), 'speaker_turned_on')
        test.truthy(io.digitalWrite.calledWith(pins.led, io.HIGH), 'led_turned_on')
      } catch (er) {
        return callback(er)
      }

      // Get the digital read listener for the button
      for (var i = 0; i < io.digitalRead.callCount; i++) {
        var call = io.digitalRead.getCall(i)
        if (call.args[0] === pins.btn) {
          digitalReadListener = call.args[1]
          break
        }
      }

      // Push the button
      digitalReadListener(1)

      // Buttons have a 7ms debounce
      setTimeout(callback, 100)
    },
    function(callback) {
      // release the button
      digitalReadListener(0)

      setTimeout(callback, 100)
    },
    function(callback) {
      try {
        test.truthy(io.digitalWrite.calledWith(pins.piezo, io.LOW), 'speaker_reset')
        test.truthy(io.digitalWrite.calledWith(pins.led, io.LOW), 'led_reset')
      } catch (er) {
        return callback(er)
      }

      //var lastPiezoLowCall = lastCallWith(io.digitalWrite, pins.piezo, io.LOW)
      lastLedLowCall = lastCallWith(io.digitalWrite, pins.led, io.LOW)

      // After 2 more seconds the last piezo/led low call should still have been before the last piezo/led high call
      setTimeout(callback, 2000)
    },
    function(callback) {
      //var lastPiezoHighCall = lastCallWith(io.digitalWrite, pins.piezo, io.HIGH)
      lastLedHighCall = lastCallWith(io.digitalWrite, pins.led, io.HIGH)

      try {
        // TODO: We can't currently test this as there is no way to stop a piezo from playing a tune
        //test.truthy('speaker_turned_off_after_reset', lastPiezoLowCall.calledAfter(lastPiezoHighCall))

        test.truthy(lastLedLowCall.calledAfter(lastLedHighCall), 'led_turned_off_after_reset')
      } catch (er) {
        return callback(er)
      }

      io.digitalWrite.reset()

      // When a new fire temperature is received, the alarm shouldn't turn on
      analogReadListener(random(tempToVoltage(50.1), tempToVoltage(100)))

      setTimeout(callback, 2000)
    },
    function(callback) {
      try {
        test.falsey(io.digitalWrite.calledWith(pins.piezo, io.HIGH),
          'speaker_stayed_off_after_reset_before_temperature_drops')
        test.falsey(io.digitalWrite.calledWith(pins.led, io.HIGH),
          'led_stayed_off_after_reset_before_temperature_drops')
      } catch (er) {
        return callback(er)
      }

      // When the temp drops below 50 and then above 50, the alarm should turn on
      analogReadListener(random(tempToVoltage(0), tempToVoltage(50)))

      setTimeout(callback, 2000)
    },
    function(callback) {
      analogReadListener(random(tempToVoltage(50.1), tempToVoltage(100)))

      setTimeout(callback, 2000)
    },
    function(callback) {
      try {
        test.truthy(io.digitalWrite.calledWith(pins.piezo, io.HIGH), 'speaker_stayed_off_after_fire_after_reset')
        test.truthy(io.digitalWrite.calledWith(pins.led, io.HIGH), 'led_stayed_off_after_fire_after_reset')

        // Reset
        analogReadListener(random(tempToVoltage(0), tempToVoltage(50)))
      } catch (er) {
        return callback(er)
      }

      setTimeout(callback, 2000)
    }]

    setTimeout(async.series.bind(null, tests, cb), 2000)
}

function lastCallWith (spy/*, arg0, arg1...*/) {
  var args = Array.prototype.slice.call(arguments, 1)
  for (var i = spy.callCount - 1; i >=0; i--) {
    var call = spy.getCall(i)
    if (call.calledWith.apply(call, args)) {
      return call
    }
  }
  return null
}

function random (min, max) {
  return Math.random() * (max - min + 1) + min
}

function tempToVoltage (temp) {
  return ((temp / 100) + 0.5) / 0.004882814
}

module.exports = exercise
