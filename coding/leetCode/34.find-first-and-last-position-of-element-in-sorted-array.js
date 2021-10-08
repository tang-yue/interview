/*
 * @lc app=leetcode id=34 lang=javascript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  let idx = -1, left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      idx = mid;
      break;
    }
    if (target > nums[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  if (idx === -1) return [-1, -1];

  let leftIdx = idx;
  while (leftIdx > -1) {
    if (nums[leftIdx - 1] !== target) {
      break;
    } else {
      leftIdx--;
    }
  }

  let rightIdx = idx;
  while (rightIdx < nums.length) {
    if (nums[rightIdx + 1] !== target) {
      break
    } else {
      rightIdx++;
    }
  }
  return [leftIdx, rightIdx]
};
// @lc code=end

/*
题解：
在排序数组中，找到元素的第一个位置和最后一个位置
先找到一个和目标值相等的，然后递减直到最后一个和目标值相等，即得到第一个位置
如果递增直到最后一个和目标值相等，则得到最后一个位置
*/

