all: main.js
	./node_modules/.bin/electron .

linux:
	./node_modules/.bin/electron-packager .
