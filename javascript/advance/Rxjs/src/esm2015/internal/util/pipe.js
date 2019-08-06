import { noop } from './noop';
export function pipe(...fns) {
    return pipeFromArray(fns);
}
export function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        // return fns.reduce((prev, fn) => fn(prev), input);
        /**
         * obj 是一个Observable对象。主要有两个属性： 
         * {
         *  operator: ScanOperator,
         *  source: Observable
         * }
         * 通过source 将pipe 所有的operator 关联起来。
         */
        var obj = fns.reduce(function(prev, fn) {
            return fn(prev)
        }, input);
        return obj;
    };
}
//# sourceMappingURL=pipe.js.map