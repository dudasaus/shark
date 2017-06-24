// Shark, Austin Dudas, 6/19/17

// Requires
const electron = require('electron');
const url = require('url');
const path = require('path');
const indexFile = 'index.html';

// Global window object
var win;

function createWindow() {
    // Create window object
    win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        show: false
    });

    // Load the file to the window
    win.loadURL(url.format({
        pathname: path.join(__dirname, indexFile),
        protocol: 'file:',
        slashes: true
    }));

    // Show window when ready
    win.once('ready-to-show', () => {
        win.show();
    });

    // Delete the window when gone
    win.on('close', () => {
        win = null;
    })

}

electron.app.on('ready', createWindow);
