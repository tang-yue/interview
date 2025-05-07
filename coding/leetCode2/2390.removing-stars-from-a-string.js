/*
 * @lc app=leetcode id=2390 lang=javascript
 *
 * [2390] Removing Stars From a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function(s) {
    // 遍历s
    const stack = []
    for (const char of s) {
        if (char !== '*') {
            stack.push(char)
        } else {
            stack.pop();
        }
    }
    return stack.join('')
};
// @lc code=end

// 自己做出来了，这道题虽然是 mddium 但是掌握栈的思路就不难

