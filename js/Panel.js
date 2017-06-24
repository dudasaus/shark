class Panel {
    constructor() {
        this.node = document.createElement("div");
        this.node.classList.add("panel");
        this.node.innerHTML = `
            <div class="tabs-container">
                <div class="tabs">
                    <span class="menu-tab" id="menu-btn">&#9776;</span>
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

    newTab(nt = true) {
        var tab = new Tab(this.tabs.length);
        if (nt) tab.setAsNew();
        this.tabs.push(tab);
        this.tabsNode.appendChild(tab.node);
        var tabNum = this.tabs.length - 1;

        this.changeTab(tabNum);

        var that = this;
        tab.node.addEventListener('click', (e) => {
            if (tab.index != that.activeTab && !e.target.classList.contains("tab-close-btn")) {
                that.changeTab(tab.index);
            }
        });
        tab.node.querySelector('.tab-close-btn').addEventListener("click", (e) => {
            that.closeTab(tab.index);
        });

        return tab;
    }

    closeTab(index) {
        // Remove node
        this.tabs[index].node.remove();

        // Decrement stored indices
        for (var i = index + 1; i < this.tabs.length; ++i) {
            --this.tabs[i].index;
        }

        // Removes from tabs array
        this.tabs.splice(index, 1);

        if (this.activeTab >= index) {
            if (this.tabs.length == 0) {
                this.newTab();
            }
            else if (this.activeTab == index) {
                this.changeTab(Math.min(index, this.tabs.length - 1), false);
            }
            else {
                --this.activeTab;
            }
        }

        // Debug
        // for (var i = 0; i < this.tabs.length; ++i) {
        //     console.log(i, this.tabs[i].index);
        // }

    }

    openFile() {
        var that = this;
        remote.dialog.showOpenDialog({
            properties: ['openFile'],
            filters: Modes.webFileFilter,
            defaultPath: remote.app.getPath('home')
        }, (file) => {
            if (file != undefined && file.length != 0) {
                file = file[0];
                var ext = path.extname(file);
                var fileType = Modes.findExtension(ext);
                var mode = fileType.cmMode;
                if (mode != null) {
                    var tab = that.newTab(false);
                    that.makeEditor(mode);
                    fs.readFile(file, 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            that.editor.setValue(data);
                            tab.setName(path.basename(file));
                            tab.mode = mode;
                            tab.filePath = file;
                            tab.saved = true;
                        }
                    });
                }
            }
        });
    }

    setCurrentTabName(name) {
        this.tabs[this.activeTab].setName(name);
    }

    changeTab(destIndex, uc = true) {
        if (uc) {
            this.updateCurrentTabContent();
        }
        this.activeTab = destIndex;
        var destTab = this.tabs[destIndex];
        if (destTab.mode == 'welcome') {
            this.makeWelcomeTab();
        }
        else {
            var tempSaved = destTab.saved;
            this.makeEditor(destTab.mode);
            this.editor.setValue(destTab.content);
            if (tempSaved) {
                destTab.saved = true;
                destTab.node.classList.remove('unsaved');
            }
        }
        try {
            this.tabsNode.querySelector('.active').classList.remove('active');
        }
        catch (err) {
            // Do nothing
        }
        destTab.node.classList.add('active');
    }

    updateCurrentTabContent() {
        try {
            if (this.editor != null && this.activeTab < this.tabs.length) {
                this.tabs[this.activeTab].content = this.editor.getValue();
            }
        }
        catch (err) {
            // console.log("activeTab: ", this.activeTab);
            // console.log("tabs.length: ", this.tabs.length);
            // console.log("tabs[activeTab]: ", this.tabs[this.activeTab]);
            console.error(err);
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
            this.editor.on("change", this.editorChange.bind(this));
            this.applyToEditor(this.editor);
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

    editorChange() {
        if (this.editor != null) {
            this.tabs[this.activeTab].markChange(this.editor.getValue());
        }
    }
}

// const webFileFilter = [
//     { name: 'front end files', extensions: ['html', 'css', 'js']}
// ];

module.exports = Panel;
