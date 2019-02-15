 

/**
 * 面试问题：发一个随机红包，100块钱给10个人。每个人最多12块钱，最少6块钱。怎么分？
 * https://segmentfault.com/q/1010000006002081?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly
 */
/**
 * [random description]
 * @param  {[type]} min [description]
 * @param  {[type]} max [description]
 * @return {[type]}     [description]
 */
function random(min, max) {
    var temp = Math.floor(Math.random() * max);
    return temp < min ? min : temp;
}
/**
 * 思路：
 * 1，先给每个人一个最小的红包
 * 2，随机生成一个数组下标，
 * 3，判断该红包是否已经超限制了
 * 4，如果没有超过限制，随机生成一个相应范围的红包
 * @param  {[type]} amount [description]
 * @param  {[type]} count  [description]
 * @param  {[type]} min    [description]
 * @param  {[type]} max    [description]
 * @return {[type]}        [description]
 */
function randomRedPackages(amount, count, min, max) {
    var redPackages = new Array(count).fill(min);
    var remainAmount = amount - min * count;
    var useAmount = 0;
    while (remainAmount > 0) {
        var index = random(0, 9);
        if (redPackages[index] < max) {
            var temp = max - redPackages[index];
            var add = random(1, temp);
            if (remainAmount - add >=0) {
                redPackages[index] = redPackages[index] + add;
                remainAmount = remainAmount - add;
            }

        }
    }

    return redPackages;
}

var redPackages = randomRedPackages(100, 10, 6, 12);
var sum = redPackages.reduce((a, b) => {
    return a + b;
})
var test=redPackages.every((e) =>{
    return e>=6&&e<=12;
})
console.log(redPackages)
console.log(sum)
console.log(test)
