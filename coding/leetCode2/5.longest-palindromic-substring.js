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
const longestPalindrome = function(s) {
  // 双指针，如果是偶数的话，一定是全部都对称的。
  let start = 0
  let maxLen = 0
  const findPalindrome = (s, left, right) => {
    while(left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > maxLen) {
        maxLen = right - left + 1
        start = left
      }
      left--
      right++
    }
  }
  for(let i = 0; i < s.length; i++) {
    findPalindrome(s, i, i)
    findPalindrome(s, i, i+1)
  }
  return s.substring(start, start + maxLen)
}

// @lc code=end
// 暴力解法：自己写一个回文函数，然后遍历所有的子串，找到最长的回文子串
// 动态规划：dp[i][j]表示s[i]到s[j]是否是回文串，i在左，j在右，如果是，dp[i][j] = true
// dp[i][j] = dp[i+1][j-1] && s[i] === s[j] 两个条件都满足才是回文串

/*
const longestPalindrome = function(s) {
  // 动态规划
  let dp = new Array(s.length).fill(0).map(() => new Array(s.length).fill(false));
  let left = 0;
  let maxLen = 0;
  for (let i = s.length-1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      if ((j -i<=1) && s[i] === s[j]) {
        dp[i][j] = true
      } else if (dp[i+1][j-1] && s[i] === s[j]) {
        dp[i][j] = true
      }
      if (dp[i][j] && (j - i + 1 > maxLen)) {
        maxLen = j - i + 1
        left = i
      }
    }
  }
  return s.substring(left, left + maxLen)
}
*/

