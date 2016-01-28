# Helloworld
A basic printing of "Hello World!" into html. This illustrates the installing of all necessary items by using npm, browserify and babelify.

We are running our commands from commandline accompanied by the simplest of examples to describe what we really want. For all commands you need to go to examples/helloword directory, so lets do that first.
`cd examples/helloworld`

## Install
We need node package manager to do anything with commonjs (Node's JS standard), hence we need to [install it](https://nodejs.org).

We also use browserify to convert commonjs into ordinary js and bundle react into it. Babelify will do converting of JSX format into javascript format. So lets do that now.

```bash
npm install -g browserify  # installing browserify as global (-g) to enable browserify commandline commands
npm install react react-dom babelify babel-preset-react
``` 

## Usage
Building the application from jsx into native browser compatible js.

```bash
browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js
```

## Makefile (alternative)
For the lazies you can use makefile for running all the above. Like this.
```bash
make
```
