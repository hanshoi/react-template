
prequisities:
	echo "setting up development environment with all the prequisities"
	npm install -g browserify watchify
	npm install --save react react-dom babelify babel-preset-react

install:
	echo "installs all that is required by react excample"
	make prequisities
	make build

build:
	echo "building application"
	browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js

watch:
	echo "start watchify watching"
	watchify -t [ babelify --presets [ react ] ] main.js -o bundle.js

run:
	echo "running application"
	xdg-open main.html
