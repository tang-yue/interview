/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  // 摘抄一遍 别人的答案
  if (digits.length === 0) return [];
  const res = [];
  const map = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz"
  }
  function dfs(str, deep) {
    if (str.length === digits.length) {
      res.push(str);
      return;
    }
    let curr = map[digits[deep]];
    for (let i = 0; i < curr.length; i++) {
      dfs(str+curr[i], deep + 1)
    }
  }
  dfs("", 0);
  return res;
};
// @lc code=end

/*
题解：
这个和组合有点类似的，组合后长度和原来的字符串长度有关。
但是最后还是以全排列的思路
*/

