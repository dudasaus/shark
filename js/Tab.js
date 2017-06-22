class Tab {
    constructor(index=-1) {
        // Node
        this.node = document.createElement("span");
        this.node.classList.add("tab");
        var tabText = document.createElement("span");
        tabText.classList.add("tab-text");
        this.node.appendChild(tabText);
        var tabClose = document.createElement("span");
        tabClose.innerText = 'X';
        tabClose.classList.add("tab-close-btn");
        this.node.appendChild(tabClose);
        tabClose.addEventListener("click", (e) => {
            e.preventDefault();
        });

        // Properties
        this.mode = "welcome";
        this.name = "New tab";
        this.content = "";
        this.filePath = null;
        this.saved = false;
        this.setName("New tab");
        this.index = index;
    }

    setAsNew() {
        this.node.classList.add("unsaved", "active");
    }

    setName(name) {
        this.name = name;
        this.node.querySelector('.tab-text').innerText = name;
    }

    save() {
        var that = this;
        if (this.mode != 'welcome') {
            if (this.filePath == null) {
                remote.dialog.showSaveDialog({}, (file) => {
                    if (file != undefined) {
                        that.filePath = file;
                        that.setName(path.basename(file));
                        that.save();
                    }
                });
            }
            else {
                fs.writeFile(this.filePath, this.content, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        that.saved = true;
                        that.node.classList.remove('unsaved');
                    }
                });
            }
        }
    }
}

module.exports = Tab;
