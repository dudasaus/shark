const modeData = {
        htmlmixed: '.html',
        css: '.css',
        javascript: '.js'
};

module.exports = {
    modeToExt: (m) => {
        for (var mode in modeData) {
            if (m == mode) {
                return modeData[mode];
            }
        }
        console.log(`mode ${m} doesn't exist`);
        return null;
    },
    extToMode: (e) => {
        for (var mode in modeData) {
            if (modeData[mode] == e) {
                return mode;
            }
        }
        console.log(`ext ${e} isn't supported`);
        return null;
    }
}
