/*
 * @lc app=leetcode id=118 lang=javascript
 *
 * [118] Pascal's Triangle
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    // numRows 代表的是层数
  let dp = [];
  if (numRows === 1) return [[1]]
  if(numRows === 2) return [[1], [1,1]]
  dp[0] = [1]; dp[1] = [1, 1];
  for (let i = 2; i < numRows; i++) {
    dp[i] = [];
    dp[i].push(1);
    for (let j = 0; j < dp[i - 1].length - 1; j++) {
      dp[i].push(dp[i - 1][j] + dp[i - 1][j + 1]);
    }
    dp[i].push(1);
  }
  return dp;
};
// @lc code=end

/*
描述：每个值是上一层最近的两个数的和
题解：简单
类似于斐波那契数列，动态规划
*/

