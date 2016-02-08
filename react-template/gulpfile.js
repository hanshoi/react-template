var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('babelify');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var htmlreplace = require('gulp-html-replace');
var livereload = require('gulp-livereload');
var mocha = require('gulp-spawn-mocha');
var conf = require('./package.json');

/*
var path = {
  OUT: 'build.js',
  MINIFIED_OUT: 'build.min.js',
  HTML: 'application/templates/index.html',
  HTML_FOLDER: 'application/templates/',
  DEST: 'application/static/scripts/js/',
  ENTRYPOINT: './application/static/scripts/jsx/app.js',
  SCSS_FOLDER: './application/static/stylesheets/scss/*.scss',
  CSS_FOLDER: './application/static/stylesheets/css/'
};
*/

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};


// create a watcher for .js files by wrapping browserify with watchify
function getBundler() {
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
  gulp.src(path.SCSS_FOLDER)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(path.CSS_FOLDER))
    .pipe(size());
});


// main development task
gulp.task('watch', function() {
  gulp.watch(path.SCSS, ['styles'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

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


// replace HTML
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'scripts/js/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.HTML_FOLDER));
});


// build for production task
gulp.task('build', function(){
  // sass
  gulp.src(path.SCSS_FOLDER)
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(path.CSS_FOLDER))
    .pipe(size());

  // js
  getBrowserify().bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST))
    .pipe(size());

  gutil.log("Production bundle created");
});

// production task
gulp.task('production', ['replaceHTML', 'build']);

// default task
gulp.task('default', ['styles', 'watch']);
