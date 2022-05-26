function composeFunctions(...fns) {
    return (...args) => {
        return fns.reduce((init, nextFn, index) => {
            init = nextFn.call(undefined, ...args);
            args = [init];
            return index < fns.length - 1 ? fns[index].bind(undefined, args) : init
        }, 0)
    }
} 

var add = x => x + 1; 
var multiply = (x, y) => x * y; 
var multiplyAdd = composeFunctions(multiply, add); 
console.log(multiplyAdd(3, 4)) // 返回 13