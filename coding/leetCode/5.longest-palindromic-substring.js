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
var longestPalindrome = function (s) {
  // 最高票答案
  let ll = 0, rr = 0;
  
};
// @lc code=end

// explain: 思路选取子集，然后在判断是否是回文之前简单判断首末尾是否相同，然后存储起来，之后排序筛选

/*
我的答案：
缺点：耗时有点长
var isPalindrome = function (str) {
    // 判断是否是回文
  let len = str.length;
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[len - i -1]) {
      return false;
    }
  }
  return true;
}
var longestPalindrome = function (s) {
  if (s.length === 1) return s;
  let resArr = [];
  for (let i = 0; i < s.length; i++) {
    for (let j = i+1; j <= s.length; j++) {
      let str = s.slice(i, j);
      if(str[0] == str.slice(-1))
      if (isPalindrome(str)) {
        resArr.push({
          str: str,
          len: str.length
        })
      }
    }
  }
  // 得出结果之后对resArr 进行排序
  resArr.sort((a, b) => b.len - a.len);
  return resArr.length === 0 ? s[0] : resArr[0].str;
};
*/

