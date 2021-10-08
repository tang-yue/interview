/*
 * @lc app=leetcode id=26 lang=javascript
 *
 * [26] Remove Duplicates from Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      nums.splice(i, 1);
      i = i - 1;
    }
    set.add(nums[i]);
  }
  return nums.length;
};
// @lc code=end

/*
题解：返回单独一个的个数，
简单 过
*/

