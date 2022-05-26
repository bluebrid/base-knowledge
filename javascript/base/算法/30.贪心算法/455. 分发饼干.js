/**
 * 
 * @param {*} g 是一个小孩的数组， 长度为小孩的数量，每个数组的值，为对应小孩的胃口：
 *  [1, 2,3], 表示有三个小孩， 第一个小孩，只要吃尺寸1的饼干就满足， 3，表示第三个小孩要尺寸3的饼干才能满足
 * @param {*} s 是一个饼干的数组，长度，表示总共有几个饼干，每个数组对应的值，为饼干的尺寸
 * @returns 至少有几个小孩能满足
 */
// 思路，将小孩和饼干都先从升序进行排序
// 将饼干最大的先驱满足胃口最大的小孩
var findContentChildren = function (g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b); //排序数组
    let result = 0;
    let index = s.length - 1; // 饼干的最大的
    for (let i = g.length - 1; i >= 0; i--) {
        //从胃口大的小孩开始满足
        if (index >= 0 && s[index] >= g[i]) { // 饼干大于当前小孩的胃口，则是满足条件的
            result++; //结果加1
            index--; // 饼干减1
        }
    }
    return result;
};

 
console.log(findContentChildren([1, 2, 3], [1, 1]))

console.log(findContentChildren([1, 2], [1, 2, 3]))