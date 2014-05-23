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

// Add stubs to five for inspection later
five.stubs = stubs;

function createSpy (Constructor) {
  // Wrap methods with spies and store instances
  function SpyConstructor (opts) {
    Constructor.call(this, opts);

    // Spy on Constructor functions
    for (var key in this) {
      if (this[key] instanceof Function) {
        this[key] = sinon.spy(this[key]);
      }
    }

    SpyConstructor.instances.push(this);
  }
  inherits(SpyConstructor, Constructor);

  // Copy keys from constructor onto the spy
  Object.keys(Constructor).forEach(function (key) {
    SpyConstructor[key] = Constructor[key];
  });

  SpyConstructor.instances = [];

  return sinon.spy(SpyConstructor);
}

// Create a new constructor which wraps spies around it's methods when created
five.spyOn = function (/* "Board", "Led" ...etc. */) {
  var args = Array.prototype.slice.call(arguments)

  args.forEach(function (name) {
    this[name] = createSpy(this[name])
  }, this)

  return this;
}

module.exports = five;