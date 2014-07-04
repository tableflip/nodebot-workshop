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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Button', 'Led')})

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
  function pressBtn () {
    ['down', 'press', 'tap', 'impact', 'hit'].forEach(function (name) {
      btn.emit(name)
    })

    ;['up', 'release'].forEach(function (name) {
      btn.emit(name)
    })
  }

  try {
    var io = five.stubs.firmata.singleton

    expect(io, 'no board instance created').to.exist

    var btn = five.Button.instances[0]
    var led = five.Led.instances[0]

    expect(btn, 'no button instance created').to.exist
    expect(led, 'no LED instance created').to.exist

    expect(btn.pin, 'LED expected to be connected to pin 5').to.equal(5)
    expect(led.pin, 'LED expected to be connected to pin 9').to.equal(9)

    // Initial state
    var initial = {
      off: {callCount: led.off.callCount},
      on: {callCount: led.on.callCount},
      isOn: led.isOn
    }

    // w00t! We're all setup, now test a button press
    pressBtn()

    if (initial.isOn) {
      // Led should now be off
      expect(led.off.callCount, 'LED did not turn off after first button press').to.be.equal(initial.off.callCount + 1)
    } else {
      // Led should now be on
      expect(led.on.callCount, 'LED did not turn on after first button press').to.be.equal(initial.on.callCount + 1)
    }

    pressBtn()

    if (initial.isOn) {
      // Led should now be on
      expect(led.on.callCount, 'LED did not turn on after second button press').to.be.equal(initial.on.callCount + 1)
    } else {
      // Led should now be off
      expect(led.off.callCount, 'LED did not turn on after second button press').to.be.equal(initial.off.callCount + 1)
    }

    pressBtn()

    if (initial.isOn) {
      // Led should now be off
      expect(led.off.callCount, 'LED did not turn off after third button press').to.be.equal(initial.off.callCount + 2)
    } else {
      // Led should now be on
      expect(led.on.callCount, 'LED did not turn off after third button press').to.be.equal(initial.on.callCount + 2)
    }

    pressBtn()

    if (initial.isOn) {
      // Led should now be on
      expect(led.on.callCount, 'LED did not turn on after fourth button press').to.be.equal(initial.on.callCount + 2)
    } else {
      // Led should now be off
      expect(led.off.callCount, 'LED did not turn off after fourth button press').to.be.equal(initial.off.callCount + 2)
    }

    broadcaster(exercise)(function (er) { notifier(exercise)(er, callback) })
  } catch(error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

module.exports = exercise
