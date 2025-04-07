/*
 * @lc app=leetcode id=724 lang=javascript
 *
 * [724] Find Pivot Index
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
    let left = 0;
    let sum = nums.reduce((sum, a) => sum + a, 0)
    for (let i = 0; i < nums.length; i++) {
      if (left === sum -left - nums[i]) {
        return i
      }
      left = left + nums[i]
    }
    return -1
};
// @lc code=end

// 简单，不过遇到了一个问题，我是用reduce 计算总体的和，不知道有没有简单的方法

