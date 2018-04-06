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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Led')})

  setTimeout(function() {
    console.log(exercise.__('please_wait'))
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 4000)
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(verifyProcessor(exercise, function (test, done) {
  var io = five.stubs.firmata.singleton

  test.truthy(io, 'create_board_instance')

  var led = five.Led.instances[0]

  test.truthy(led, 'create_led_instance')
  test.truthy(led.pin, 'connect_led_to_pin', { pin: led.pin })
  test.truthy(led.strobe.called || led.blink.called, 'blink_strobe_called')

  if (led.blink.called) {
    test.equals(led.blink.getCall(0).args[0], 1000, 'led_flashing')
  } else {
    test.equals(led.strobe.getCall(0).args[0], 1000, 'led_flashing')
  }

  done()
}))

module.exports = exercise
