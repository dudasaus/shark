const CMH = require('./CodeMirrorHandler.js');
const remote = require('electron').remote;
const Tab = require('./js/Tab.js');
const Panel = require('./js/Panel.js');

document.getElementById("close").addEventListener("click", () => {
    var win = remote.getCurrentWindow();
    win.close();
});

// var cm = CMH.CreateEditor(document.getElementById("cm")); */



var panels = [new Panel()];

document.querySelector('.body-wrapper').appendChild(panels[0].node);
