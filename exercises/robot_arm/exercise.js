var proxyquire = require('proxyquire')
var async = require('async')
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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Sensor', 'Servo')})

  setTimeout(function() {
    console.log(exercise.__('please_wait'))
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 2000)
})

var pins = {
  sensor: 2,
  servo: 9
}

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(verifyProcessor(exercise, function (test, done) {
  var io = five.stubs.firmata.singleton

  test.truthy(io, 'create_board_instance')

  var sensor = five.Sensor.instances[0]
  var servo = five.Servo.instances[0]

  test.truthy(sensor, 'create_sensor_instance')
  test.equals(sensor.pin, pins.sensor, 'connect_sensor_to_pin', {pin: pins.sensor})
  test.truthy(io.pinMode.calledWith(pins.sensor, io.MODES.ANALOG), 'pin_mode', {pin: pins.sensor, mode: 'ANALOG'})

  test.truthy(servo, 'create_servo_instance')
  test.equals(servo.pin, pins.servo, 'connect_servo_to_pin', {pin: pins.servo})
  test.truthy(io.pinMode.calledWith(pins.servo, io.MODES.SERVO), 'pin_mode', {pin: pins.servo, mode: 'SERVO'})

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
          test.equals(servo.to.callCount, initial.to.callCount + i + 1, 'servo_to_called')

          var expectedAngle = five.Fn.map(val, sensorScale[0], sensorScale[1], servoScale[0], servoScale[1])
          var actualAngle = servo.to.getCall(servo.to.callCount - 1).args[0]

          // +/- 5 degrees is ok
          test.closeTo(actualAngle, expectedAngle, 5, 'servo_moved_to_correct_angle')
          i++
          cb()
        } catch (er) {
          cb(er)
        }
      }, sensor.freq + 0)
    },
    function (error) {
      done(error)
    })
}))

module.exports = exercise
