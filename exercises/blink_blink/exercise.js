var proxyquire =  require("proxyquire"),
  should = require('chai').should();

// these will be required() in place of the real modules
var stubs = {
  "firmata": require('../../stubs/io-stub'),
  "serialport": require('../../stubs/serialport-stub')
};
stubs['serialport']['@global'] = true;
stubs['firmata']['@global'] = true;

var exercise      = require('workshopper-exercise')(),
  filecheck       = require('workshopper-exercise/filecheck'),
  execute         = require('workshopper-exercise/execute'),
  wrappedexec     = require('workshopper-wrappedexec'),
  path = require('path')

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
  proxyquire(path.join(process.cwd(), exercise.args[0]), stubs);

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null);
  }, 5000);
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  try {
    var io = stubs['firmata'].singleton;

    if(!io) {
      // yikes, board was never created
      return callback(null, false);
    }

    // should have set pin 13 into digital output mode
    io.pinMode.calledWith(13, io.MODES.OUTPUT).should.be.true;

    // should have turned pin 13 on and off
    io.digitalWrite.calledWith(13, io.HIGH).should.be.true;
    io.digitalWrite.calledWith(13, io.LOW).should.be.true;

    callback(null, true)
  } catch(e) {
    callback(e, false)
  }
})

module.exports = exercise
