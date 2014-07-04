var proxyquire = require('proxyquire')
var async = require('async')
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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Sensor', 'Servo')})

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

    var sensor = five.Sensor.instances[0]
    var servo = five.Servo.instances[0]

    expect(sensor, 'no Sensor instance created').to.exist
    expect(sensor.pin, 'sensor expected to be connected to A2').to.equal(2)
    expect(sensor.mode, 'sensor expected to be connected to A2').to.equal(io.MODES.ANALOG)

    expect(servo, 'no Servo instance created').to.exist
    expect(servo.pin, 'servo expected to be connected to pin 9').to.equal(9)

    var analogReadListener = io.analogRead.getCall(0).args[1]

    var sensorScale = [0, 1023]
    var servoScale = [0, 179]

    // If the user added the scale on the sensor then use that
    if (sensor.scale.callCount) {
      var args = sensor.scale.getCall(0).args
      if (Array.isArray(args[0])) {
        servoScale = args[0]
      } else {
        servoScale = [args[0], args[1]]
      }
    }

    var initial = {
      to: {callCount: servo.to.callCount}
    }

    var sensorValues = [12, 50, 341, 620, 999.9, 1013.256, 501, 227.5]
    var i = 0

    async.eachSeries(
      sensorValues,
      function (val, cb) {
        // Read with this value
        analogReadListener(val)

        // Wait for the sensor to receive the value
        setTimeout(function () {
          try {
            expect(servo.to.callCount,
              'servo.to wasn\'t called when sensor was read')
                .to.equal(initial.to.callCount + i + 1)

            var expectedAngle = five.Fn.map(val, sensorScale[0], sensorScale[1], servoScale[0], servoScale[1])
            var actualAngle = servo.to.getCall(servo.to.callCount - 1).args[0]

            // +/- 5 degrees is ok
            expect(actualAngle, 'didn\'t move servo to correct angle').to.be.closeTo(expectedAngle, 5)
            i++
            cb()
          } catch (er) {
            cb(er)
          }
        }, sensor.freq + 0)
      },
      function (error) {
        broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
      })

  } catch(error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

module.exports = exercise
