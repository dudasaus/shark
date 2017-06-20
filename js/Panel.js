const Tab = require('../js/Tab.js');

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

module.exports = Panel;
