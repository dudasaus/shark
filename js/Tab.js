const fs = require('fs');
const path = require('path');

const modeToFile = {
        htmlmixed: 'html',
        css: 'css',
        javascript: 'js'
};

class Tab {
    constructor() {
        this.node = document.createElement("span");
        this.node.classList.add("tab", "unsaved", "active");
        this.mode = "welcome";
        this.name = "New tab";
        this.content = "";
        this.filePath = null;
        this.saved = false;
        this.setName("New tab");
    }

    setName(name) {
        this.name = name;
        this.node.innerHTML = name;
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