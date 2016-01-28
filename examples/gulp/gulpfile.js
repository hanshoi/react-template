var gulp = require('gulp');  // gulp, a task handler
var concat = require('gulp-concat');  // js file joiner library
var uglify = require('gulp-uglify');  // js minifyer library
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');  // library for replacing html content in files from gulp

var path = {
  HTML: 'main.html',  // path to .html file
  ALL: ['js/*.js', 'js/**/*.js', 'main.html'],  // path to all files to be watched
  JS: ['js/child.js', 'js/parent.js', 'js/*.js', 'js/**/*.js'],  // all JS files to be watched. NOTE: order does matter.
  MINIFIED_OUT: 'build.min.js',  // name of minified .js file
  DEST_SRC: 'dist/js',  // destination folder for built .js files
  DEST_BUILD: 'dist/build',  // destination folder for production built (minified) .js files
  DEST: 'dist'  // our build folder
};


// Transform JSX to JS code
gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

// copy main.html to a new destination folder
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// watch all our files and if they change run copy and transform tasks
gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform', 'copy']);
});


// BUILD

// create a concatenated and minified JS file build.min.js
gulp.task('build', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(concat(path.MINIFIED_OUT))
    .pipe(uglify())
    .pipe(gulp.dest(path.DEST_BUILD));
});

// replace all references within <-- build:js --> tags to single reference of build.min.js
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

// production task to group all steps
gulp.task('production', ['replaceHTML', 'build']);

// default tasks
gulp.task('default', ['watch']);
