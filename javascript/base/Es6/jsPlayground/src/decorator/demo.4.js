"use strict"
// https://jsfiddle.net/IvanFan/dnovs3jm/3/
// let request = require("request");
function promisify(target, key, descriptor) { // 方法的装饰器会传递按个三个参数，第一个就是对应的
    var func = target[key];
    target[key] = function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function (err, ...args) {
                if (!err) {
                    resolve(args);
                } else {
                    reject(arr);
                }
            });
            func.apply(this, args);
        });
    }
    return target[key];
}

function url(url) { 
    return function (Site) {
        Site.prototype.url = url;
        return Site;
    }
}
function request(url, callback) {
    setTimeout(() => {
        console.log('request URL is : '+ url)
        callback();
    })
}
class Site {
    @promisify
    getData(callback) {
        request(this.url, callback);
    }
}

@url("http://www.baidu.com")
class Baidu extends Site { }

var baidu = new Baidu(); 

console.log(baidu.url);

baidu.getData().then(function (data) {
    console.log(data);
});

export default Baidu