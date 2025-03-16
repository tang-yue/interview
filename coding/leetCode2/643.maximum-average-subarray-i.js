/*
 * @lc app=leetcode id=643 lang=javascript
 *
 * [643] Maximum Average Subarray I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    let maxAverage = -Infinity
    if(nums.length <= k) return nums.reduce((a, b) => a + b, 0) / nums.length;
    for(let i = 0; i < nums.length - k + 1; i++) {
      maxAverage = Math.max(maxAverage, (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3]) / k)
    }
    return maxAverage
};
// @lc code=end

