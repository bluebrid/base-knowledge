// 手动实现一个map 方法

Array.prototype.myMap = function(fn) {
    if (!fn) return this;
    if (Object.prototype.toString.call(fn) !== '[object Function]') return this;
    var that = this;
    var newArr = [];
    for(var i = 0; i< that.length; i ++) {
        newArr.push(fn(that[i], i))
    }
    return newArr
}

var arr = [1, 2, 3 ]
console.log(arr.myMap((item, index) => {
    return item + index
}))