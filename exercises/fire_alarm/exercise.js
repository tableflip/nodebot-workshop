var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var expect = require('chai').expect

var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var execute = require('workshopper-exercise/execute')
var wrappedexec = require('workshopper-wrappedexec')
var path = require('path')
var notifier = require('../../lib/notifier')
var broadcaster = require('../../lib/broadcaster')

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

const pins = {
  temp: 0,
  led: 13,
  btn: 5,
  piezo: 9
}

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  try {
    var io = five.stubs.firmata.singleton

    expect(io, 'no board instance created').to.exist

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
    expect(io.digitalWrite.called, 'Fire alarm went off before a temperature was received!').to.be.false

    testAlarmTurnsOff(analogReadListener, io, function (error) {
      if (error) return broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })

      testAlarmResets(analogReadListener, io, function (error) {
        broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
      })
    })
  } catch (error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

function testAlarmTurnsOff (analogReadListener, io, cb) {
  analogReadListener(random(tempToVoltage(50.1), tempToVoltage(100)))

  // Within 2 seconds, the piezo should have sounded and the LED turned on
  setTimeout(function () {
    try {
      expect(io.digitalWrite.calledWith(pins.piezo, io.HIGH), 'Piezo was not turned on when fire started').to.be.true
      expect(io.digitalWrite.calledWith(pins.led, io.HIGH), 'LED was not turned on when fire started').to.be.true
    } catch (er) {
      return cb(er)
    }

    analogReadListener(random(tempToVoltage(0), tempToVoltage(50)))

    // Within 2 seconds the last call to digitalWrite should have been with io.LOW
    setTimeout(function () {
      try {
        expect(io.digitalWrite.calledWith(pins.piezo, io.LOW), 'Piezo was not turned off when fire stopped').to.be.true
        expect(io.digitalWrite.calledWith(pins.led, io.LOW), 'LED was not turned off when fire stopped').to.be.true
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
          /*expect(
            lastPiezoLowCall.calledAfter(lastPiezoHighCall),
            'Piezo was not turned off after it was turned on and fire stopped'
          ).to.be.true*/

          expect(
            lastLedLowCall.calledAfter(lastLedHighCall),
            'LED was not turned off after it was turned on and fire stopped'
          ).to.be.true

          cb()
        } catch (er) {
          return cb(er)
        }
      }, 2000)

    }, 2000)

  }, 2000)
}

function testAlarmResets (analogReadListener, io, cb) {
  io.digitalWrite.reset()

  analogReadListener(random(tempToVoltage(50.1), tempToVoltage(100)))

  // Within 2 seconds, the piezo should have sounded and the LED turned on
  setTimeout(function () {
    try {
      expect(io.digitalWrite.calledWith(pins.piezo, io.HIGH), 'Piezo was not turned on when fire started').to.be.true
      expect(io.digitalWrite.calledWith(pins.led, io.HIGH), 'LED was not turned on when fire started').to.be.true
    } catch (er) {
      return cb(er)
    }

    // Get the digital read listener for the button
    var digitalReadListener = null

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
    setTimeout(function () {
      digitalReadListener(0)

      // Within 2 seconds the last call to digitalWrite should have been with io.LOW
      setTimeout(function () {
        try {
          expect(
            io.digitalWrite.calledWith(pins.piezo, io.LOW),
            'Piezo was not turned off when reset button pressed'
          ).to.be.true

          expect(
            io.digitalWrite.calledWith(pins.led, io.LOW),
            'LED was not turned off when reset button pressed'
          ).to.be.true
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
            /*expect(
              lastPiezoLowCall.calledAfter(lastPiezoHighCall),
              'Piezo was not turned off after it was turned on and reset button pressed'
            ).to.be.true*/

            expect(
              lastLedLowCall.calledAfter(lastLedHighCall),
              'LED was not turned off after it was turned on and reset button pressed'
            ).to.be.true
          } catch (er) {
            return cb(er)
          }

          io.digitalWrite.reset()

          // When a new fire temperature is received, the alarm shouldn't turn on
          analogReadListener(random(tempToVoltage(50.1), tempToVoltage(100)))

          setTimeout(function () {
            try {
              expect(
                io.digitalWrite.calledWith(pins.piezo, io.HIGH),
                'Piezo turned back on after reset button pressed before temperature dropped below 50'
              ).to.be.false

              expect(io.digitalWrite.calledWith(pins.led, io.HIGH),
                'LED turned back on after reset button pressed before temperature dropped below 50'
              ).to.be.false
            } catch (er) {
              return cb(er)
            }

            // When the temp drops below 50 and then above 50, the alarm should turn on
            analogReadListener(random(tempToVoltage(0), tempToVoltage(50)))

            setTimeout(function () {
              analogReadListener(random(tempToVoltage(50.1), tempToVoltage(100)))

              setTimeout(function () {
                try {
                  expect(
                    io.digitalWrite.calledWith(pins.piezo, io.HIGH),
                    'Piezo was not turned on when fire started after reset button was pressed'
                  ).to.be.true

                  expect(
                    io.digitalWrite.calledWith(pins.led, io.HIGH),
                    'LED was not turned on when fire started after reset button was pressed'
                  ).to.be.true

                  // Reset
                  analogReadListener(random(tempToVoltage(0), tempToVoltage(50)))
                  setTimeout(cb, 2000)

                } catch (er) {
                  return cb(er)
                }
              }, 2000)

            }, 2000)

          }, 2000)

        }, 2000)

      }, 2000)

    }, 10)

  }, 2000)
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
