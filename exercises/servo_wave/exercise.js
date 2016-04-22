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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Board', 'Servo')})

  setTimeout(function() {
    console.log(exercise.__('please_wait'))
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 4000)
})

var pins = {
  servo: 9
}

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(verifyProcessor(exercise, function (test, done) {
  var io = five.stubs.firmata.singleton

  test.truthy(io, 'create_board_instance')

  var board = five.Board.instances[0]
  var servo = five.Servo.instances[0]

  test.truthy(servo, 'create_servo_instance')
  test.equals(servo.pin, pins.servo, 'connect_servo_to_pin', {pin: pins.servo})

  test.truthy(servo.sweep.calledOnce, 'servo_sweep')
  test.truthy(board.wait.calledOnce, 'board_wait_called')

  test.truthy(servo.stop.calledOnce, 'servo_did_not_stop')

  var wait0 = board.wait.getCall(0)
  var stop0 = servo.stop.getCall(0)
  var toLast = servo.to.getCall(servo.to.callCount - 1)

  test.truthy(wait0.calledBefore(stop0), 'servo_stopped')
  test.equals(wait0.args[0], 3000, 'servo_wait')
  test.truthy(stop0.calledBefore(toLast), 'servo_stop_before_return_to_center')
  test.equals(toLast.args[0], 90, 'servo_returned_to_center')

  done()
}))

module.exports = exercise
