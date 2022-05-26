var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
/**
 * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 * @param {*} arr 
 */
const flat = (arr) => {
  const helper = (arr, res) => {
    return arr.reduce((init, item) => {
      if (Array.isArray(item)) {
        return helper(item, init)
      }
      if (!init.includes(item)) {
        init.push(item)
      }

      return init
    }, res)
  }
  const temResult = helper(arr, [])
  return temResult.sort((a, b) => a - b)
}

console.log(flat(arr))