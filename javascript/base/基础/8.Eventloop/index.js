<<<<<<< HEAD
const f1 = () => {
  return new Promise((resolve, reject) => {
    console.log(1)
    resolve()
  }).then(() => {
    console.log(2)
    throw new Error('error1')
    console.log(3)
  }).catch((e) => {
    // 这个是下一个微任务了
    console.log('Error:', e)
  })
}
const f2 = () => {
  return new Promise((resolve, reject) => {
    console.log(4)
    resolve()
  }).then(() => {
    console.log(5)
  })
}
f1()
f2()
=======
const f1 = () => {
  return new Promise((resolve, reject) => {
    console.log(1)
    resolve()
  }).then(() => {
    console.log(2)
    throw new Error('error1')
    console.log(3)
  }).catch((e) => {
    // 这个是下一个微任务了
    console.log('Error:', e)
  })
}
const f2 = () => {
  return new Promise((resolve, reject) => {
    console.log(4)
    resolve()
  }).then(() => {
    console.log(5)
  })
}
f1()
f2()
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
