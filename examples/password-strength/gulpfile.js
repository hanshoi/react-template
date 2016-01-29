var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notify = require('gulp-notify');

var path = {
  HTML: 'src/index.html',
  OUT: 'build.js',
  DEST: 'dist',
  ENTRYPOINT: './src/js/app.js'
};

// create a watcher for .js files by wrapping browserify with watchify
function getWatcher() {
  return watchify(browserify({
    entries: [path.ENTRYPOINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
};


// handle browserify errors
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


// copy html into build folder
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// main development task
gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);
  var watcher = getWatcher();

  function rebundle() {
    watcher.bundle()
      .on('error', handleErrors)
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST));
    gutil.log("Rebundle...");
  };

  rebundle();
  return watcher.on('update', rebundle);
});

gulp.task('default', ['copy', 'watch']);
