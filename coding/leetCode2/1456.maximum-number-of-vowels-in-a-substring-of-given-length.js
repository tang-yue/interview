/*
 * @lc app=leetcode id=1456 lang=javascript
 *
 * [1456] Maximum Number of Vowels in a Substring of Given Length
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    const vowelsLetters = ['a', 'e', 'i', 'o', 'u'];
    let maxCount = 0;
    let currentCount = 0;
    
    // Count vowels in first window of size k
    for (let i = 0; i < k; i++) {
        if (vowelsLetters.includes(s[i])) {
            currentCount++;
        }
    }
    maxCount = currentCount;
    
    // Slide window and update counts
    for (let i = k; i < s.length; i++) {
        // Remove contribution of character going out of window
        if (vowelsLetters.includes(s[i - k])) {
            currentCount--;
        }
        // Add contribution of character coming into window
        if (vowelsLetters.includes(s[i])) {
            currentCount++;
        }
        maxCount = Math.max(maxCount, currentCount);
    }
    
    return maxCount;
};
// @lc code=end

// 这个和643属于同类，并且用的滑动窗口的逻辑都是一样的。
// 但是还是要靠自己手写一遍的