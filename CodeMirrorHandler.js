const CodeMirror = require("codemirror");
const fs = require('fs');
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/jsx/jsx");
require("codemirror/addon/edit/closebrackets.js");
require("codemirror/addon/edit/closetag.js");
require("codemirror/addon/edit/matchbrackets.js");
require("codemirror/addon/edit/matchtags.js");

CodeMirror.keyMap.default["Shift-Tab"] = "indentLess";
CodeMirror.keyMap.default["Tab"] = "indentMore";

// Creates a CodeMirror editor with settings that I like
function CreateEditor(textarea, mode='htmlmixed', fullscreen=false) {

    var editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        mode: mode,
        theme: 'ambiance',
        indentUnit: 4,
        autoCloseBrackets: true,
        autoCloseTags: true,
        matchBrackets: true,
        matchTags: true
    });

    // Dragging number line selection
    // Credit: http://jsbin.com/ihunin/385/edit?html,js,output
    editor.on("gutterClick", function(cm, line, gutter, e) {
        // Optionally look at the gutter passed, and ignore
        // if clicking in it means something else
        var others = e.ctrlKey || e.metaKey ? cm.listSelections() : [];
        var from = line, to = line + 1;
        function update() {
            var ours = {
                anchor: CodeMirror.Pos(from, to > from ? 0 : null),
                head: CodeMirror.Pos(to, 0)
            };
            cm.setSelections(others.concat([ours]), others.length,
                {origin: "*mouse"});
        }
        update();

        var move = function(e) {
            var curLine = cm.lineAtHeight(e.clientY, "client");
            if (curLine != to) {
                to = curLine;
                update();
            }
        };
        var up = function(e) {
            removeEventListener("mouseup", up);
            removeEventListener("mousemove", move)
        };
        addEventListener("mousemove", move);
        addEventListener("mouseup", up);
    });

    if (fullscreen) {
        editor.setSize(window.innerWidth,window.innerHeight);
        // editor.setValue(fs.readFileSync('./index.html', {encoding: 'utf8'}))
    }

    return editor;

}

module.exports = {
    CreateEditor
}
