<<<<<<< HEAD
/**
 * 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。
 * 返回 需要移除区间的最小数量，使剩余区间互不重叠 。
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  if (!intervals.length) {
    return 0;
  }
  //按右边界排序，然后从左往右遍历，右边界结束的越早，留给后面的区间的空间就越大，不重合的区间个数就越多
  intervals.sort((a, b) => a[1] - b[1]);

  const n = intervals.length;
  let right = intervals[0][1]; //right初始化为第一个区间的右边界
  let ans = 1; //最多的不重合区间的个数
  for (let i = 1; i < n; ++i) {
    //循环区间数组
    if (intervals[i][0] >= right) {
      //当区间的左边界大于上一个区间的右边界的时候 说明是一对不重合区间
      ++ans; //ans加1
      right = intervals[i][1]; //更新right
    }
  }
  return n - ans; //intervals的长度减去最多的不重复的区间 就是最少删除区间的个数
};
const intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
=======
/**
 * 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。
 * 返回 需要移除区间的最小数量，使剩余区间互不重叠 。
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  if (!intervals.length) {
    return 0;
  }
  //按右边界排序，然后从左往右遍历，右边界结束的越早，留给后面的区间的空间就越大，不重合的区间个数就越多
  intervals.sort((a, b) => a[1] - b[1]);

  const n = intervals.length;
  let right = intervals[0][1]; //right初始化为第一个区间的右边界
  let ans = 1; //最多的不重合区间的个数
  for (let i = 1; i < n; ++i) {
    //循环区间数组
    if (intervals[i][0] >= right) {
      //当区间的左边界大于上一个区间的右边界的时候 说明是一对不重合区间
      ++ans; //ans加1
      right = intervals[i][1]; //更新right
    }
  }
  return n - ans; //intervals的长度减去最多的不重复的区间 就是最少删除区间的个数
};
const intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(eraseOverlapIntervals(intervals))