/**
 * 
 * @param {*} num 
 */
function printYangHui(num) {
  const queue = [];
  // 存储第一行数据
  queue.push(1);
  for(let i = 1; i <= num; i++) {
      let rowArr = [];
      // 填充空格(只需要左边填充空格就可以)
      for(let j = 0; j < Math.floor((num - i) / 2); j++) {
          rowArr.push('');
      }
      let prev = 0;
      // queue 保存的是上一行的数据，下一行的数据，都是上一行数据的处理
      for(let j = 0; j < i; j++) {
          const num = queue.shift();
          queue.push(prev + num);
          rowArr.push(num);
          prev = num;
      }
      queue.push(1);
      console.log(rowArr.join(' '));
  }
}

printYangHui(10);