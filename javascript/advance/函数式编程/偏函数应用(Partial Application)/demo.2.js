function apply(fn, ...args) {  
    return (...rest) => {
        return fn(...args, ...rest);
    };
}