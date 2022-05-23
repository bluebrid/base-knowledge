/**
 * 
 * @param {*} urls 
 * @param {*} limit 
 */
function batchRequest(urls, limit) {
  const fetcher = (url) => {
    // return fetch(url)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`${url}-value`)
      }, 1000)
    })
  }
  const requestsUrl = Array.isArray(urls) ? urls : [urls]
  const runQueues = []
  let index = -1;
  return new Promise((resolve, reject) => {
    const results = new Array(requestsUrl.length)
    const intervalId = setInterval(() => {
      // 这是一个宏任务 ， 宏任务结束后，才会执行promise 里面的微任务
      while (requestsUrl.length && runQueues.length < limit) {
        index++
        ((index) => {
          const request = requestsUrl.shift()
          runQueues.push(request)
          let tempIndex = runQueues.length - 1
          !function (tempIndex) {
            fetcher(request).then((val) => {
              results[index] = val
              runQueues.splice(tempIndex, 1)
              if (!requestsUrl.length) {
                clearInterval(intervalId)
                resolve(results)
              }
            })
          }(tempIndex)

        })(index)
      }
    })
  })
}
const urls = ['a-1', 'a-2', 'a-3', 'a-4', 'b-1', 'b-2', 'b-3'], limit = 2;
batchRequest(urls, limit).then((val) => {
  console.log(val)
})
console.log('=================Done')

