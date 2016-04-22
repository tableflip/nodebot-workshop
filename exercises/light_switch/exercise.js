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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Button', 'Led')})

  setTimeout(function() {
    console.log(exercise.__('please_wait'))
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 2000)
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(verifyProcessor(exercise, function (test, done) {
  function pressBtn () {
    ['down', 'press', 'tap', 'impact', 'hit'].forEach(function (name) {
      btn.emit(name)
    })

    ;['up', 'release'].forEach(function (name) {
      btn.emit(name)
    })
  }

  var io = five.stubs.firmata.singleton

  test.truthy(io, 'create_board_instance')

  var btn = five.Button.instances[0]
  var led = five.Led.instances[0]

  test.truthy(btn, 'create_button_instance')
  test.truthy(led, 'create_led_instance')

  test.equals(btn.pin, 5, 'connect_button_to_pin', {pin: 5})
  test.equals(led.pin, 9, 'connect_led_to_pin', {pin: 9})

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
    test.equals(led.off.callCount, initial.off.callCount + 1, 'led_turn_off_after_first_press')
  } else {
    // Led should now be on
    test.equals(led.on.callCount, initial.on.callCount + 1, 'led_turn_on_after_first_press')
  }

  pressBtn()

  if (initial.isOn) {
    // Led should now be on
    test.equals(led.on.callCount, initial.on.callCount + 1, 'led_turn_on_after_second_press')
  } else {
    // Led should now be off
    test.equals(led.off.callCount, initial.off.callCount + 1, 'led_turn_off_after_second_press')
  }

  pressBtn()

  if (initial.isOn) {
    // Led should now be off
    test.equals(led.off.callCount, initial.off.callCount + 2, 'led_turn_off_after_third_press')
  } else {
    // Led should now be on
    test.equals(led.on.callCount, initial.on.callCount + 2, 'led_turn_on_after_third_press')
  }

  pressBtn()

  if (initial.isOn) {
    // Led should now be on
    test.equals(led.on.callCount, initial.on.callCount + 2, 'led_turn_on_after_fourth_press')
  } else {
    // Led should now be off
    test.equals(led.off.callCount, initial.off.callCount + 2, 'led_turn_off_after_fourth_press')
  }

  done()
}))

module.exports = exercise
