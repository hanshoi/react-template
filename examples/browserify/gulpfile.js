var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');

var path = {
  HTML: 'main.html',
  OUT: 'build.js',
  DEST_SRC: 'dist/js',
  DEST: 'dist',
  ENTRYPOINT: './js/app.js'
};


// copy html into build folder
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// build
gulp.task('build', function(){
  browserify({
    entries: [path.ENTRYPOINT],
    debug: true
  })
    .transform(babelify, {presets: ["react"]})
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

// default task
gulp.task('default', ['copy', 'build']);
