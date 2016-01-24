nodeenv:
	echo "setup nodeenv for this project"
	sudo pip install nodeenv
	nodeenv --prebuilt .rtenv
	. .rtenv/bin/activate

prequisities:
	echo "setting up development environment with all the prequisities"
	npm install -g browserify
	npm install --save react react-dom babelify babel-preset-react

install:
	echo "installs all that is required by react excample"
	make nodeenv
	make prequisities
	make build

build:
	echo "building application"
	browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js

run:
	echo "running application"
	xdg-open helloworld.html
