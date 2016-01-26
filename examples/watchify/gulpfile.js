var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'main.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST_SRC: 'dist/js',
  DEST_BUILD: 'dist/build',
  DEST: 'dist',
  ENTRYPOINT: './js/app.js'
};


// copy html into build folder
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// main development task
gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var b  = watchify(browserify({
    entries: [path.ENTRYPOINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
  
  function rebundle() {
    return b.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
  };


  b.on('update', rebundle);
  return rebundle();
});

// default task
gulp.task('default', ['copy', 'watch']);

//PRODUCTION
// build
gulp.task('build', function(){
  browserify({
    entries: [path.ENTRYPOINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

// replace HTML
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

// create the main production task
gulp.task('production', ['replaceHTML', 'build']);
