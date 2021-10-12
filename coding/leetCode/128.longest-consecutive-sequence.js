/*
 * @lc app=leetcode id=128 lang=javascript
 *
 * [128] Longest Consecutive Sequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

var longestConsecutive = function (nums) {
  let maxLen = 0;
  let count = 1;
  nums = Array.from(new Set(nums));
  if (nums.length === 1) return 1;
  nums.sort((a, b) => a - b); // 先进行排序
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1] - 1) {
      count++;
    } else {
      count = 1;
    }
    maxLen = Math.max(maxLen, count);
  }
  return maxLen;
};
// @lc code=end

/*
题解：
自己想下思路吧
先进行排序，然后刷新最大值，如果遇到不连续的，则重新设置为0
*/

