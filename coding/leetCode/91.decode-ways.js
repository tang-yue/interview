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
var numDecodings = function (s) {
  // 动态规划解法
   if (s.length === 0 || s[0] === "0") return 0;
   let dp = [];
   dp[0] = 1;
   for (let i = 1; i < s.length + 1; i++) {
     dp[i] = s[i - 1] === '0' ? 0 : dp[i - 1];
     if (i > 1 && s[i - 2] === "1" || s[i - 2] === "2" && s[i - 1] <= 6) {
       dp[i] += dp[i - 2];
     }
   }
  return dp[s.length];
  // 解法二 递归解法
  //  let memo = new Map();
  //  return getWays(0, "1");
   
  //  function getWays(index, prev) {
  //    if (prev[0] === "0" || Number(prev) > 26) return 0;
  //    if (index === s.length) return 1;
     
  //    if (memo.has(index)) return memo.get(index);
  //    let res = getWays(index + 1, s[index]);
  //    if (index !== s.length - 1) res += getWays(index + 2, s[index] + s[index + 1]);
     
  //    memo.set(index, res);
  //    return res;
  //  }
};
// @lc code=end

/*
描述：按照规定的编码方式，返回的字母组合方式有多少种。
题解：
一开始是用暴力回溯法，显示超时
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
动态规划思路 比较容易理解
和 青蛙跳阶是一个思路，当前结果等于去掉 1 个字母以及去掉满足条件的两个字母之和
*/

