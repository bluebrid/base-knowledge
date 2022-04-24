function printYangHui(num) {
  const queue = [];
  // 存储第一行数据
  queue.push(1);
  for(let i = 1; i <= num; i++) {
      let rowArr = [];
      // 填充空格
      for(let j = 0; j < Math.floor((num - i) / 2); j++) {
          rowArr.push('');
      }
      let prev = 0;
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