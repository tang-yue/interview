/*
 * @lc app=leetcode id=11 lang=javascript
 *
 * [11] Container With Most Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // 类似于二分查找法
  let l = 0, r = height.length - 1, max = 0;
  while (l <= r) {
    if (height[l] < height[r]) {
      max = Math.max(max, (r - l) * height[l]);
      l++;
    } else {
      max = Math.max(max, (r - l) * height[r]);
      r--;
    }
  }
  return max;
};
// @lc code=end
/*
题解：求最大区域，尝试了回溯暴力解法，但是超时了，下面这个超时了
 var maxArea = function (height) {
    var max = 0;
    const backtrack = (i) => {
      if (i === height.length - 1) return;
      for (let j = i + 1; j < height.length; j++) {
        let minHeight = Math.min(height[j], height[i]);
        max = Math.max(max, (j - i) * minHeight)
        backtrack(j);
      }
    }
    backtrack(0);
    return max;
  };
  // 时间复杂度为O平方
  let t1 = performance.now();
  maxArea([76, 155, 15, 188, 180, 154, 84, 34, 1871, 128, 50, 58, 51, 196, 42, 109, 194, 191, 120, 30, 180, 40,130, 50, 80,78, 150, 200, 300, 400]);
  let t2 = performance.now();
  console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds`) // 5.6....seconds
// 用双指针 时间复杂度 0.00000n.....seconds
*/

