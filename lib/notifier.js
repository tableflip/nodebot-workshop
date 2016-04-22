var notifier = {
  notify: function () {}
}

try {
  notifier = require('node-notifier')
} catch (e) {

}

module.exports = function (excercise, passed, callback) {
  try {
    notifier.notify({
        title: excercise.__('title'),
        message: excercise.name + (passed ? ' passed :)' : ' failed :('),
        appIcon: __dirname + '/../assets/nodebots.png',
        contentImage: __dirname + '/../assets/' + (passed ? 'happy' : 'sad') + '_robot' + ~~(Math.random() * 5) + '.jpg'
    })
  } catch(e) {

  }

  // needs enough time to show the notification
  setTimeout(callback, 1000)
}
