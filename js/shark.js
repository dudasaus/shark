const CMH = require('./CodeMirrorHandler.js');
const remote = require('electron').remote;
const Tab = require('./js/Tab.js');
const Panel = require('./js/Panel.js');
const path = require('path');
const Modes = require('./js/Modes.js');
const Mousetrap = require("mousetrap");
const fs = require('fs');


// Build the starting panel
var panels = [];
var activePanel = 0;
newPanel();

function newPanel() {
    var panel = new Panel();
    panel.applyToEditor = editorKeyboardShortcuts;
    panels.push(panel);
}

document.querySelector('.body-wrapper').appendChild(panels[0].node);


// Close button
document.getElementById("close").addEventListener("click", () => {
    var win = remote.getCurrentWindow();
    win.close();
});

// Open/close menu
var overlay = document.querySelector('.overlay');
function openMenu() {
    overlay.classList.remove('hidden');
    setTimeout( () => {
        overlay.classList.remove('hiding');
    }, 1);
}
function closeMenu() {
    overlay.classList.add('hiding');
    setTimeout( () => {
        overlay.classList.add('hidden');
    }, 200);
}
document.querySelector('.menu-tab').addEventListener("click", openMenu);
document.getElementById("menu-close").addEventListener("click", closeMenu);

var keyboardShortcuts = {};
function editorKeyboardShortcuts(e) {
    e.setOption("extraKeys", keyboardShortcuts);
}


// New
function newButton() {
    panels[activePanel].newTab();
}
document.getElementById("menu-btn-new").addEventListener("click", () => {
    newButton();
    closeMenu();
});
Mousetrap.bind(['ctrl+n','command+n'], newButton);
keyboardShortcuts['Ctrl-N'] = newButton;
keyboardShortcuts['Cmd-N'] = newButton;


// Save
function saveButton() {
    panels[activePanel].updateCurrentTabContent();
    panels[activePanel].currentTab().save();
}
document.getElementById("menu-btn-save").addEventListener("click", () => {
    saveButton();
    closeMenu();
});
Mousetrap.bind(['ctrl+s','command+s'], saveButton);
keyboardShortcuts['Ctrl-S'] = saveButton;
keyboardShortcuts['Cmd-S'] = saveButton;


// Open
function openButton() {
    panels[activePanel].openFile();
}
document.getElementById("menu-btn-open").addEventListener("click", () => {
    openButton();
    closeMenu();
});
Mousetrap.bind(['ctrl+o','command+o'], openButton);
keyboardShortcuts['Ctrl-O'] = openButton
keyboardShortcuts['Cmd-O'] = openButton
