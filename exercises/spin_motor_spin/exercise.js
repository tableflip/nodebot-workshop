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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Board', 'Motor')})

  setTimeout(function() {
    console.log(exercise.__('please_wait'))
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 5000)
})

var pins = {
  motor: 9
}

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(verifyProcessor(exercise, function (test, done) {
  var io = five.stubs.firmata.singleton

  test.truthy(io, 'create_board_instance')

  var board = five.Board.instances[0]
  var motor = five.Motor.instances[0]

  test.truthy(motor, 'create_motor_instance')
  test.equals(motor.pin, pins.motor, 'connect_motor_to_pin', {pin: pins.motor})

  // Ensure start and stop were called
  test.truthy(motor.start.called, 'motor_start_called')
  test.truthy(motor.stop.called, 'motor_stop_called')
  test.greaterThan(motor.start.callCount, 1, 'motor_continually_start_and_stop')

  var start0 = motor.start.getCall(0)
  var start1 = motor.start.getCall(1)
  var stop0 = motor.stop.getCall(0)

  // Start was called before stop
  test.truthy(start0.calledBefore(stop0), 'motor_started_before_stopped')
  test.equals(start0.args[0], 200, 'motor_start_speed', {speed: 200})
  test.greaterThan(board.wait.callCount, 1, 'board_wait_called')

  var wait0 = board.wait.getCall(0)
  var wait1 = board.wait.getCall(1)

  // Ensure start -> wait -> stop -> wait -> start
  test.equals(wait0.args[0], 2000, 'board_waited_before_stopping', {seconds: 2})
  test.truthy(stop0.calledAfter(wait0), 'motor_stop_after_seconds', {seconds: 2})
  test.truthy(wait1.calledAfter(stop0), 'board_waited_after_stopping')
  test.equals(wait1.args[0], 1000, 'board_waited_before_starting_again', {seconds: 1})
  test.truthy(start1.calledAfter(wait1), 'motor_started_again', {seconds: 1})
  test.equals(start1.args[0], 200, 'motor_start_again_speed', {speed: 200})

  done()
}))

module.exports = exercise
