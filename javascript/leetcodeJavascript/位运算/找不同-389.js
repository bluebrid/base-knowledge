/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
let findTheDifference = function (s, t) {
  let rest = t.charCodeAt(t.length - 1)
  for (let i = 0; i < s.length; i++) {
    let charS = s[i]
    let charT = t[i]
    rest ^= charS.charCodeAt(0)
    rest ^= charT.charCodeAt(0)
  }
  return String.fromCharCode(rest)
}
let findTheDifference1 = function (s, t) {
  const reg = new RegExp(`[${s.replace(/(?:(\w))/g, ' $1|')}]`, 'g')
  return t.replace(reg, '')
}
var s = "abcd", t = "acdbe"
console.log(findTheDifference1(s, t))
