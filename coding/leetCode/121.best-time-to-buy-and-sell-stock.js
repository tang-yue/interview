/*
 * @lc app=leetcode id=121 lang=javascript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  // prices 数组
  let sum = 0;
  for (let i = 1; i < prices.length; i++) {
    
    sum = sum + Math.max(0, prices[i] - prices[i-1])
  }
  return sum;
};
// @lc code=end

/*
描述：股票买卖的最佳时机
题解：贪心算法
自己分析下吧
*/

