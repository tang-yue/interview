/*
 * @lc app=leetcode id=1493 lang=javascript
 *
 * [1493] Longest Subarray of 1's After Deleting One Element
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
    let max = 0;
    let left = 0;
    let right = 0;
    let count0 = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === 0) {
        count0++
      }

      while(count0 > 1) {
        if (nums[left] === 0) {
          count0 --;
        }
        left ++;
      }
      right ++;
      max = Math.max(max, right -left -1);
    }
    return max;
};
// @lc code=end


// 和刚刚的1004很像，自己做下吧， 自己做完并通过

