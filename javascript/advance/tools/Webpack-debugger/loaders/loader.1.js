const loaderUtils = require("loader-utils");
// D:\private\bluebrid\CodeBeautify\node_modules\loader-runner\lib\LoaderRunner.js
module.exports = function(content) {
    const options = loaderUtils.getOptions(this);
    // console.log('***options loader.1***', options)
    // console.log('***value loader.11***', this.data.value1)
    this.cacheable(false)
    return  `/**
    This a custom comments added by Ivan Fan.
    */` + content;
}
// module.exports.normal = (remaining, preceding, data) => {
//     console.log('***remaining loader.1***', remaining)
//     console.log('***preceding loader.1***', preceding)
//     // data会被挂在到当前loader的上下文this上在loaders之间传递
//     data.value1 = "test"
// }
// module.exports.raw = (remaining, preceding, data) => {
//     console.log('***remaining loader.1***', remaining)
//     console.log('***preceding loader.1***', preceding)
//     // data会被挂在到当前loader的上下文this上在loaders之间传递
//     data.value1 = "test"
// }
module.exports.pitch = (remaining, preceding, data) => {
    // console.log('***remaining loader.1***', remaining)
    // console.log('***preceding loader.1***', preceding)
    // data会被挂在到当前loader的上下文this上在loaders之间传递
    data.value1 = "test"
}
