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
var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    while (left < right) {
        maxArea = Math.max(maxArea, Math.min(height[left], height[right]) * (right - left));
        if(height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return maxArea;
};
// @lc code=end

// 对当前这个元素如果能找到最左边比自身高，那么就是这个元素的最高。
// 找到之后就可以向右移动。