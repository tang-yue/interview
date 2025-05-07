/*
 * @lc app=leetcode id=1657 lang=javascript
 *
 * [1657] Determine if Two Strings Are Close
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function(word1, word2) {
  if (word1.length !== word2.length) return false;
  const len = word1.length;
  const word1Obj = {};
  const word2Obj = {};
  let i = 0;
  while (i < len) {
      word1Obj[word1[i]] = ( word1Obj[word1[i]] || 0) + 1
      word2Obj[word2[i]] = ( word2Obj[word2[i]] || 0) + 1
      i++
  }
  if (Object.keys(word1Obj).length !== Object.keys(word2Obj).length) return false;
  const keys1 = Object.keys(word1Obj).sort().join('');
  const keys2 = Object.keys(word2Obj).sort().join('');
  if (keys1 !== keys2) return false;
  const values1 = Object.values(word1Obj).sort((a, b) => a - b).join('');
  const values2 = Object.values(word2Obj).sort((a, b) => a - b).join('');
  if (values1 !== values2) return false;
  return true;
};
// @lc code=end

