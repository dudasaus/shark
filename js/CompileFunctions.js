// Compile Functions
const sass = require('node-sass');
const babel = require('babel-core');

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
            var result = babel.transform(tab.content, { presets: ["env"] });
            console.log(babel);
            console.log(process.cwd());
        }
        catch(err) {
            console.log(err);
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

    debugTest(tab, callback) {
        console.log('===== This is the debug compileFunction =====');
        console.log(tab.compileDestination);
        callback(['these', 'are', 'errors']);
    }
}

module.exports = output;
