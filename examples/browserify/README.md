# Browserify
A basic implementation using gulp, browserify, babelify and react.

Browserify gives us the possibility to change commonjs into browser compatible js code.
It also handles requirements in our files and concatenates them into a single file automatically.

We are using babelify to change JSX to JS code.

## Install
`npm install`

## Usage
```bash
gulp copy  # copies .html into dist build-folder
gulp build  # creates a build.js file into dist/js folder from all our .js files
```