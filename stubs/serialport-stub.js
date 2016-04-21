var sinon = require('sinon');

var SerialPort = function() {

}

SerialPort.list = sinon.stub()
SerialPort.list.callsArgWithAsync(0, null, [{
  // has to match the regex /usb|acm|^com/i
  comName: '/dev/cu.usbserial-FAKEID'
}])

module.exports = sinon.spy(SerialPort)
