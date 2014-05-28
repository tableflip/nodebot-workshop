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
const workshopper = require('workshopper')
  , spawn       = require('child_process').spawn
  , async       = require('async')
  , path        = require('path')
  , fs          = require('fs')
  , menu        = require('../exercises/menu')
  , name        = 'nodebot-workshop'
  , title       = 'Nodebot Workshop'
  , subtitle    = '\x1b[23mSelect an exercise and hit \x1b[3mEnter\x1b[23m to begin'

function fpath (f) {
  return path.join(__dirname, f)
}

workshopper.prototype.printMenu = function () {
  // snap it off
}

var nodebot = workshopper({
  name        : name
  , title       : title
  , subtitle    : subtitle
  , exerciseDir : fpath('../exercises/')
  , appDir      : __dirname + '/..'
  , helpFile    : fpath('help.txt')
  , menuItems   : []
  , menu        : {fg: "black", bg: 220}
})

function testSolution(name) {

  if(fs.existsSync(name)){ // we got a file name not an exercise name
    name = nameFromPath(name)
  }

  console.log(nodebot.dirFromName(name))

  nodebot.getData = function(){
    return name
  }
  var solution = path.relative(__dirname, nodebot.dirFromName(name) + '/solution/solution.js')

  nodebot.execute('verify', [solution])
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
  var regex = /exercises\/(\w+)\/solution\/solution\.js/
  var res = path.match(regex)
  if(!res) throw new Error('Cannot establish exercise from path: ' + path)
  return toExerciseName(res[1])
}

// ping_pell -> Ping Bell
function toExerciseName (str) {
  return str.split('_').map(function(str){ return str.charAt(0).toUpperCase() + str.slice(1)}).join(' ')
}
