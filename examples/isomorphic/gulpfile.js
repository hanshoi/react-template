var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require("gulp-babel");
var babelify = require("babelify");
var notify = require('gulp-notify');
var size = require('gulp-size');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
var pkg = require('./package.json');


// create a watcher for .js files by wrapping browserify
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
    notifier: function(options, callback){ callback(); }
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


gulp.task('clean', function() {
  return gulp.src([pkg.vars.js_out+'/*'], {read: false}).pipe(clean());
});


gulp.task('javascript', function() {
  return gulp.src(pkg.vars.js_files)
    .pipe(babel())
    .pipe(gulp.dest(pkg.vars.js_out));
});


function basicBundle(entries, bundleName, watch){
  var bundler = getBundler();

  function rebundle() {
    bundler
      .external(pkg.vars.client_dependencies)
      .bundle()
      .on('error', handleErrors)
      .pipe(source(bundleName))
      .pipe(gulp.dest(pkg.vars.js_out))
      .pipe(size());
    gutil.log("Rebundle app...");
  }

  rebundle();
  bundler.on('update', rebundle);
}


// main development task
gulp.task('watch', ["clean", "javascript"], function() {

  // client
  basicBundle(pkg.vars.client_entrypoint, 
              pkg.vars.client_bundle);

  // Bundle vendor apps
  var vendor_bundler = browserify({debug: pkg.vars.develop});
  pkg.vars.client_dependencies.forEach(function(dependency){
    vendor_bundler.require(dependency);
  });

  vendor_bundler.bundle()
    .on('error', handleErrors)
    .pipe(source(pkg.vars.vendor_bundle))
    .pipe(gulp.dest(pkg.vars.js_out))
    .pipe(size());

  // JS
  gulp.watch(pkg.vars.js_files, ['javascript']);

  // nodemon
  nodemon({
    script: pkg.vars.server_entrypoint,
    watch: pkg.vars.js_out
  });
});


// default task
gulp.task('default', ['watch']);
