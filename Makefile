all: main.js
	./node_modules/.bin/electron .

build:
	./node_modules/.bin/electron-packager .
