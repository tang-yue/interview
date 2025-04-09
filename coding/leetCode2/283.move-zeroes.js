/*
 * @lc app=leetcode id=283 lang=javascript
 *
 * [283] Move Zeroes
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let nonZeroIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (i !== nonZeroIndex) {
        nums[nonZeroIndex] = nums[i];
        nums[i] = 0;
      }
      nonZeroIndex++;
    }
  }
  return nums;
};
// @lc code=end

// 超时解法：
// 1. 遍历数组，如果当前元素为0，则删除该元素，并在数组末尾添加0
// 2. 遍历结束后，返回数组
// 这样的解法有问题会导致超时，因为splice会操作，时间复杂度为O(n)，再加上for循环就是O(n^2)，会导致超时。

// 解法2-双指针解法
