var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var dgram = require('dgram')
var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var path = require('path')
var verifyProcessor = require('../../lib/verify-processor')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {
  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Piezo')})

  setTimeout(function() {
    console.log(exercise.__('please_wait'))
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 2000)
})

var pins = {
  piezo: 8
}

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(verifyProcessor(exercise, function (test, done) {
  var io = five.stubs.firmata.singleton

  test.truthy(io, 'create_board_instance')

  var piezo = five.Piezo.instances[0]

  test.truthy(piezo, 'create_speaker_instance')
  test.equals(piezo.pin, pins.piezo, 'connect_speaker_to_pin', {pin: pins.piezo})

  var initial = {
    play: {callCount: piezo.play.callCount}
  }

  var buffer = new Buffer('HAI!?')

  dgram.createSocket('udp4').send(buffer, 0, buffer.length, 1337, '127.0.0.1')

  // Allow some time for the udp packet to reach server and sound to be played
  setTimeout(function () {
    try {
      test.truthy(piezo.play.callCount > initial.play.callCount, 'speaker_played_tune_on_udp_message')

      done()
    } catch (error) {
      done(error)
    }
  }, 500)
}))

module.exports = exercise
