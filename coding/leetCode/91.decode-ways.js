/*
 * @lc app=leetcode id=91 lang=javascript
 *
 * [91] Decode Ways
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 var numDecodings = function(s) {
  // 递归解法
  
};
// @lc code=end

/*
描述：按照规定的编码方式，返回的字母组合方式有多少种。
题解：
暴力回溯法，显示超时
var numDecodings = function(s) {
  let count = 0;
  var dfs = (str, start) => {
    if(str.length === s.length) {
      count++;
      return;
    }
    if(Number(s[start]) !== 0) {
      if(Number(s[start] + s[start+1]) <= 26) {
        dfs(str+s[start] + s[start+1], start+2);
      }
    }
    if(Number(s[start]) !== 0) {
      dfs(str+s[start], start+1);
    }
    if(Number(s[start]) === 0) return; 
  }
  dfs('', 0)
  return count;
};
*/

