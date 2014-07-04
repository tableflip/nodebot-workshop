var notifier = {
  notify: function() {}
}

try {
  var Notification = require('node-notifier');
  notifier = new Notification();
} catch(e) {}

module.exports = function (excercise) {
  return function(error, callback) {
    if(!callback) {
      callback = error
      error = undefined
    }

    try {
      notifier.notify({
          title: 'nodebot-workshop',
          message: excercise.name + (error ? ' failed :(' : ' passed :)'),
          appIcon: __dirname + '/../assets/nodebots.png',
          contentImage: __dirname + '/../assets/' + (error ? 'sad' : 'happy') + '_robot' + ~~(Math.random() * 5) + '.jpg'
      })
    } catch(e) {}

    // needs enough time to show the notification
    setTimeout(callback.bind(callback, error, !error), 1000)
  }
}
