<<<<<<< HEAD
const Queue = require('./queue')
function ring(arr) {
  const queue = new Queue();
  arr.forEach(v => queue.enqueue(v));
  let index = 0;
  while (queue.size() > 1) {
    const item = queue.dequeue();
    if (++index % 3 !== 0) {
      queue.enqueue(item);
    }
  }
  return queue.head();
}
const arrs = Array(100).map((item,index) => index)
=======
const Queue = require('./queue')
function ring(arr) {
  const queue = new Queue();
  arr.forEach(v => queue.enqueue(v));
  let index = 0;
  while (queue.size() > 1) {
    const item = queue.dequeue();
    if (++index % 3 !== 0) {
      queue.enqueue(item);
    }
  }
  return queue.head();
}
const arrs = Array(100).map((item,index) => index)
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(ring(arrs))