/**
 * Verify that the solutions actually pass the tests...
 *
 * ## Usage
 *
 * `node verify-solutions.js "Blink Blink"`
 *
 * Test the solution to the specific workshop passes the verification step.
 *
 *
 * `node verify-solutions.js`
 *
 * Test all the exercises defined in `menu.json` have valid solutions. Run them in series, in a child process.
 *
 */
const workshopper = require('workshopper-adventure')
  , workshopperUtils = require('workshopper-adventure/util')
  , spawn       = require('child_process').spawn
  , async       = require('async')
  , path        = require('path')
  , fs          = require('fs')
  , menu        = require('../exercises/menu')

workshopper.prototype.printMenu = function () {
  // snap it off
}

var nodebot = workshopper({
    appDir      : __dirname + '/..'
  , menuFactory: {
      options: {},
      create: function () {
        return true
      }
    }
})
nodebot.addAll(require('../exercises/menu.json'))

function testSolution(name) {

  if(fs.existsSync(name)){ // we got a file name not an exercise name
    name = nameFromPath(name)
  }

  nodebot.getData = function(){
    return name
  }

  nodebot.loadExercise(name)

  var solution = path.relative(__dirname,
    path.join(__dirname, '..', 'exercises', workshopperUtils.dirFromName(name), 'solution', 'solution.js'))

  nodebot.execute(['select', name])
  nodebot.execute(['verify', solution])
}

if (process.argv.length > 2){

  testSolution(process.argv[2])

} else {

  async.eachSeries(menu, function(name, cb){
    var test = spawn('node', [__filename, name], {cwd: __dirname, stdio: 'inherit'})

    test.on('exit', function (code) {
      if (code !== 0) {
        cb(new Error('Solution failed:' + name))
      } else {
        cb()
      }
    })

  }, function (err) { // done all
    if(err) throw err
  })
}

// foo/exercises/ping_bell/solution/solution.js -> Ping Bell
function nameFromPath(path){
  var regex = /exercises(?:\/|\\)(\w+)(?:\/|\\)solution(?:\/|\\)solution\.js/
  var res = path.match(regex)
  if(!res) throw new Error('Cannot establish exercise from path: ' + path)
  return res[1]
}
