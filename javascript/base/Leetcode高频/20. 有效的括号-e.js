/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const map = new Map([//用栈存储括号对
    [')', '('],
    [']', '['],
    ['}', '{']
  ]);
  const queue = []
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      if (queue[queue.length - 1] !== map.get(s[i])) {
        return false
      } else {
        queue.pop()
      }
    } else {
      queue.push(s[i])
    }
  }
  return queue.length === 0
};
const s = "{[]}"
console.log(isValid(s))