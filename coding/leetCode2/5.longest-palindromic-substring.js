/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var isPalindrome = function(s) {
  let len = s.length;
  for (let i = 0; i < len / 2; i++) {
    if (s[i] !== s[len - i - 1]) {
      return false;
    }
  }
  return true;
}
var longestPalindrome = function(s) {
  if (s.length === 1) return s;
    let result = '';
    let len = s.length;
    // s的所有子串
    for (let i = 0; i < len/2; i++) {
      for (let j = len; j > i; j--) {
        let str = s.slice(i, j);
        if (isPalindrome(str) && str.length > result.length) {
          result = str;
          break;
        }
      }
    }
    return result;
};
// @lc code=end
// 暴力解法：自己写一个回文函数，然后遍历所有的子串，找到最长的回文子串
