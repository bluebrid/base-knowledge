const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];


function allSettled(promises) {
  if (promises.length === 0) return Promise.resolve([])

  const _promises = promises.map(
    item => item instanceof Promise ? item : Promise.resolve(item)
  )

  return new Promise((resolve, reject) => {
    const result = []
    let unSettledPromiseCount = _promises.length

    _promises.forEach((promise, index) => {
      promise.then((value) => {
        result[index] = {
          status: 'fulfilled',
          value
        }

        unSettledPromiseCount -= 1
        // resolve after all are settled
        if (unSettledPromiseCount === 0) {
          resolve(result)
        }
      }, (reason) => {
        result[index] = {
          status: 'rejected',
          reason
        }

        unSettledPromiseCount -= 1
        // resolve after all are settled
        if (unSettledPromiseCount === 0) {
          resolve(result)
        }
      })
    })
  })
}


async function allsettled() {
  const result = await Promise.allSettled(promises)
  console.log(result)
}
// Promise.allSettled(promises).
//   then((results) => results.forEach((result) => console.log(result.status)));

// try {
//  const res=  Promise.all(promises)
//  console.log(res)
//   // then((results) => results.forEach((result) => console.log(result.status)));
// } catch(e) {
//   console.log(e)
// }

const func = async () => {
  var mixedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];
  var p = await Promise.all(mixedPromisesArray).catch((e) => {
    console.log(e)
  });
  console.log(p);
  setTimeout(function () {
    console.log('the stack is now empty');
    console.log(p);
  });
}
allsettled();
// func()