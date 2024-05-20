var sinon = require('sinon');

var SerialPort = function() {

}

SerialPort.list = sinon.stub()
SerialPort.list.resolves([{
  // has to match the regex /usb|acm|^com/i
  path: '/dev/cu.usbserial-FAKEID'
}])

module.exports = sinon.spy(SerialPort)
