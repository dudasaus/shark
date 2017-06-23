all: main.js
	./node_modules/.bin/electron .

linux:
	electron-packager .
