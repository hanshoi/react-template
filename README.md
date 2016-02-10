# react-template
A easy project template for creating react applications.


## Examples
Plenty of examples have been included into the examples folders to demonstrate different parts of react and building of react and its other parts. This is not a tutorial however so all things have not been explained in a proper fashion, so bear with me.

Number|Name|Description
------|----|-----------
01|[Helloworld](https://github.com/hanshoi/react-template/tree/master/examples/helloworld)|A basic printing of "Hello World!" into html. This illustrates the installing of all necessary items by using npm and browserify.
02|[gulp](https://github.com/hanshoi/react-template/tree/master/examples/gulp)|A basic implementation using react with gulp
03|[browserify](https://github.com/hanshoi/react-template/tree/master/examples/browserify)|A basic implemenation using gulp, browserify and react.
04|[watchify](https://github.com/hanshoi/react-template/tree/master/examples/watchify)|Adding watchify into combination with browserify, gulp and react.
05|[react](https://github.com/hanshoi/react-template/tree/master/examples/react)|A simple friends application that shows reacts basic features.
06|[flask](https://github.com/hanshoi/react-template/tree/master/examples/flask)|Example of using flask with react.
07|[bower-sass](https://github.com/hanshoi/react-template/tree/master/examples/bower-sass)|Example of using bower and SASS with react, also bootstrap added as a novelty.
08|[testing](https://github.com/hanshoi/react-template/tree/master/examples/testing)|Testing react and server side code
09|[ES6](https://github.com/hanshoi/react-template/tree/master/examples/es6)|Using react and ES6 together
10|[flux](https://github.com/hanshoi/react-template/tree/master/examples/flux)|Flux patterned web application using react and alt
11|[isomorphic](https://github.com/hanshoi/react-template/tree/master/examples/isomorphic)|Isomorphic web application using react, alt and express.

## nodeenv (optional)
[nodeenv](https://github.com/ekalinin/nodeenv) is like virtualenv in python and enables you to install certain versions of software in a virtual environment and not
directly into system environment. [nodeenvwrapper](https://github.com/hanshoi/nodeenvwrapper) provides easy to use tools for nodeenv (like virtualenvwrapper in python).

```
pip install nodeenv
git clone git@github.com:hanshoi/nodeenvwrapper.git $HOME/.nodeenvs
echo "export NODEENV_HOME=$HOME/.nodeenvs"  >> $HOME/.bashrc
echo "source $HOME/.nodeenvs/nodeenvwrapper.sh" >> $HOME/.bashrc
```

nodeenv or nodeenvwrapper isn't needed for these examples to work, just a friendly advice.
