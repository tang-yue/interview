/*
 * @lc app=leetcode id=1732 lang=javascript
 *
 * [1732] Find the Highest Altitude
 */

// @lc code=start
/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function(gain) {
    let sum = 0;
    let max = 0;
    for (let i = 0; i < gain.length; i++) {
      sum = sum + gain[i]
      max = Math.max(max, sum);
    }
    return max;
};
// @lc code=end

// 看了下题目介绍：
// 将gain(i) 原来的值赋值为，gain(0) 到 gain(i) 之和
// 自己做的，用js写比较简单
