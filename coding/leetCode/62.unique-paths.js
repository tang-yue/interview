/*
 * @lc app=leetcode id=62 lang=javascript
 *
 * [62] Unique Paths
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {  
  const memo = [];
  for(let i = 0; i < n; i++) {
    memo.push([]);
  }
  for(let row = 0; row <n; row++) {
    memo[row][0] = 1;
  }
  for(let col = 0; col < m; col++) {
    memo[0][col] = 1;
  }
  for(let row = 1; row < n; row++) {
    for(let col = 1; col < m; col++) {
      memo[row][col] = memo[row-1][col] + memo[row][col-1];
    }
  }
  return memo[n-1][m-1];
};
// @lc code=end

/*
描述：独特的路径问题，从top-left --> bottom-right 共有多少种方式
题解：
动态规划
只能向下以及向右。
当前的值只能等于其上面的路径数加上其左边的路径数。
*/
 
