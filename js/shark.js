const CMH = require('./CodeMirrorHandler.js');
const remote = require('electron').remote;

document.getElementById("close").addEventListener("click", () => {
    var win = remote.getCurrentWindow();
    win.close();
});

// var cm = CMH.CreateEditor(document.getElementById("cm")); */

class Panel {
    constructor() {
        this.node = document.createElement("div");
        this.node.classList.add("panel");
        this.node.innerHTML = `
            <div class="tabs-container">
                <div class="tabs">
                </div>
            </div>

            <div class="welcome-panel panel-content">
                <h1>Welcome to Shark</h1>
                <p>
                    A text editor built for web developers. <br/>
                    Click below to make a new file.
                </p>
                <div class="buttons">
                    <button id="new-html" class="btn">HTML</button>
                    <button id="new-css" class="btn">CSS</button>
                    <button id="new-js" class="btn">JS</button>
                </div>
            </div>`;

        this.tabs = [];
        this.activeTab = 0;
        this.tabsNode = this.node.querySelector('.tabs');

        this.newTab();
    }

    newTab () {
        this.tabs.push(new Tab());
        this.tabsNode.appendChild(this.tabs[this.tabs.length - 1].node);
    }

}

class Tab {
    constructor() {
        this.node = document.createElement("span");
        this.node.classList.add("tab", "unsaved", "active");
        this.mode = "welcome";
        this.name = "New tab";
        this.content = "";
        this.saved = false;
        this.setName("New tab");
    }

    setName(name) {
        this.name = name;
        this.node.innerHTML = name;
    }
}

var panels = [new Panel()];

document.querySelector('.body-wrapper').appendChild(panels[0].node);
