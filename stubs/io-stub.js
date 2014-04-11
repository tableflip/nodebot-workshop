var sinon = require('sinon'),
  EventEmitter = require('events').EventEmitter,
  util = require('util'),
  IOBoard = require('ioboard');

// an IO plugin for Johnny-Five that looks like an Arduino UNO
// https://github.com/rwaldron/johnny-five/wiki/IO-Plugins
IO = function(path, callback) {
  IOBoard.call(this, {quiet: true});

  // pretend we've connected to firmata
  setTimeout(function() {
    this.emit("connected");

    // would now query the board's capabilities
    setTimeout(function() {

      // set digital pin capabilities
      for(var i = 0; i < 20; i++) {
        var supportedModes = [];
        var mode = this.MODES.OUTPUT;
        var analogChannel = 127;

        // set analog pin capabilities
        if(i < 13) {
          // standard modes supported by digital pins
          if(i > 1) {
            supportedModes.push(this.MODES.OUTPUT);
            supportedModes.push(this.MODES.INPUT);
            supportedModes.push(this.MODES.SERVO);
          }

          // these pins also support pwm mode
          if([3, 5, 6, 9, 10, 11].indexOf(i) != -1) {
            supportedModes.push(this.MODES.PWM);
          }
        } else {
          // pins > 13 are analog
          mode = this.MODES.ANALOG;
          analogChannel = i - 14;
          supportedModes = [this.MODES.OUTPUT, this.MODES.INPUT, this.MODES.ANALOG];
        }

        // populate pins array
        this._pins.push({
          supportedModes: supportedModes,
          mode: mode,
          value : 0,
          report: 0,
          analogChannel: analogChannel
        });
      }

      this.emit("ready");

      callback();
    }.bind(this), 200);
  }.bind(this), 200);
}
util.inherits(IO, IOBoard);

module.exports = {
  Board: function(port, callback) {
    if(module.exports.singleton) {
      throw new Error("Board already created");
    }

    var singleton = new IO(port, callback);

    // spy on every IO method
    for(var key in singleton) {
      if(singleton[key] instanceof Function) {
        singleton[key] = sinon.spy(singleton[key]);
      }
    }

    // we're going to interrogate the singleton during solution verification
    module.exports.singleton = singleton;

    return singleton;
  }
};
