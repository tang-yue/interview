/*
 * @lc app=leetcode id=55 lang=javascript
 *
 * [55] Jump Game
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  // 贪心解法一
  // if (nums.length === 0) { return false; };
  // let maxDepth = nums[0];
  // for (let i = 0; i <= maxDepth && i < nums.length; i++) {
  //   // 当前元素的可抵达距离超过maxDepth，进行更新
  //   if (nums[i] + i > maxDepth) {
  //     maxDepth = nums[i] + i;
  //   }
  // }
  // return maxDepth >= nums.length - 1;
  // 贪心解法 二
  let farthest = 0;
  if (nums.length === 1) {
    return true;
  }
  for (let i = 0; i < nums.length - 1 && i <= farthest; i++) {
    farthest = Math.max(farthest, i + nums[i])
    if (farthest >= nums.length - 1) { // 这步还是提前判断比较好的
      return true;
    }
  }
  return false;
};
// @lc code=end

/*
题解：是否可以跳到最后
没有思路
贪心解法：核心思想：如果能达到跳到的最远位置，那么左侧的所有位置都是可以达到的
*/

