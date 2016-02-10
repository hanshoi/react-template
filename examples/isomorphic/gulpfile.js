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
    entries: [pkg.vars.client_entrypoint],
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
  var client_bundler = getBundler();

  function rebundleApp() {
    client_bundler
      .external(_.keys(pkg.dependencies))
      .bundle()
      .on('error', handleErrors)
      .pipe(source(pkg.vars.client_bundle))
      .pipe(gulp.dest(pkg.vars.client_out))
      .pipe(size());
    gutil.log("Rebundle client app...");
  }

  rebundleApp();
  client_bundler.on('update', rebundleApp);

  // Bundle vendor apps
  var vendor_bundler = browserify({debug: pkg.vars.develop});
  _.keys(pkg.dependencies).forEach(function(dependency){
    vendor_bundler.require(dependency);
  });
  
  vendor_bundler.bundle()
    .on('error', handleErrors)
    .pipe(source(pkg.vars.vendor_bundle))
    .pipe(gulp.dest(pkg.vars.client_out))
    .pipe(size());

});

// default task
gulp.task('default', ['watch']);
