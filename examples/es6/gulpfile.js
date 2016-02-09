var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var notify = require('gulp-notify');
var size = require('gulp-size');
var _ = require('underscore');
var pkg = require('./package.json');


// create a watcher for .js files by wrapping browserify with watchify
function getBundler() {
  return watchify(browserify({
    entries: [pkg.vars.app_entrypoint],
    transform: [babelify],
    debug: pkg.vars.develop,
    cache: {}, packageCache: {}, fullPaths: true
  }));
}


// handle browserify errors
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>',
    notifier: function(options, callback) {
      // disable the popup
      callback();
    }
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


// main development task
gulp.task('watch', function() {
  var app_bundler = getBundler();

  function rebundleApp() {
    app_bundler
      .external(_.keys(pkg.dependencies))
      .bundle()
      .on('error', handleErrors)
      .pipe(source(pkg.vars.app_bundle))
      .pipe(gulp.dest(pkg.vars.build_folder))
      .pipe(size());
    gutil.log("Rebundle app...");
  }

  rebundleApp();
  app_bundler.on('update', rebundleApp);

  var vendor_bundler = browserify({debug: pkg.vars.develop});
  _.keys(pkg.dependencies).forEach(function(dependency){
    vendor_bundler.require(dependency);
  });
  
  vendor_bundler.bundle()
    .on('error', handleErrors)
    .pipe(source(pkg.vars.vendor_bundle))
    .pipe(gulp.dest(pkg.vars.build_folder))
    .pipe(size());

});

// default task
gulp.task('default', ['watch']);
