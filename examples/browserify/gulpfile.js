var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');

var path = {
  HTML: 'main.html',
  OUT: 'build.js',
  DEST_SRC: 'dist/js',
  DEST: 'dist',
  ENTRYPOINT: './js/app.js'  // initial file for our react code. Browsify uses this for checking requirements for additional files.
};


// copy html into build folder
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// build
gulp.task('build', function(){
  // init browserify with .jsx file
  browserify({
    entries: [path.ENTRYPOINT],
    debug: true
  })
    .transform(babelify, {presets: ["react"]})  // use babelify to JSX->JS transformation
    .bundle()  // create a js bundle from commonjs
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

// default task
gulp.task('default', ['copy', 'build']);
