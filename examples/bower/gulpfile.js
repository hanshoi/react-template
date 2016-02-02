var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var size = require('gulp-size');

var path = {
  OUT: 'build.js',
  DEST: 'application/static/scripts/js/',
  ENTRYPOINT: './application/static/scripts/jsx/app.js',
  SCSS: './application/static/stylesheets/scss/style.scss',
  CSS: './application/static/stylesheets/css/style.css'
};

// create a watcher for .js files by wrapping browserify with watchify
function getWatcher() {
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


// sass compiling
gulp.task('styles', function() {
  gulp.src(path.SCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.CSS))
    .pipe(size());
});


// main development task
gulp.task('watch', function() {
  gulp.watch(path.SCSS, ['styles']);

  var watcher = getWatcher();

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

gulp.task('default', ['styles', 'watch']);
