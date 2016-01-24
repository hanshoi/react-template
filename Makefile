nodeenv:
	echo "setup nodeenv for this project"
	sudo pip install nodeenv
	nodeenv --prebuilt .rtenv
	. .rtenv/bin/activate

prequisities:
	echo "setting up development environment with all the prequisities"
	npm install -g browserify
	npm install --save react react-dom babelify babel-preset-react

build:
	echo "building application"
	browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js

test:
	echo "running tests"

install:
	echo "run some installing stuff... ??"

run:
	echo "running application"
