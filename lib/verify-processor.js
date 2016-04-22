var afterTest = require('./after-test')

var TestError = function (message) {
  Error.call(this, message)
}

TestError.prototype = Error.prototype

module.exports = function (exercise, verify) {
  var assert = function (message, context, fn) {
    if (fn()) {
      exercise.emit('pass', exercise.__('pass.' + message, context))
    } else {
      exercise.emit('fail', exercise.__('fail.' + message, context))

      throw new TestError('Failed!')
    }
  }

  var test = {
    equals: function (left, right, message, context) {
      assert(message, context, function () {
        return left === right
      })
    },
    truthy: function (left, message, context) {
      assert(message, context, function () {
        return !!left
      })
    },
    falsey: function (left, message, context) {
      assert(message, context, function () {
        return !left
      })
    },
    isA: function (left, right, message, context) {
      assert(message, context, function () {
        return left instanceof right
      })
    },
    closeTo: function (left, right, factor, message, context) {
      assert(message, context, function () {
        return Math.abs(left - right) <= factor
      })
    },
    greaterThan: function (left, right, message, context) {
      assert(message, context, function () {
        return left > right
      })
    },
    lessThan: function (left, right, message, context) {
      assert(message, context, function () {
        return left < right
      })
    }
  }

  var resolve = function (error, callback) {
    if (error) {
      if (error instanceof TestError) {
        // assertion failure
        afterTest(exercise, false, callback)
      } else {
        // other failure
        console.error(error.stack ? error.stack : error.toString())
        callback(error)
      }
    } else {
      afterTest(exercise, true, callback)
    }
  }

  return function (callback) {
    try {
      verify(test, function (error) {
        resolve(error, callback)
      })
    } catch (error) {
      resolve(error, callback)
    }
  }
}
