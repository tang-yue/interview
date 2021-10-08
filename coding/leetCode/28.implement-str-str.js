/*
 * @lc app=leetcode id=28 lang=javascript
 *
 * [28] Implement strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  if (!needle) return 0;
  return haystack.indexOf(needle);
};
// @lc code=end

/*
题解：
needle 是haystack的一部分，返回第一次出现时的下标
简单
*/

