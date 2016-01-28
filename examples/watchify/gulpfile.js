var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');  // using reactify for jsx->js conversions
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
  gulp.watch(path.HTML, ['copy']);  // watch .html and run task copy on change

  // create a watcher for .js files by wrapping browserify with watchify
  var b  = watchify(browserify({
    entries: [path.ENTRYPOINT],
    transform: [reactify],   // reactify plugin for jsx->js transformation
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true  // don't ask, just needed for watchify
  }));
  
  // basic bundling function. Bundle all files together and put them in build.js in dist/js
  function rebundle() {
    return b.bundle()  
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
  };

  // on update run rebundle()
  rebundle();  // run rebundle when executing this command.
  return b.on('update', rebundle);
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
