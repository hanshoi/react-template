var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var notify = require('gulp-notify');
var size = require('gulp-size');
var pkg = require('./package.json');


// create a watcher for .js files by wrapping browserify with watchify
function getBundler(entries) {
  return watchify(browserify({
    entries: [entries],
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


function basicBundle(entries, bundle, folder_out){
  var bundler = getBundler(entries);

  function rebundle() {
    bundler
      .external(pkg.vars.client_dependencies)
      .bundle()
      .on('error', handleErrors)
      .pipe(source(bundle))
      .pipe(gulp.dest(folder_out))
      .pipe(size());
    gutil.log("Rebundle " + bundle + "...");
  }

  rebundle();
  bundler.on('update', rebundle);
}


// main development task
gulp.task('watch', function() {
  basicBundle(pkg.vars.client_entrypoint, 
              pkg.vars.client_bundle, 
              pkg.vars.client_out);
  basicBundle(pkg.vars.server_entrypoint, 
              pkg.vars.server_bundle, 
              pkg.vars.server_out);

  // Bundle vendor apps
  var vendor_bundler = browserify({debug: pkg.vars.develop});
  pkg.vars.client_dependencies.forEach(function(dependency){
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
