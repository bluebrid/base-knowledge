/**
 * 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。
 * 返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。
 * 可以不考虑输出结果的顺序。
 * @param {*} nums1 
 * @param {*} nums2 
 */
const intersect = (nums1, nums2) => {
  const map = {};
  const res = [];
  if (nums1.length < nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }
  for (const num1 of nums1) {//nums1中各个元素的频次
    if (map[num1]) {
      map[num1]++;
    } else {
      map[num1] = 1;
    }
  }
  for (const num2 of nums2) { //遍历nums2
    const val = map[num2];
    if (val > 0) {            //在nums1中
      res.push(num2);         //加入res数组
      map[num2]--;            //匹配掉一个，就减一个
    }
  }
  return res;
};
const nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4];
console.log(intersect(nums1, nums2))