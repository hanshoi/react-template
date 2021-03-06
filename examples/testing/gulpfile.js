var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var notify = require('gulp-notify');
var size = require('gulp-size');
var livereload = require('gulp-livereload');
var mocha = require('gulp-spawn-mocha');
var conf = require('./package.json');


// create a watcher for .js files by wrapping browserify with watchify
function getBundler(entrypoint, external) {
  return watchify(browserify({
    entries: [entrypoint],
    transform: [babelify],
    debug: conf.vars.develop,
    bundleExternal: external,    // prevent bundling vendor packages (react, react-dom)
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
  var app_bundler = getBundler(conf.vars.app_entrypoint, false);

  function rebundleApp() {
    app_bundler.bundle()
      .on('error', handleErrors)
      .pipe(source(conf.vars.app_bundle))
      .pipe(gulp.dest(conf.vars.build_folder))
      .pipe(size())
      .pipe(livereload());
    gutil.log("Rebundle app...");
  }

  rebundleApp();
  app_bundler.on('update', rebundleApp);
});


gulp.task('test', function () {
  return gulp.src([conf.vars.test_files], {read: false})
    .pipe(mocha({
      debug: true,
      compilers: "js:babel-register",
      r: './app/test/setup.js',
      R: 'nyan'
    }));
});


gulp.task('tdd', ['test'], function() {
  gulp.watch(conf.vars.test_files, ['test']);
  gulp.watch(conf.vars.build_folder + "/" + conf.vars.app_bundle, ['test']);
});

// default task
gulp.task('default', ['watch']);
