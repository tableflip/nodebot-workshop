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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Board', 'Servo')})

  setTimeout(function() {
    console.log('Please wait while your solution is tested...')
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 4000)
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  try {
    var io = five.stubs.firmata.singleton

    if (!io) {
      // yikes, board was never created
      return callback(null, false)
    }

    var board = five.Board.instances[0]
    var servo = five.Servo.instances[0]

    expect(servo, 'no servo instance created').to.exist
    expect(servo.pin, 'servo expected to be connected to pin 9').to.equal(9)

    expect(servo.sweep.calledOnce, 'servo did not sweep').to.be.true
    expect(board.wait.calledOnce, 'board.wait was not used').to.be.true
    expect(servo.stop.calledOnce, 'servo did not stop before moving to expected angle').to.be.true

    var wait0 = board.wait.getCall(0)
    var stop0 = servo.stop.getCall(0)
    var toLast = servo.to.getCall(servo.to.callCount - 1)

    expect(wait0.calledBefore(stop0), 'servo unexpectedly stopped before waiting').to.be.true
    expect(wait0.args[0], 'servo did not wait for expected time').to.equal(3000)
    expect(stop0.calledBefore(toLast), 'servo did not stop before returning to center').to.be.true
    expect(toLast.args[0], 'servo did not return to center').to.equal(90)

    callback(null, true)
  } catch(e) {
    callback(e, false)
  }
})

module.exports = exercise
