/**
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，
 * 原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 * 必须在不使用库的sort函数的情况下解决这个问题。
 * @param {*} nums 
 */
//写法2
var sortColors = function (nums) {
  const swap = (list, p1, p2) => [list[p1], list[p2]] = [list[p2], list[p1]]
  let red = 0,
    blue = nums.length - 1,
    p = 0

  while (p <= blue) {
    switch (nums[p]) {
      case 0:
        swap(nums, red++, p)
        p++
        break;
      case 1://遇见1 一直让p++ 这样即使交换过来的是2 也是处于正确的位置
        p++
        break;
      case 2:
        swap(nums, blue--, p)

        break;
      default:
        break;
    }
  }
};
var sortColors1 = function (nums) {
  let p0 = 0 //指向0
  let p1 = 0 //指向0

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {//如果当前i指向的元素等于1，则交换当前元素和p1指向的元素
      let temp = nums[p1]
      nums[p1] = nums[i]
      nums[i] = temp
      p1++
    } else if (nums[i] === 0) {//如果当前i指向的元素等于0，则交换当前元素和p0指向的元素
      let temp = nums[p0]
      nums[p0] = nums[i]
      nums[i] = temp
      //如果p0小于p1 则此时p0指向的元素是1，与i位置元素交换之后 这个交换过去的1位置就不对了 所以交换过去的1需要在和p1交换一下
      if (p0 < p1) {
        temp = nums[i];
        nums[i] = nums[p1];
        nums[p1] = temp;
      }
      //每次交换0之后都要移动p0和p1，如果p0===p1，则前面都是0，如果p0<p1,前面的代码已经交换了两次
      p0++
      p1++
    }
  }
};
const nums = [1, 2, 0, 2, 1, 1, 0, 2]
console.log(sortColors(nums))