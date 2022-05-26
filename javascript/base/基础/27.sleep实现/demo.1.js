// 实现一个sleep(2)函数

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
}

async function sleep1(delay) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, delay)
  })
}

async function test() {
  console.log("111");
  await sleep1(2000);
  console.log("222");
}

test();
