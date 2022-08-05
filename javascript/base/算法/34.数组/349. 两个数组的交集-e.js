/**
 * 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。
 * 输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。
 * @param {*} nums1 
 * @param {*} nums2 
 */
var intersection = function (nums1, nums2) {
  let set1 = new Set(nums1);
  let set2 = new Set(nums2);//数组转成set
  if (set1.size > set2.size) {//用size小的数组遍历
    [set1, set2] = [set2, set1]
  }
  const intersection = new Set();
  for (const num of set1) {//遍历set1
    if (set2.has(num)) {//元素如果不存在于set2中就加入intersection
      intersection.add(num);
    }
  }
  return [...intersection];//转成数组
}
const nums1 = [1, 2, 2, 1], nums2 = [2, 2];
console.log(intersection(nums1, nums2))