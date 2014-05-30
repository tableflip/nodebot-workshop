var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var async = require('async')
var dnode = require('dnode')
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

    var temps = [1,1,1,1,1].map(function () {
      return random(133, 163) // Between ~ 15 deg and 30 deg
    })

    var d = dnode.connect(1337)

    d.on('remote', function (remote) {
      if (!remote.getTemperature) {
        return callback(new Error('Remote has no method \'getTemperature\''), false)
      }

      async.eachSeries(
        temps,
        function (val, cb) {
          // Read with this value
          analogReadListener(val)

          // Wait for the sensor to receive the value
          setTimeout(function () {
            remote.getTemperature(function (actualTemp) {
              try {
                var expectedTemp = ((val * 0.004882814) - 0.5) * 100

                // +/- 1 degree is ok
                expect(actualTemp, 'didn\'t receive expected temperature').to.be.closeTo(expectedTemp, 1)

                cb()
              } catch (er) {
                cb(er)
              }
            })
          }, 1000)
        },
        function (er) {
          if (er) return callback(er, false)
          callback(null, true)
        })
    })

    d.on('error', function (er) {
      callback(er, false)
    })

  } catch (e) {
    callback(e, false)
  }
})

function random (min, max) {
  return Math.random() * (max - min + 1) + min
}

module.exports = exercise
