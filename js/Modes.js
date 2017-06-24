const modeData = {
        htmlmixed: '.html',
        css: '.css',
        javascript: '.js'
};

class FileType {
    constructor(name, extension, cmMode, compileFunction = null) {
        this.name = name;
        this.extension = extension;
        this.cmMode = cmMode;
        this.compileFunction = compileFunction;
    }
}

const fileTypes = {
    html: new FileType('html', '.html', 'htmlmixed'),
    css: new FileType('css', '.css', 'css'),
    javascript: new FileType('javacript', '.js', 'javascript'),
    scss: new FileType('scss', '.scss', 'text/x-scss')
}

module.exports = {
    modeToExt: (m) => {
        for (var f in fileTypes) {
            if (m == fileTypes[f].cmMode) {
                return fileTypes[f].extension;
            }
        }
        console.log(`mode ${m} doesn't exist`);
        return null;
    },
    extToMode: (e) => {
        for (var f in fileTypes) {
            if (e = fileTypes[f].extension) {
                return mode;
            }
        }
        console.log(`ext ${e} isn't supported`);
        return null;
    },
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
    }
}
