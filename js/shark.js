/* var CMH = require('./CodeMirrorHandler.js');
var cm = CMH.CreateEditor(document.getElementById("cm")); */
const remote = require('electron').remote;
document.getElementById("close").addEventListener("click", () => {
    var win = remote.getCurrentWindow();
    win.close();
});
