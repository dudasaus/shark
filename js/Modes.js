// FileType class
class FileType {
    constructor(name, extension, cmMode, compileFunction = null) {
        this.name = name;
        this.extension = extension;
        this.cmMode = cmMode;
        this.compileFunction = compileFunction;
    }
}

// Collection of supported file types
const fileTypes = {
    html: new FileType('html', '.html', 'htmlmixed'),
    css: new FileType('css', '.css', 'css'),
    javascript: new FileType('javacript', '.js', 'javascript'),
    scss: new FileType('scss', '.scss', 'text/x-scss')
}

// FileFilter for dialogs
var webFileFilter = [
    { name: 'front end files', extensions: []}
];
for (let i in fileTypes) {
    webFileFilter[0].extensions.push(fileTypes[i].name);
}



module.exports = {
    findMode: (mode) => {
        for (var i in fileTypes) {
            if (mode == fileTypes[i].cmMode) {
                return fileTypes[i];
            }
        }
        console.log(`mode ${mode} not found`);
        return null;
    },
    findExtension: (extension) => {
        for (var i in fileTypes) {
            if (extension == fileTypes[i].extension) {
                return fileTypes[i];
            }
        }
        console.log(`extension ${extension} not found`);
        return null;
    },
    webFileFilter: webFileFilter
}
