var exercise      = require('workshopper-exercise')(), 
  filecheck       = require('workshopper-exercise/filecheck'),
  execute         = require('workshopper-exercise/execute'),
  wrappedexec     = require('workshopper-wrappedexec'),


// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

// wrap up the child process in a phantom wrapper that can
// mess with the global environment and inspect execution
exercise = wrappedexec(exercise)

// a module we want run just prior to the submission in the
// child process
exercise.wrapModule(require.resolve('../wrap-johnny-five'))

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  console.log('exercise', exercise)

  callback(null, true)
})

module.exports = exercise