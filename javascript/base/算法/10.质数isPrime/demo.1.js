'use strict';
/**
 * 判断一个数是否是质数
 * @return {[type]} [description]
 */
Number.prototype.isPrime = Number.prototype.isPrime || function() {
    if (!this instanceof Number) {
        console.log('please input a number')
        return;
    }
    let count = 0;
    if (this == 0) {
        return true;
    } else if (this > 0) {
        for (let i = 1; i <= this; i++) {
            if (this % i == 0) {
                count++
            }
        }
        return count <= 2 ? true : false;
    } else {
        for (let i = -1; i >= this; i--) {
            if (this % i == 0) {
                count++
            }
        }
        return count <= 2 ? true : false;
    }
}
console.log(Number(4).isPrime())
