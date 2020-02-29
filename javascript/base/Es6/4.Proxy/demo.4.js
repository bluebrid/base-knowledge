var pipe = (function () {
    return function (value) {
        var funcStack = [];
        var context =  global || window ;
        var oproxy = new Proxy({}, {
            get: function (target, fnName) {
                console.log(fnName)
                if (fnName === 'get') {// 执行get 的时候则取出所有的操作函数进行遍历执行
                    return funcStack.reduce(function (val, fn) {
                        return fn(val);
                    }, value);// 初始值就是我们调用pipe传递进来的的参数
                }
                funcStack.push(context[fnName]); // 如果不加window, 则funcStack 保存的只是一个字符串， 
                //funcStack.push(fnName);
                return oproxy;
            }
        });

        return oproxy;
    }
}());

var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

console.log(pipe(3).double.pow.reverseInt.get); // 63