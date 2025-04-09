/*
 * @lc app=leetcode id=1768 lang=javascript
 *
 * [1768] Merge Strings Alternately
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
  let arr = [];
  let q = word1.length;
  let p = word2.length;
  let i = 0;
  for (; i < Math.min(q, p); i++) {
    arr.push(word1[i]);
    arr.push(word2[i]);
  }
  if (q > p) {
    arr.push(...word1.slice(i));
  } else {
    arr.push(...word2.slice(i));
  }
  return arr.join('');
};
// @lc code=end

// 参考了AI的提示，思路是先找到两个字符串的最小长度，然后遍历，每次取一个字符，最后将剩下的字符拼接到数组后面

