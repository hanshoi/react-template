# Testing
Example of testing React.

We are using mocha test suite for describing and running tests.

We are also incorporating livereload to really fast reloading on browser (requires a chrome plugin).

## Usage
```bash
mocha --debug --compilers js:babel-register --recursive app/test/*
or
npm test
or
gulp test
```

## References
* [unit test react with expect](https://blog.algolia.com/how-we-unit-test-react-components-using-expect-jsx/)
* [expect](https://www.npmjs.com/package/expect)
* [browserify unit testing](http://nick.perfectedz.com/browserify-unit-testing-p2/)
* [mocha](https://mochajs.org/#getting-started)
* [react test utils](https://facebook.github.io/react/docs/test-utils.html)
* [react integration testing with karma by toptal](http://www.toptal.com/react/how-react-components-make-ui-testing-easy)