var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var expect = require('chai').expect

var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var execute = require('workshopper-exercise/execute')
var wrappedexec = require('workshopper-wrappedexec')
var path = require('path')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

// wrap up the child process in a phantom wrapper that can
// mess with the global environment and inspect execution
exercise = wrappedexec(exercise)

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {
  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five})

  setTimeout(function() {
    console.log('Please wait while your solution is tested...')
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 2000)
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  try {
    var io = five.stubs.firmata.singleton

    if (!io) {
      // yikes, board was never created
      return callback(null, false)
    }

    const pins = {
      temp: 0,
      led: 13,
      btn: 5,
      piezo: 9
    }

    // Get the listener that is listening for reads on pin A0
    var analogReadListener = null

    for (var i = 0; i < io.analogRead.callCount; i++) {
      var call = io.analogRead.getCall(i)
      if (call.args[0] === pins.temp) {
        analogReadListener = call.args[1]
        break
      }
    }

    expect(analogReadListener, 'No values were read from A0').to.not.be.null

    analogReadListener(random(50.1, 100))

    expect(io.digitalWrite.called, 'Fire alarm went off before a temperature was received!').to.be.false

    // Within 2 seconds, the piezo should have sounded and the LED turned on
    setTimeout(function () {
      expect(io.digitalWrite.calledWith(pins.piezo, io.HIGH), 'Piezo was not turned on when fire started').to.be.true
      expect(io.digitalWrite.calledWith(pins.led, io.HIGH), 'LED was not turned on when fire started').to.be.true

      analogReadListener(random(0, 50))

      // Within 2 seconds the last call to digitalWrite should have been with io.LOW
      setTimeout(function () {
        expect(io.digitalWrite.calledWith(pins.piezo, io.LOW), 'Piezo was not turned off when fire stopped').to.be.true
        expect(io.digitalWrite.calledWith(pins.led, io.LOW), 'LED was not turned off when fire stopped').to.be.true

        var lastPiezoLowCall = lastCallWith(io.digitalWrite, pins.piezo, io.LOW)
        var lastLedLowCall = lastCallWith(io.digitalWrite, pins.led, io.LOW)

        // After 2 more seconds the last piezo/led low call should have been before the last piezo/led high call
        setTimeout(function () {
          var lastPiezoHighCall = lastCallWith(io.digitalWrite, pins.piezo, io.HIGH)
          var lastLedHighCall = lastCallWith(io.digitalWrite, pins.led, io.HIGH)

          expect(
            lastPiezoLowCall.calledAfter(lastPiezoHighCall),
            'Piezo was not turned off after it was turned on and fire stopped'
          ).to.be.true

          expect(
            lastLedLowCall.calledAfter(lastLedHighCall),
            'LED was not turned off after it was turned on and fire stopped'
          ).to.be.true
        }, 2000)

      }, 2000)

    }, 2000)

  } catch (e) {
    callback(e, false)
  }
})

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

module.exports = exercise
