<<<<<<< HEAD
// 快速排序，就是将数组分出两部分， 左边全是小于mid, 右边全是大于mid, 中间就是mid
function quickSort(arr) {
  if (arr.length === 1 || arr.length === 0) {
    return arr
  }
  const left = []

  const right = []
  const mid = arr[0] // 第一个作为中间数据

  for (let i = 1; i < arr.length; i++) {
    let num = arr[i]
    if (num < mid) {
      left.push(num) // 小的放到左边
    } else {
      right.push(num) // 大得放到右边
    }
  }

  return [...quickSort(left), mid, ...quickSort(right)]
}

quickSort.sortName = "快速排序（空间版）"
const arr = [11,2,442,23,4522,2333 ]
console.log(quickSort(arr))
// module.exports = quickSort
=======
// 快速排序，就是将数组分出两部分， 左边全是小于mid, 右边全是大于mid, 中间就是mid
function quickSort(arr) {
  if (arr.length === 1 || arr.length === 0) {
    return arr
  }
  const left = []
  const right = []
  const mid = arr[0] // 第一个作为中间数据
  for (let i = 1; i < arr.length; i++) {
    let num = arr[i]
    if (num < mid) {
      left.push(num) // 小的放到左边
    } else {
      right.push(num) // 大得放到右边
    }
  }
  return [...quickSort(left), mid, ...quickSort(right)]
}

quickSort.sortName = "快速排序（空间版）"
const arr = [11,2,442,23,4522,2333 ]
console.log(quickSort(arr))
// module.exports = quickSort
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
