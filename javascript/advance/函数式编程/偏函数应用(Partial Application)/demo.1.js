/**
 * Es6 curry function 
 */
function curry(fn) {
    return function curried(...args) {
        return args.length >= fn.length ?
        fn.call(this, ...args) : 
        (...rest) => {
            return curried.call(this, ...args, ...rest);
        }
    }
}