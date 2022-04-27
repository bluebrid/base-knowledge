//状态压缩
// 思路:由于在每个位置只能向下或者向右， 所以每个坐标的路径和等于上一行相同位置和上一列相同位置不同路径的总和，
// 状态转移方程：f[i][j] = f[i - 1][j] + f[i][j - 1];
var uniquePaths = function (m, n) {
    let cur = new Array(n).fill(1);
    for (let i = 1; i < m; i++) { // 横轴
        for (let r = 1; r < n; r++) { // 纵轴
            cur[r] = cur[r - 1] + cur[r];
        }
    }
    return cur[n - 1];
  };
  console.log(uniquePaths(1, 1))
  console.log(uniquePaths(2, 2))
  console.log(uniquePaths(3, 3))
  console.log(uniquePaths(5, 6))
  // 1