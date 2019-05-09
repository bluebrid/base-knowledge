const loaderUtils = require("loader-utils");
module.exports = function(content) {
    const options = loaderUtils.getOptions(this);
    //console.log('***options loader.2***', options)
    //console.log('***value loader.2***', this.data.value2)
    return content;
}
module.exports.pitch = (remaining, preceding, data) => {
    //console.log('***remaining loader.2***', remaining)
    //console.log('***preceding loader.2***', preceding)
    // data会被挂在到当前loader的上下文this上在loaders之间传递
    data.value2 = "test"
}
