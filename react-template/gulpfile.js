var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
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
var _ = require('underscore');
var pkg = require('./package.json');



var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};


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
    notifier: function(options, callback){
      // disables popup
      callback();
    }
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


// sass compiling
gulp.task('styles', function() {
  gulp.src(pkg.vars.scss_files)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(pkg.vars.css_folder))
    .pipe(size());
});


// main development task
gulp.task('watch', function() {
  gulp.watch(pkg.vars.scss_files, ['styles'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

  var app_bundler = getBundler();

  function rebundle() {
    app_bundler
      .external(_.keys(pkg.dependencies))
      .bundle()
      .on('error', handleErrors)
      .pipe(source(pkg.vars.app_bundle))
      .pipe(gulp.dest(pkg.vars.build_folder))
      .pipe(size())
      .pipe(livereload());
    gutil.log("Rebundle...");
  }

  rebundle();
  app_bundler.on('update', rebundle);

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


gulp.task('test', function () {
  return gulp.src([pkg.vars.test_files], {read: false})
    .pipe(mocha({
      debug: true,
      compilers: "js:babel-register",
      r: pkg.vars.setup_tests,
      R: 'nyan'
    }));
});


gulp.task('tdd', ['test'], function() {
  gulp.watch(pkg.vars.test_files, ['test']);
  gulp.watch(pkg.vars.build_folder + "/" + pkg.vars.app_bundle, ['test']);
});



// replace HTML
/*
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'scripts/js/' + pkg.vars.app_bundle_min
    }))
    .pipe(gulp.dest(path.HTML_FOLDER));
});
*/

// build for production task
gulp.task('build', function(){
  // sass
  gulp.src(pkg.vars.scss_files)
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(pkg.vars.css_files))
    .pipe(size());

  // js
  getBrowserify().bundle()
    .pipe(source(pkg.vars.app_bundle_min))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(pkg.vars.build_folder))
    .pipe(size());

  gutil.log("Production bundle created");
});

// production task
gulp.task('production', ['test', 'build']);

// default task
gulp.task('default', ['styles', 'watch']);
