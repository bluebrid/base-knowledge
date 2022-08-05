<<<<<<< HEAD
/**
 * 字符串大小写转换
 * @param {*} str 
 * @returns 
 */
let transform = (str) => {
  str = str.replace(/([a-z])|([A-Z])/g, ($match, $1, $2) => {
    return $2?.toLowerCase() || $1?.toUpperCase()
  })
  return str
}
let str = 'ADasfads123!@$!@#'
=======
/**
 * 字符串大小写转换
 * @param {*} str 
 * @returns 
 */
let transform = (str) => {
  str = str.replace(/([a-z])|([A-Z])/g, ($match, $1, $2) => {
    return $2?.toLowerCase() || $1?.toUpperCase()
  })
  return str
}
let str = 'ADasfads123!@$!@#'
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(str)