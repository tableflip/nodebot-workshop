var jshint = require('gulp-jshint')
var shell   = require('gulp-shell')
var gulp   = require('gulp')

var paths = {
  solutions:'./exercises/*/solution/solution.js',
  exercises:'./exercises/*/exercise.js',
  scripts: './exercises/**/*.js'
}

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
})

// WHY U NO FAIL ON ERRORS!?
gulp.task('verify-solutions', function() {
  return gulp.src(paths.solutions, {read: false})
    .pipe(
      shell(
        ['node verify-solutions.js <%= file.path %>'],
        {cwd: __dirname + '/tests'}))

    .on('error', function (err) {
      process.exit(-1)
    })
})

gulp.task('default', ['lint', 'verify-solutions'], function() {
  // place code for your default task here
})
