<<<<<<< HEAD
// 数列：0、1、1、2、3、5、8、13、21、34

function fiboSequence(num) {
  if (num < 2) return num;
  const queue = [];
  queue.push(0);
  queue.push(1);
  for(let i = 2; i < num; i++) {
      const len = queue.length;
      queue.push(queue[len - 2] + queue[len  - 1]);

  }
  return queue;
}
=======
// 数列：0、1、1、2、3、5、8、13、21、34

function fiboSequence(num) {
  if (num < 2) return num;
  const queue = [];
  queue.push(0);
  queue.push(1);
  for(let i = 2; i < num; i++) {
      const len = queue.length;
      queue.push(queue[len - 2] + queue[len  - 1]);

  }
  return queue;
}
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(fiboSequence(8))