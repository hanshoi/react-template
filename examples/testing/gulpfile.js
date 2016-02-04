var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notify = require('gulp-notify');
var size = require('gulp-size');

var path = {
  OUT: 'build.js',
  DEST: 'app',
  ENTRYPOINT: './app/app.js',
};


// create a watcher for .js files by wrapping browserify with watchify
function getBrowserify() {
  return watchify(browserify({
    entries: [path.ENTRYPOINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
}


// handle browserify errors
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


// main development task
gulp.task('watch', function() {
  var watcher = watchify(getBrowserify());

  function rebundle() {
    watcher.bundle()
      .on('error', handleErrors)
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST))
      .pipe(size());
    gutil.log("Rebundle...");
  }

  rebundle();
  return watcher.on('update', rebundle);
});

// default task
gulp.task('default', ['watch']);
