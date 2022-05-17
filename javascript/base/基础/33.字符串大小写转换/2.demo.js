/**
 * 从字符串中查找是否存在对应的子字符串，如果不存在返回1，存在返回开始位置
 * @param {*} origin 
 * @param {*} target 
 */
let find = (origin, target) => {
  if (target?.length > origin?.length) return -1
  const matchInfo = origin.match(new RegExp(target))
  if (matchInfo) {
    return matchInfo.index
  }
  return -1
}
const origin = 'abcdefg'
const target = 'cdse'
console.log(find(origin, target))