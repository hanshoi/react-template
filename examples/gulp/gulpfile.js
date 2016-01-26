var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
  HTML: 'main.html',
  ALL: ['js/*.js', 'js/**/*.js', 'main.html'],
  JS: ['js/child.js', 'js/parent.js', 'js/*.js', 'js/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/js',
  DEST_BUILD: 'dist/build',
  DEST: 'dist'
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
