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
  let arr = []
  let len = nums1.length + nums2.length;
  for(let i = 0; i < len; i++) {
    if (nums1.length === 0) {
      arr.push(...nums2);
      break;
    }
    if (nums2.length === 0) {
      arr.push(...nums1);
      break;
    }
    if (nums1[0] <= nums2[0]) {
      arr.push(nums1[0]);
      nums1.shift();
    } else {
      arr.push(nums2[0]);
      nums2.shift();
    }
  }
  if (len % 2 === 0) {
    return (arr[len / 2] + arr[len / 2 - 1]) / 2
  }
  return arr[Math.floor(len / 2)]
};
// @lc code=end
// 自己做，copilot在写的过程中给了一部分提示
// 思路：数组Arr的总长度是确定的，那就是在看nums1和nums2里面哪个数更小，取完以后，我们并不能用
// 索引 i 去取值，所以，我们只能将这个值从nums1或者nums2里面删除，这样每次就可以都取第一个值了。
// 注意： 需要考虑边界值，nums1 或者 nums2为空的情况。
