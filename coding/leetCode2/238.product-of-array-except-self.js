/*
 * @lc app=leetcode id=238 lang=javascript
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let arr = []
  for(let i = 0; i < nums.length; i++) {
    let res = 1;
    for(let j = 0; j < nums.length; j++) {
      if(i !== j) {
        res *= nums[j]
      }
    }
    arr[i] = res
  }
  return arr
};
// @lc code=end
// 思路：没看明白题目，看了题解，才知道，就是除了自己之外的所有元素的乘积
// 下面的是我的思路，然后我就知道会超时
/* 
var productExceptSelf = function(nums) {
  let arr = []
  for(let i = 0; i < nums.length; i++) {
    let res = 1;
    for(let j = 0; j < nums.length; j++) {
      if(i !== j) {
        res *= nums[j]
      }
    }
    arr[i] = res
  }
  return arr
};
*/
// 可是如果不用除法，我该怎么写沉寂
