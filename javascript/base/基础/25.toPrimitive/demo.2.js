<<<<<<< HEAD
const add = function () {
  let args = [...arguments]
  let func = function () {
    args.push(...arguments)
    return func
  }
  func.valueOf = () => {
    const result = args.reduce((total, item) => {
      total = total + item
      return total
    }, 0)
    return result;
  }
  return func
}

console.log(add(1) == 1)
console.log(add(1, 2) == 3)
console.log(add(1, 2)(3) == 6)
=======
const add = function () {
  let args = [...arguments]
  let func = function () {
    args.push(...arguments)
    return func
  }
  func.valueOf = () => {
    const result = args.reduce((total, item) => {
      total = total + item
      return total
    }, 0)
    return result;
  }
  return func
}

console.log(add(1) == 1)
console.log(add(1, 2) == 3)
console.log(add(1, 2)(3) == 6)
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(add(1)(2, 3)(3) == 9)