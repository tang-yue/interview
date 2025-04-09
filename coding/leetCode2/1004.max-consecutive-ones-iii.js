/*
 * @lc app=leetcode id=1004 lang=javascript
 *
 * [1004] Max Consecutive Ones III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(nums, k) {
   // 标准答案
   let left = 0;
   let right = 0;
   let count0 = 0;
   let max = 0;   

   while (right < nums.length) {
    if (nums[right] === 0) {
      count0++;
    }
    while (count0 > k) { // 如果count0 大于k，则left 向右移动
      if (nums[left] === 0) { // 如果left 是0，则count0 减1
        count0--; // 如果left 是0，则count0 减1
      }
      left++;
    }
    max = Math.max(max, right - left + 1);
    right++;
    
   }
   return max;
};
// @lc code=end
// 找到有两个0，其余都是1，的最长连续序列

// 完全没有思路啊，感觉有点难度，虽然知道用滑动窗口
/* 我的答案是错误的，如下： 
var longestOnes = function(nums, k) {
    let max = 0;
    let left = 0;
    let right = 0;
   
    for (let i = 0; i < nums.length; i++) {
      
      let count0 = 0;
      // 判读left 到right 之间有几个0
      for (let j = left; j < right; j++) {
        if (nums[j] === 0) {
          count0++;
        }
      }

      if (count0 > k) {
        if (nums[left] === 0) {
          count0--;
        }
        left++
      }
      right++
      
      max = Math.max(max, right -left);
    }
  return max;
};

错误的点：
1、count0 的值每次都在计算，使用双循环，复杂度太高
2、我自己知道如果count0 一直大于k的话，我却不知道用方法将其降下来，这部分逻辑没有实现
*/
