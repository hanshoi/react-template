var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

var path = {
  HTML: 'index.html',
  OUT: 'build.js',
  DEST_SRC: 'dist/js',
  DEST: 'dist',
  ENTRYPOINT: './app.js'
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
    return watcher.bundle()  
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
  };

  rebundle();
  return watcher.on('update', rebundle);
});

gulp.task('default', ['copy', 'watch']);
