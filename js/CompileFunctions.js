// Compile Functions
const sass = require('node-sass');
const babel = require('babel-core');
const pug = require('pug');

var output = {
    // SCSS
    scss(tab, callback) {
        sass.render({
            file: tab.filePath
        }, (error, result) => {
            if (error) {
                console.log(error);
                callback(error);
                return;
            }
            else {
                fs.writeFile(tab.compileDestination, result.css, (err) => {
                    if (err) {
                        console.log(err);
                        callback(error);
                        return;
                    }
                    callback();
                });
            }
        })
    },

    // Babel
    babel(tab, callback) {
        try {
            // Have to use specified path for build
            var presetPath = path.join(remote.app.getAppPath(), 'node_modules', 'babel-preset-env');
            var result = babel.transform(tab.content, { presets: [ presetPath ] });
        }
        catch(err) {
            callback(err);
            return;
        }
        fs.writeFile(tab.compileDestination, result.code, (err) => {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            else {
                callback();
            }
        });
    },

    // pug
    pug(tab, callback) {
        var output;
        try {
            output = pug.render(tab.content);
        }
        catch (err) {
            callback(err);
            return;
        }
        fs.writeFile(tab.compileDestination, output, (err) => {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            else {
                callback();
            }
        });
    },

    debugTest(tab, callback) {
        console.log('===== This is the debug compileFunction =====');
        console.log(tab.compileDestination);
        callback(['these', 'are', 'errors']);
    }
}

module.exports = output;
