// Compile Functions
const sass = require('node-sass');

var output = {
    scss(tab, callback) {
        sass.render({
            file: tab.filePath
        }, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                fs.writeFile(tab.compileDestination, result.css, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        })
    },
    babel(tab, callback) {

    },
    debugTest(tab, callback) {
        console.log('===== This is the debug compileFunction =====');
        console.log(tab.compileDestination);
        callback(['these', 'are', 'errors']);
    }
}

module.exports = output;
