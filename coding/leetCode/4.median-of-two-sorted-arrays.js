/*
 * @lc app=leetcode id=4 lang=javascript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // 有重合的地方
  let nums3 = nums1.concat(nums2);
  nums3.sort((a, b) => a - b);
  let len = nums3.length;
  let mid = Math.floor(len/2);
  if(len % 2 === 1) { // 奇数
      return nums3[mid]
  } else {
      return (nums3[mid] + nums3[mid-1])/2
  }
};
// @lc code=end

