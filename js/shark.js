const CMH = require('./CodeMirrorHandler.js');
const remote = require('electron').remote;
const Tab = require('./js/Tab.js');
const Panel = require('./js/Panel.js');

// Build the starting panel
var panels = [new Panel()];
var activePanel = 0;

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

// New
function newButton() {
    panels[activePanel].newTab();
}
document.getElementById("menu-btn-new").addEventListener("click", () => {
    newButton();
    closeMenu();
});

// Save
function saveButton() {
    panels[activePanel].currentTab().save();
}
document.getElementById("menu-btn-save").addEventListener("click", () => {
    saveButton();
    closeMenu();
});
