/*
 * @lc app=leetcode id=33 lang=javascript
 *
 * [33] Search in Rotated Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] > target) {
      if (nums[l] <= nums[mid] && target < nums[l]) l = mid + 1; // l 增大值会变小
      else r = mid - 1;
    } else {   
      if (nums[r] > nums[mid] && target > nums[r]) r = mid - 1;  // r 减小值会变大
      else l = mid + 1;
    }
  }
  return -1;
};
// @lc code=end

/*
题解：找下标就好了，并不需要自己去旋转
二分查找
[4,5,6,7,0,1,2]

target = 7,
nums[mid] = 2;
比0大且比5 小
小于7且大于1
*/

