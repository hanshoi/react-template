prequisities:
	echo "setting up development environment with all the prequisities"
	npm install -g browserify
	npm install --save react react-dom babelify babel-preset-react

build:
	echo "building application"
	browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js

install:
	echo "installs all that is required by react excample"
	make prequisities
	make build

run:
	echo "running application"
	xdg-open helloworld.html  # works only in Debian based linux environments, infidels can correct themselves..

.PHONY=[install, run]  # set the default action for make
