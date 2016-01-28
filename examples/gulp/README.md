# [Gulp](https://github.com/gulpjs/gulp)
A basic implementation using react with gulp.

Gulp is a JS based task manager that can easy up application development and building 
when used correctly. When developing with react we consider it to be a essential tool
for making react programs. 

Lets get started:
`cd examples/gulp`

## Install
This time around we are using package.json to install all our code. package.json is a packaging configration file used by npm. There we can detail information about the package we have created and requirements for it. We are using it for sake of the requirements. To install it works like this.
```bash
npm install  # need to be ran from examples/gulp directory
```

In addition you need to have gulp installed as global (-g) so that commandline commands worl.
`npm install -g gulp`

## Usage
We are using gulp to handle several tasks we have described into our gulpfile.js.
These tasks can be ran with 'gulp' command from command line in our examples/gulp folder.

```bash
# Development tasks
gulp copy  # move .html file into 'dist' build-folder
gulp transform  # transforms JSX into JS code using gulp-react
gulp watch  # start watching all files for changes and run above tasks if changed
gulp  # default task, same as gulp watch in this case

# Production tasks
gulp build  # builds a minified JS file into dist/build folder from JSX using gulp-uglify and gulp-concat
gulp replaceHTML  # replaces everyrthing within html comment build:js for reference for build.min.js
gulp production  # run both tasks above
```

## References
* [gulp](https://github.com/gulpjs/gulp)