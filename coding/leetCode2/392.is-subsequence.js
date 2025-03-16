/*
 * @lc app=leetcode id=392 lang=javascript
 *
 * [392] Is Subsequence
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let sIndex = 0;
    let tIndex = 0;
    while (sIndex < s.length && tIndex < t.length) {
        if (s[sIndex] === t[tIndex]) {
            sIndex++;
        }
        tIndex++;
    }
    return sIndex === s.length;
};
// @lc code=end

// 有这方面的思路，但是我没想到定义两个变量index，然后遍历t，如果s[sIndex] === t[tIndex]，则sIndex++，然后tIndex++。
// 最后判断sIndex是否等于s.length，如果等于则返回true，否则返回false。 比较重要
