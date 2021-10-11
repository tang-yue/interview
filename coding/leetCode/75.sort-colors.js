/*
 * @lc app=leetcode id=75 lang=javascript
 *
 * [75] Sort Colors
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  // 先进行移动0，然后进行移动1，最后进行移动2，交换
  let red = 0;
  let blue = nums.length - 1;
  for(let i = 0; i <= blue; i++) {
    if(nums[i] === 0) {
      let temp = nums[red];
      nums[red] = 0;
      nums[i] = temp;
      red++;
    } else if(nums[i] === 1) {
      continue;
    } else if(nums[i] === 2) {
      let temp = nums[blue];
      nums[blue] = 2;
      nums[i] = temp;
      blue--;
      i--;
    }
  }
};
// @lc code=end

/*
undone
题解：
不用sort排序，进行排序
遇到0添加到数组前面，并将数组前面的元素和当前值进行交换
遇到2就添加数组后面，并将后面的元素和当前值进行交换
遇到1就继续遍历
*/

