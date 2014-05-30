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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Led')})

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

    var led = five.Led.instances[0]

    expect(led, 'no led instance created').to.exist

    expect(led.pin, 'led expected to be connected to pin 13').to.equal(13)
    expect(led.strobe.called, 'led.strobe was not called').to.be.true
    expect(led.strobe.getCall(0).args[0], 'led.strobe was not called with 1000').to.equal(1000)

    // should have set pin 13 into digital output mode
    expect(io.pinMode.calledWith(13, io.MODES.OUTPUT)).to.be.true

    // should have turned pin 13 on and off
    expect(io.digitalWrite.calledWith(13, io.HIGH)).to.be.true
    expect(io.digitalWrite.calledWith(13, io.LOW)).to.be.true

    callback(null, true)
  } catch(e) {
    callback(e, false)
  }
})

module.exports = exercise
