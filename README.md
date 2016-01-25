# react-template
A easy project template for creating react applications.


## nodeenv (optional)
nodeenv is like virtualenv in python and enables you to install certain versions of software in a virtual environment and not
directly into system environment. nodeenvwrapper provides easy to use tools for nodeenv (like virtualenvwrapper in python).

```
pip install nodeenv
git clone git@github.com:hanshoi/nodeenvwrapper.git $HOME/.nodeenvs
echo "export NODEENV_HOME=$HOME/.nodeenvs\nsource $HOME/.nodeenvs/nodeenvwrapper.sh" >> $HOME/.bashrc
```

nodeenv or nodeenvwrapper isn't needed for these examples to work, just a friendly advice.

## Examples
#### Helloworld
A basic printing of "Hello World!" into html. This illustrates the installing of all necessary items by using npm, nodeenv and browserify.

1. go to dir `cd examples/helloworld`
2. install all necessary items `make install`
3. run web page with `make run`