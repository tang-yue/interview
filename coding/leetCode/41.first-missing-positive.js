/*
 * @lc app=leetcode id=41 lang=javascript
 *
 * [41] First Missing Positive
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  nums = nums.filter(x => x > 0);
  nums = Array.from(new Set(nums));
  nums.sort((a, b) => a - b);
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] != i+1) return i+1;
  }
  return len + 1;
};
// @lc code=end

/*
题解：
只取正数和去重后，看是否是 从1 排序到数组的长度，即i 位置上的值是否是 i+1，不是则缺失
*/

