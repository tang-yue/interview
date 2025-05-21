/*
 * @lc app=leetcode id=394 lang=javascript
 *
 * [394] Decode String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
  let res = ''
  let multi = 0
  let stack = []
  
  for (let i = 0; i < s.length; i++) {
    let numStr = ''
    if (!isNaN(s[i])) {
      numStr += s[i]
    } else if 90
  }
};
// @lc code=end

// 我大概看明白了题目
// 但是我没有一点思路，尤其是遇到这样的嵌套结构
