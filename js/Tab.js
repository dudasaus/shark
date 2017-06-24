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

        // Properties
        // this.mode = "welcome";
        this.fileType = null;
        this.name = "New tab";
        this.content = "";
        this.filePath = null;
        this.saved = false;
        this.setName("New tab");
        this.index = index;
        this.compileFunction = null;
        this.compileDestination = null;
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
        if (this.fileType != null) {
            if (this.filePath == null) {
                remote.dialog.showSaveDialog({
                    defaultPath: remote.app.getPath('home')
                }, (file) => {
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
                        if (this.postSave != null) {
                            this.postSave();
                        }
                    }
                });
            }
        }
    }

    saveAs() {
        var that = this;
        if (this.fileType != null) {
            remote.dialog.showSaveDialog({
                defaultPath: remote.app.getPath('home')
            }, (file) => {
                if (file != undefined) {
                    that.filePath = file;
                    that.setName(path.basename(file));
                    that.save();
                }
            });
        }
    }

    compile() {
        var that = this;
        if (this.compileFunction != null && this.saved) {
            if (this.compileDestination == null) {
                remote.dialog.showMessageBox({
                    message: "Set this files compilation destination"
                });
                remote.dialog.showSaveDialog({
                    defaultPath: remote.app.getPath('home')
                }, (file) => {
                    that.compileDestination = file;
                    that.compileFunction(that.compileDestination, (errors) => {
                        console.log(errors);
                        console.log(that.compileDestination);
                    })

                });
            }
            else {
                this.compileFunction(this.compileDestination, (errors) => {
                    console.log(errors);
                    console.log(that.compileDestination);
                })
            }
        }
    }

    markChange(content = null) {
        if (this.saved) {
            this.saved = false;
            this.node.classList.add("unsaved");
        }
        if (content != null) {
            this.content = content;
        }
    }
}

module.exports = Tab;
