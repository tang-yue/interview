/*
 * @lc app=leetcode id=14 lang=javascript
 *
 * [14] Longest Common Prefix
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  // 我的答案
  let res = "";
  strs.sort((a, b) => a.length - b.length);
  let shortStr = strs[0];
  res = strs[0]; // 需要考虑不走内部 if 循环的情况
  for (let i = 1; i <= shortStr.length; i++) {
    for (let j = 0; j < strs.length; j++) {
      if (!strs[j].startsWith(shortStr.slice(0, i))) {
        res = shortStr.slice(0, i - 1);
        return res;
      }
    }
  }
  return res;
};
// @lc code=end

/*
  最长的公共前缀：简单
  挑选最短的字符，然后以此为中心进行遍历，只要有一个不满足则退出
*/

