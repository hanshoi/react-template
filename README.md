# react-template
A easy project template for creating react applications.


## Examples
Plenty of examples have been included into the examples folders to demonstrate different parts of react and building of react and its other parts. This is not a tutorial however so all things have not been explained in a proper fashion, so bear with me.

Number|Name|Description
------|----|-----------
01|[Helloworld](https://github.com/hanshoi/react-template/tree/master/examples/helloworld)|A basic printing of "Hello World!" into html. This illustrates the installing of all necessary items by using npm and browserify.
02|([gulp](https://github.com/hanshoi/react-template/tree/master/examples/gulp)|A basic implementation using react with gulp
03|[browserify](https://github.com/hanshoi/react-template/tree/master/examples/browserify)|Using gulp, browserify and react.
04|[watchify]https://github.com/hanshoi/react-template/tree/master/examples/watchify)|Adding watchify into combination with browserify, gulp and react.


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
