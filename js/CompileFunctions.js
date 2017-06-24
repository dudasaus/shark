// Compile Functions

var output = {
    scss(tab, callback) {

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
