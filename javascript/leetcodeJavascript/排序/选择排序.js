const swap = require("../工具/交换")

// 选择最小得，放到第一位， 然后第二个小得放到第二位。。。
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    swap(arr, i, min)
  }
  return arr
}

selectSort.sortName = "选择排序"

const arrs = [11,2,442,23,4522,2333 ]
console.log(selectSort(arrs))
// module.exports = selectSort
