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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Led', 'Sensor')})

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

    expect(io, 'no board instance created').to.exist

    // Get the listener that is listening for reads on pin A0
    var analogReadListener = null

    for (var i = 0; i < io.analogRead.callCount; i++) {
      var call = io.analogRead.getCall(i)
      if (call.args[0] === 0) {
        analogReadListener = call.args[1]
        break
      }
    }

    expect(analogReadListener, 'No values were read from A0').to.not.be.null

    var led = five.Led.instances[0]
    var sensor = five.Sensor.instances[0]

    expect(led, 'no led instance created').to.exist
    expect(led.pin, 'led expected to be connected to pin 9').to.equal(9)

    // User may have set a high value for analog noise filtering
    var freq = sensor ? sensor.freq : 100

    analogReadListener(random(600, 900))

    setTimeout(function () {
      try {
        expect(led.on.called, 'led was not turned on when resistor value high').to.be.true
      } catch (er) {
        return broadcaster(exercise)(er, function (er) { notifier(exercise)(er, callback) })
      }

      analogReadListener(random(0, 600))

      setTimeout(function () {
        try {
          expect(led.off.called, 'led was not turned off when resistor value low').to.be.true
          expect(
            led.off.lastCall.calledAfter(led.on.lastCall),
            'led was not turned off after it was turned on'
          ).to.be.true
        } catch (er) {
          return broadcaster(exercise)(er, function (er) { notifier(exercise)(er, callback) })
        }

        analogReadListener(random(600, 900))

        setTimeout(function () {
          try {
            expect(
              led.on.lastCall.calledAfter(led.off.lastCall),
              'led was not turned on after it was turned off'
            ).to.be.true
            broadcaster(exercise)(function (er) { notifier(exercise)(er, callback) })
          } catch (error) {
            broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
          }
        }, freq)
      }, freq)
    }, freq)

  } catch (error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

function random (min, max) {
  return Math.random() * (max - min + 1) + min
}

module.exports = exercise
