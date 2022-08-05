//状态压缩
var uniquePathsWithObstacles = function (obstacleGrid) {
  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;
  let dp = Array(n).fill(0); //用0填充，因为现在有障碍物，当前dp数组元素的值还和obstacleGrid[i][j]有关
  dp[0] = 1; //第一列 暂时用1填充
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (obstacleGrid[i][j] == 1) {
              //注意条件，遇到障碍物dp[j]就变成0，这里包含了第一列的情况
              dp[j] = 0;
          } else if (j > 0) {
              //只有当j>0 不是第一列了才能取到j - 1
              dp[j] += dp[j - 1];
          }
      }
  }
  return dp[n - 1];
};
