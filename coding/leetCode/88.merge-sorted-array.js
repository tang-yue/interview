/*
 * @lc app=leetcode id=88 lang=javascript
 *
 * [88] Merge Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  nums1.length = m;
  nums2.length = n;
  nums1.push(...nums2);
  nums1.sort((a, b) => a - b);
};
// @lc code=end
/*
题解：
nums1的前m个元素参与合并，nums2的前n个元素参与合并，合并之后排序
注意题目的不要返回任何，修改nums1代替
*/

