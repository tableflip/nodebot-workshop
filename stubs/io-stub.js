var sinon = require('sinon'),
  EventEmitter = require('events').EventEmitter,
  util = require('util'),
  IOBoard = require('ioboard');

IO = function(path, callback) {
  IOBoard.call(this);

  this.pins = [];

  for(var i = 0; i < 14; i++) {
    var supportedModes = [IOBoard.CONSTANTS.MODES.OUTPUT, IOBoard.CONSTANTS.MODES.INPUT];

    if([3, 5, 6, 9, 10, 11].indexOf(i) != -1) {
      supportedModes.push(IOBoard.CONSTANTS.MODES.PWM);
    }

    this.pins.push({
      mode: IOBoard.CONSTANTS.MODES.OUTPUT,
      supportedModes: supportedModes,
      value : 0,
      report: 1
    });
  }

  this.analogPins = [];

  for(var i = 0; i < 6; i++) {
    this.analogPins.push({
      mode: IOBoard.CONSTANTS.MODES.ANALOG,
      supportedModes: [IOBoard.CONSTANTS.MODES.ANALOG],
      value : 0,
      report: 1
    });
  }

  this.MODES = IOBoard.CONSTANTS.MODES;
  this.HIGH = IOBoard.CONSTANTS.HIGH;
  this.LOW = IOBoard.CONSTANTS.LOW;

  setTimeout(function() {
    callback();
  }.bind(this), 1000);
}
util.inherits(IO, IOBoard);

module.exports = {
  Board: function(port, callback) {
    if(module.exports.singleton) {
      throw new Error("Board already created");
    }

    var singleton = new IO(port, callback);

    for(var key in singleton) {
      if(singleton[key] instanceof Function) {
        singleton[key] = sinon.spy(singleton[key]);
      }
    }

    module.exports.singleton = singleton;

    return singleton;
  }
};
