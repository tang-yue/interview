/*
 * @lc app=leetcode id=1679 lang=javascript
 *
 * [1679] Max Number of K-Sum Pairs
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function(nums, k) {
    let count = 0
    let left = 0
    let right = nums.length - 1
    nums.sort((a, b) => a - b)
    while(left < right) {
      if(nums[left] + nums[right] === k) {
        count++
        left++
        right--
      } else if(nums[left] + nums[right] > k) {
        right--
      } else {
        left++
      }
    }
    return count
};
// @lc code=end

