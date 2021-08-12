/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  // 先用旧方法实现一遍吧
  let max = 0;
  let l = 0;
  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i]) && map.get(s[i]) >= l) {
      l = map.get(s[i]) + 1;
    }
    max = Math.max(max, i - l + 1);
    map.set(s[i], i);
  }
  return max;
};
// @lc code=end

