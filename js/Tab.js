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
                        // if (this.postSave != null) {
                        //     this.postSave();
                        // }
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
        console.log(this.searchForCompileDest());
        var that = this;
        if (this.fileType.compileFunction != null && this.saved) {
            if (this.compileDestination == null) {
                var foundCompileDest = this.searchForCompileDest();
                if (foundCompileDest != null) {
                    this.compileDestination = foundCompileDest;
                    this.compile();
                    return;
                }
                remote.dialog.showMessageBox({
                    message: "Set this file's compilation destination",
                    buttons: ['Ok']
                });
                remote.dialog.showSaveDialog({
                    defaultPath: remote.app.getPath('home')
                }, (file) => {
                    if (file == null) return;
                    that.compileDestination = file;
                    var newLine = `${that.fileType.comment.start} SharkCompileDestination{${file}} ${that.fileType.comment.end}\n`;
                    that.content = newLine + that.content;
                    // Grabbing active panel in a sketchy global variable way?
                    panels[activePanel].editor.setValue(that.content);
                    that.compile();
                });
            }
            else {
                this.fileType.compileFunction(that, (errors) => {
                    if (errors) {
                        console.log(errors);
                        remote.dialog.showMessageBox({
                            message: errors.toString(),
                            buttons: ['Ok']
                        });
                    }
                });
            }
        }
    }

    // Return string compileDest if found, null otherwise
    searchForCompileDest() {
        var compileDestMarker = 'SharkCompileDestination{';
        var pos = this.content.indexOf(compileDestMarker);
        if (pos != -1) {
            var posEnd = this.content.indexOf('}');
            if (posEnd != -1) {
                return this.content.substring(pos + compileDestMarker.length, posEnd);
            }
        }
        return null;
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
