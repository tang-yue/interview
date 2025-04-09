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
    let sum = 0
    for(let i = 0; i < k; i++) {
        sum += nums[i]
    }
    maxAverage = Math.max(maxAverage, sum / k)
    for(let i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k]
        maxAverage = Math.max(maxAverage, sum / k)
    }
    return maxAverage
};
// @lc code=end
// 的确人家这道题的分类就是在滑动滑动窗口里头
// 滑动窗口解法，时间复杂度为O(n) 真是太妙了赞赞！！
// 除了如下的解法，我并没有想到其他的方法
/*
// 暴力解法 但是超时了，时间复杂度为O(n^2)
var findMaxAverage = function(nums, k) {
    let maxAverage = -Infinity
    if(nums.length <= k) return nums.reduce((a, b) => a + b, 0) / nums.length;
    for(let i = 0; i < nums.length - k + 1; i++) {
      let sum = 0
      for(let j = 0; j < k; j++) {
        sum += nums[i + j]
      }
      maxAverage = Math.max(maxAverage, sum / k)
    }
    return maxAverage
};
*/


