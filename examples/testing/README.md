# Testing
Example of testing React.

We are using mocha test suite for describing tests and karma test runner to execute them.

We are also incorporating livereload to really fast reloading on browser (requires a chrome plugin).

## Install
Install all required stuff for js and python by using make file.
`make install`

Otherwise you can install them one by one like this.
```bash
npm install
```

## Usage
```bash
make build  # build & watch js with gulp
make run   # run python server
```

## References
* [unit test react with expect](https://blog.algolia.com/how-we-unit-test-react-components-using-expect-jsx/)
* [expect](https://www.npmjs.com/package/expect)
* [browserify unit testing](http://nick.perfectedz.com/browserify-unit-testing-p2/)
* [mocha](https://mochajs.org/#getting-started)
* [react test utils](https://facebook.github.io/react/docs/test-utils.html)
* [react integration testing with karma by toptal](http://www.toptal.com/react/how-react-components-make-ui-testing-easy)