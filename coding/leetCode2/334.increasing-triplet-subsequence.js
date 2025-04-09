/*
 * @lc app=leetcode id=334 lang=javascript
 *
 * [334] Increasing Triplet Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
  // 思路:
  // 1. 维护两个变量 first 和 second,分别记录当前最小值和第二小的值
  // 2. 遍历数组,如果当前值比 first 小,更新 first
  // 3. 如果当前值比 first 大但比 second 小,更新 second
  // 4. 如果当前值比 second 大,说明找到了递增的三元子序列,返回 true
  // 5. 遍历结束还没找到,返回 false
  
  let first = Infinity;
  let second = Infinity;
  
  for(let num of nums) {
    if(num <= first) {
      first = num;
    } else if(num <= second) {
      second = num; 
    } else {
      return true;
    }
  }
  
  return false;
};
// @lc code=end

// 又是没有思路的一道题
