var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var async = require('async')
var dnode = require('dnode')
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

  var temps = [1,1,1,1,1].map(function () {
    return random(133, 163) // Between ~ 15 deg and 30 deg
  })

  var d = dnode(() => {}, { weak: false })
  d = d.connect(1337)

  d.on('remote', function (remote) {
    try {
      test.isA(remote.getTemperature, Function, 'no_get_temperature_on_remote')
    } catch (e) {
      return done(e)
    }

    async.eachSeries(
      temps,
      function (val, cb) {
        var expectedTemp = ((val * 0.004882814) - 0.5) * 100

        // Read with this value
        analogReadListener(val)

        // Wait for the sensor to receive the value
        setTimeout(function () {
          remote.getTemperature(function (actualTemp) {
            try {
              // +/- 1 degree is ok
              test.closeTo(actualTemp, expectedTemp, 1, 'got_wrong_temperature')

              cb()
            } catch (er) {
              cb(er)
            }
          })
        }, 1000)
      },
      function (error) {
        done(error)
      })
  })

  d.on('error', function (error) {
    done(error)
  })
}))

function random (min, max) {
  return Math.random() * (max - min + 1) + min
}

module.exports = exercise
