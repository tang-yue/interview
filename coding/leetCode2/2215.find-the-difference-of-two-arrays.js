/*
 * @lc app=leetcode id=2215 lang=javascript
 *
 * [2215] Find the Difference of Two Arrays
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function(nums1, nums2) {
 // 最优解法 一 ，居然有现成的api

//  let set1 = new Set(nums1);
//  let set2 = new Set(nums2);
//  return [Array.from(set1.difference(set2)), Array.from(set2.difference(set1))] 

 // 最优解法二
    var findDifference = function(nums1, nums2) {
      // 将两个数组转换为 Set，自动去重
      const set1 = new Set(nums1);
      const set2 = new Set(nums2);
      
      // 找出在 nums1 中但不在 nums2 中的元素
      const diff1 = [];
      for (const num of set1) {
          if (!set2.has(num)) {
              diff1.push(num);
          }
      }
      
      // 找出在 nums2 中但不在 nums1 中的元素
      const diff2 = [];
      for (const num of set2) {
          if (!set1.has(num)) {
              diff2.push(num);
          }
      }
      
      return [diff1, diff2];
    };
// 主要优点    
// 使用 Set 自动去重，不需要手动处理重复元素
// Set 的查找操作是 O(1) 的，比数组的 includes() 方法（O(n)）更高效
// 代码简洁清晰，易于理解
// 这个解法比原来的双重循环解法（时间复杂度 O(n²)）要高效得多。
};

// @lc code=end

// 最优解法一

// 这道题归类在map, set 里面，说明要用着用的思路去写
// 为什么要用map，感觉不用map 也是可以的呀
// 我的写法如下，还是可以，通过，但是存在很多问题，对比最优解法可看出
/*

var findDifference = function(nums1, nums2) {
  let mapLeft = [];
  let mapRight = [];
  let len = nums2.length > nums1.length ? nums2.length : nums1.length;

  while (len >= 0) {
      if (!nums2.includes(nums1[len])) {
          if(nums1[len]) mapLeft.push(nums1[len])
      }
      if (!nums1.includes(nums2[len])) {
          if(nums2[len]) mapRight.push(nums2[len])
      }
      len --
  }
  return [Array.from(new Set(mapLeft)), Array.from(new Set(mapRight))] 
};
*/


