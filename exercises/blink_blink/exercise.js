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

var pins = {
  led: 13
}

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(verifyProcessor(exercise, function (test, done) {
  var io = five.stubs.firmata.singleton

  test.truthy(io, 'create_board_instance')

  var led = five.Led.instances[0]

  test.truthy(led, 'create_led_instance')
  test.equals(led.pin, pins.led, 'connect_led_to_pin', {pin: pins.pins})
  test.truthy(led.strobe.called || led.blink.called, 'led_flashing')

  if (led.blink.called) {
    test.equals(led.blink.getCall(0).args[0], 1000, 'led_flashing')
  } else {
    test.equals(led.strobe.getCall(0).args[0], 1000, 'led_flashing')
  }

  // should have set pin 13 into digital output mode
  test.truthy(io.pinMode.calledWith(13, io.MODES.OUTPUT), 'pin_mode', {pin: 2, mode: 'OUTPUT'})

  // should have turned pin 13 on and off
  test.truthy(io.digitalWrite.calledWith(13, io.HIGH), 'pin_turned_on')
  test.truthy(io.digitalWrite.calledWith(13, io.LOW), 'pin_turned_off')

  done()
}))

module.exports = exercise
