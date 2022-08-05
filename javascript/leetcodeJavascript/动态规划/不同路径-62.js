<<<<<<< HEAD
//状态压缩
var uniquePaths = function (m, n) {
  let cur = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
      for (let r = 1; r < n; r++) {
          cur[r] = cur[r - 1] + cur[r];
      }
  }
  return cur[n - 1];
};

=======
//状态压缩
var uniquePaths = function (m, n) {
  let cur = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
      for (let r = 1; r < n; r++) {
          cur[r] = cur[r - 1] + cur[r];
      }
  }
  return cur[n - 1];
};

>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(uniquePaths(5, 6))