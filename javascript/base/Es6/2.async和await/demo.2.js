<<<<<<< HEAD
/**
 * async的执行原理
 * 其实就是自动执行generator函数
 * 暂时不考虑genertor的编译步骤（更复杂）
 */

const getData = () =>
  new Promise(resolve => setTimeout(() => resolve("data"), 1000))

// 这样的一个async函数 应该再1秒后打印data
async function test() {
  const data = await getData()

  console.log(data)
  return data
}

// async函数会被编译成generator函数 (babel会编译成更本质的形态，这里我们直接用generator)
function* testG() {
  // await被编译成了yield
  const data = yield getData()
  console.log('data: ', data);
  const data2 = yield getData()
  console.log('data2: ', data2);
  return data + '123'
}

function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, arguments)

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult
        try {
          generatorResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }

        const { value, done } = generatorResult

        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(
            function onResolve(val) {
              step("next", val)
            },
            function onReject(err) {
              step("throw", err)
            },
          )
        }
      }
      step("next")
    })
  }
}

// const testGAsync = asyncToGenerator(testG)
// testGAsync().then(result => {
//   console.log(result)
// })


 
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  console.log(value); // 1，然后是 2
=======
/**
 * async的执行原理
 * 其实就是自动执行generator函数
 * 暂时不考虑genertor的编译步骤（更复杂）
 */

const getData = () =>
  new Promise(resolve => setTimeout(() => resolve("data"), 1000))

// 这样的一个async函数 应该再1秒后打印data
async function test() {
  const data = await getData()

  console.log(data)
  return data
}

// async函数会被编译成generator函数 (babel会编译成更本质的形态，这里我们直接用generator)
function* testG() {
  // await被编译成了yield
  const data = yield getData()
  console.log('data: ', data);
  const data2 = yield getData()
  console.log('data2: ', data2);
  return data + '123'
}

function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, arguments)

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult
        try {
          generatorResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }

        const { value, done } = generatorResult

        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(
            function onResolve(val) {
              step("next", val)
            },
            function onReject(err) {
              step("throw", err)
            },
          )
        }
      }
      step("next")
    })
  }
}

// const testGAsync = asyncToGenerator(testG)
// testGAsync().then(result => {
//   console.log(result)
// })


 
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  console.log(value); // 1，然后是 2
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
}