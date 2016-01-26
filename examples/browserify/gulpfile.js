var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');

var path = {
  OUT: 'build.js',
  DEST_SRC: 'dist/js',
  DEST: 'dist',
  ENTRYPOINT: './js/app.js'
};

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
gulp.task('default', ['build']);
