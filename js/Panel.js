class Panel {
    constructor() {
        this.node = document.createElement("div");
        this.node.classList.add("panel");
        this.node.innerHTML = `
            <div class="tabs-container">
                <div class="tabs">
                    <span class="menu-tab" id="menu-btn">M</span>
                    <span class="new-tab">+</span>
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
        this.editor = null;
        this.newTab();
        this.welcomeButtons();
        this.tabsNode.querySelector('.new-tab').addEventListener('click', () => {
            this.tabsNode.querySelector('.active').classList.remove('active');
            this.newTab();
        });
    }

    currentTab() {
        return this.tabs[this.activeTab];
    }

    newTab() {
        var tab = new Tab();
        tab.setAsNew();
        this.tabs.push(tab);
        this.tabsNode.appendChild(tab.node);
        var tabNum = this.tabs.length - 1;

        this.changeTab(tabNum);

        var that = this;
        tab.node.addEventListener('click', () => {
            if (tabNum != that.activeTab) {
                that.changeTab(tabNum);
            }
        });

        return tab;
    }

    openFile() {
        var that = this;
        remote.dialog.showOpenDialog({}, (file) => {
            if (file.length != 0) {
                file = file[0];
                var ext = path.extname(file);
                var mode = Modes.extToMode(ext);
                if (mode != null) {
                    var tab = that.newTab();
                    that.makeEditor(mode);
                    fs.readFile(file, 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            that.editor.setValue(data);
                            tab.setName(path.basename(file));
                            tab.mode = mode;
                        }
                    });
                }
            }
        });
    }

    setCurrentTabName(name) {
        this.tabs[this.activeTab].setName(name);
    }

    changeTab(destIndex) {
        this.updateCurrentTabContent();
        this.activeTab = destIndex;
        var destTab = this.tabs[destIndex];
        if (destTab.mode == 'welcome') {
            this.makeWelcomeTab();
        }
        else {
            this.makeEditor(destTab.mode);
            this.editor.setValue(destTab.content);
        }
        this.tabsNode.querySelector('.active').classList.remove('active');
        destTab.node.classList.add('active');
    }

    updateCurrentTabContent() {
        if (this.editor != null) {
            this.tabs[this.activeTab].content = this.editor.getValue();
        }
    }

    welcomeButtons() {
        var that = this;
        this.node.querySelector('#new-html').addEventListener('click', () => {
            that.makeEditor('htmlmixed');
            that.setCurrentTabName('untitled.html');
            that.tabs[this.activeTab].mode = 'htmlmixed';
        });
        this.node.querySelector('#new-css').addEventListener('click', () => {
            that.makeEditor('css');
            that.setCurrentTabName('untitled.css');
            that.tabs[this.activeTab].mode = 'css';
        });
        this.node.querySelector('#new-js').addEventListener('click', () => {
            that.makeEditor('javascript');
            that.setCurrentTabName('untitled.js');
            that.tabs[this.activeTab].mode = 'javascript';
        });
    }

    makeEditor(mode) {
        if (this.editor == null) {
            var freshPanel = document.createElement("div");
            var ta = document.createElement("textarea");
            freshPanel.classList.add("panel-content");
            freshPanel.appendChild(ta);
            this.editor = CMH.CreateEditor(ta, mode);
            this.node.replaceChild(freshPanel, this.node.querySelector('.panel-content'));
            this.editor.setSize(freshPanel.clientWidth, freshPanel.clientHeight);
            this.editor.refresh();
            this.editor.focus();
        }
        else {
            // this.editor.setValue('');
            this.editor.setOption("mode", mode);
        }
    }

    makeWelcomeTab() {
        if (this.node.querySelector('welcome-panel') == null) {
            var freshPanel = document.createElement("div");
            freshPanel.classList.add("panel-content", "welcome-panel");
            freshPanel.innerHTML = `
                    <h1>Welcome to Shark</h1>
                    <p>
                        A text editor built for web developers. <br/>
                        Click below to make a new file.
                    </p>
                    <div class="buttons">
                        <button id="new-html" class="btn">HTML</button>
                        <button id="new-css" class="btn">CSS</button>
                        <button id="new-js" class="btn">JS</button>
                    </div>`;
            this.node.replaceChild(freshPanel, this.node.querySelector('.panel-content'));
            this.editor = null;
            this.welcomeButtons();
        }
    }
}

module.exports = Panel;
