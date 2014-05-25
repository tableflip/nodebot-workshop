var jshint = require('gulp-jshint')
var gulp   = require('gulp')

gulp.task('lint', function() {
  return gulp.src('./exercises/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('default', ['lint'], function() {
  // place code for your default task here
})
