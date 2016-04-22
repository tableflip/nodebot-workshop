var dgram = require('dgram')

module.exports = function (exercise, passed, callback) {
  var sock = dgram.createSocket('udp4')
    , packet = new Buffer(JSON.stringify({
      workshop: exercise.workshopper.title,
      exercise: exercise.name,
      event: passed ? 'pass' : 'fail',
      timestamp: Date.now()
    }))
    , port = process.env.PROGRESS_BROADCAST_PORT || 1138

  try {
    sock.bind(port, '0.0.0.0', function (er) {
      if (er) return;
      sock.setBroadcast(true)

      sock.send(packet, 0, packet.length, port, '255.255.255.255', function () {
        sock.close()
      })
    })
  } catch (error) {}

  callback()
}
