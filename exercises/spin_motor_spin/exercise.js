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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Board', 'Motor')})

  setTimeout(function() {
    console.log('Please wait while your solution is tested...')
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 5000)
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  try {
    var io = five.stubs.firmata.singleton

    expect(io, 'no board instance created').to.exist

    var board = five.Board.instances[0]
    var motor = five.Motor.instances[0]

    expect(motor, 'no motor instance created').to.exist
    expect(motor.pin, 'motor expected to be connected to pin 9').to.equal(9)

    // Ensure start and stop were called
    expect(motor.start.called, 'motor.start was not called').to.be.true
    expect(motor.stop.called, 'motor.stop was not called').to.be.true

    expect(motor.start.callCount, 'motor doesn\'t continually start and stop').to.be.gt(1)

    var start0 = motor.start.getCall(0)
    var start1 = motor.start.getCall(1)
    var stop0 = motor.stop.getCall(0)

    // Start was called before stop
    expect(start0.calledBefore(stop0), 'motor was not started before it was stopped!').to.be.true
    expect(start0.args[0], 'motor not started at 200').to.equal(200)
    expect(board.wait.callCount, 'board.wait was not called').to.be.gt(1)

    var wait0 = board.wait.getCall(0)
    var wait1 = board.wait.getCall(1)

    // Ensure start -> wait -> stop -> wait -> start
    expect(wait0.args[0], 'didn\'t use board.wait to wait 2 seconds before stopping the motor').to.equal(2000)
    expect(stop0.calledAfter(wait0), 'motor didn\'t stop after 2 seconds')
    expect(wait1.calledAfter(stop0), 'didn\'t use board.wait after motor stopped')
    expect(wait1.args[0], 'didn\'t use board.wait to wait 1 second before starting the motor again').to.equal(1000)
    expect(start1.calledAfter(wait1), 'motor didn\'t start again after 1 second')
    expect(start1.args[0], 'motor not started again at 200').to.equal(200)

    broadcaster(exercise)(function (er) { notifier(exercise)(er, callback) })
  } catch(error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

module.exports = exercise
