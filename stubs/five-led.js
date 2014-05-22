var inherits = require("util").inherits;
var proxyquire = require("proxyquire");
var sinon = require("sinon");

var stubs = {
  firmata: require("./io-stub"),
  serialport: require("./serialport-stub")
};

stubs["serialport"]["@global"] = true;
stubs["firmata"]["@global"] = true;

var five = proxyquire("johnny-five", stubs);

// Add stubs and instances properties to five for inspection later
five.stubs = stubs;
five.instances = five.instances || {};
five.instances.Led = [];

var FiveLed = five.Led

function Led (opts) {
  FiveLed.call(this, opts);

  // Spy on Led functions
  for (var key in this) {
    if (this[key] instanceof Function) {
      this[key] = sinon.spy(this[key]);
    }
  }

  five.instances.Led.push(this);
}

inherits(Led, FiveLed);

// Replace five.Led with our stub
five.Led = Led;

module.exports = five;