/*
 * @lc app=leetcode id=122 lang=javascript
 *
 * [122] Best Time to Buy and Sell Stock II
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

