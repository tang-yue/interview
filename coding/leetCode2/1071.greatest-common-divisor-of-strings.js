/*
 * @lc app=leetcode id=1071 lang=javascript
 *
 * [1071] Greatest Common Divisor of Strings
 */

// @lc code=start
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
  let q = str1.length;
  let p = str2.length;
  let maxLen = 0;
  if (str1 % 2 === 1 || str2 % 2 === 1) {
    if (str1[0].repeat(q) === str1 && str2[0].repeat(p) === str2) {
      return str1 === str2 ? str1 : str1[0];
    }
  }
  // 如果是偶数
  for(let i = 0; i < Math.min(q, p); i++) {
    if(str1.slice(0, i + 1).repeat(q / (i + 1)) === str1 && str2.slice(0, i + 1).repeat(p / (i + 1)) === str2) {
      maxLen = i + 1;
    }
  }
  if (maxLen === 0) {
    return '';
  }
  return str1.slice(0, maxLen) === str2.slice(0, maxLen) ? str1.slice(0, maxLen) : '';
};
// @lc code=end
// 自己做的
// 思路：首先分为偶数和奇数
// 如果是奇数，那么只有两种情况，一种是两个字符串相等，另一种是两个字符串的第一个字符相等
// 如果是偶数，那么我们可以遍历，找到最大的长度，然后判断是否是最大的公约数
// js的reapeat方法起到了很大的作用。


