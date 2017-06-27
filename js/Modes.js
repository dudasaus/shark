// FileType class
class FileType {
    constructor(name, extension, cmMode, comment, compileFunction = null) {
        this.name = name;
        this.extension = extension;
        this.cmMode = cmMode;
        this.compileFunction = compileFunction;
        this.comment = comment;
    }
}

// Comment class (start + end)
class Comment {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

const commentHtml = new Comment("<!--", "-->");
const commentJavascript = new Comment("/*", "*/");

// Compilation functions: (tab, callback)

// Collection of supported file types
const fileTypes = {
    html: new FileType('html', '.html', 'htmlmixed', commentHtml),
    css: new FileType('css', '.css', 'css', commentJavascript),
    javascript: new FileType('javacript', '.js', 'javascript', commentJavascript),
    scss: new FileType('scss', '.scss', 'text/x-scss', commentJavascript, CompileFunctions.scss),
    babel: new FileType('babel', '.babel', 'jsx', commentJavascript, CompileFunctions.babel)
}

// FileFilter for dialogs
var webFileFilter = [
    { name: 'front end files', extensions: []}
];
for (let i in fileTypes) {
    webFileFilter[0].extensions.push(fileTypes[i].extension.substr(1));
}


// Exports
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
    findName: (name) => {
        if (fileTypes[name] != null) {
            return fileTypes[name];
        }
        console.log(`filetype ${name} not found`);
        return null;
    },
    webFileFilter: webFileFilter
}
