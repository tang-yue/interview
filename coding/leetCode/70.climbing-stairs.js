/*
 * @lc app=leetcode id=70 lang=javascript
 *
 * [70] Climbing Stairs
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  let dp = [];
  dp[0] = 1; dp[1] = 2;
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i-2] + dp[i-1]
  }
  return dp[n-1]
};
// @lc code=end

/*
题解：
简单动态规划
*/

