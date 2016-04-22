var async = require('async')
var notifier = require('./notifier')
var broadcaster = require('./broadcaster')

module.exports = function (exercise, passed, callback) {
  async.parallel([
    broadcaster.bind(null, exercise, passed),
    notifier.bind(null, exercise, passed)
  ], function (error) {
    callback(error, passed)
  })
}
