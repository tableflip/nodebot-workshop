var proxyquire = require("proxyquire");
var five = require("../../stubs/five-led");
var expect = require("chai").expect;

var exercise      = require('workshopper-exercise')(),
  filecheck       = require('workshopper-exercise/filecheck'),
  execute         = require('workshopper-exercise/execute'),
  wrappedexec     = require('workshopper-wrappedexec'),
  path            = require('path')

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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {"johnny-five": five});

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null);
  }, 5000);
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  try {
    var io = five.stubs.firmata.singleton;

    if (!io) {
      // yikes, board was never created
      return callback(null, false);
    }

    var led = five.instances.Led[0];

    expect(led.pin, "led expected to be connected to pin 13").to.equal(13);
    expect(led.strobe.calledWith(1000), "led.strobe was not called with 1000").to.be.true;

    // should have set pin 13 into digital output mode
    expect(io.pinMode.calledWith(13, io.MODES.OUTPUT)).to.be.true;

    // should have turned pin 13 on and off
    expect(io.digitalWrite.calledWith(13, io.HIGH)).to.be.true;
    expect(io.digitalWrite.calledWith(13, io.LOW)).to.be.true;

    callback(null, true)
  } catch(e) {
    callback(e, false)
  }
})

module.exports = exercise
