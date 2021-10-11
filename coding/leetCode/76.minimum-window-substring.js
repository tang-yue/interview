/*
 * @lc app=leetcode id=76 lang=javascript
 *
 * [76] Minimum Window Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let minLen = Infinity, start;
    let map = {};
    let missingType = 0; // 当前缺失的字符种类数
    for(const char of t) {
        if(!map[char]) {
            map[char] = 1;
            missingType++;
        } else {
            map[char]++;
        }
    }
    let left = 0, right = 0;
    for(; right < s.length; right++) {
        let rightChar = s[right];
        if(map[rightChar] !== undefined) {
            map[rightChar]--
        }
        if(map[rightChar] === 0) {
            missingType--;
        }
        while(missingType === 0) {
            if(right -left + 1 < minLen) {
                minLen = right -left + 1;
                start = left;
            }
            let leftChar = s[left];
            if(map[leftChar] !== undefined) {
                map[leftChar]++;
            }
            if(map[leftChar] > 0) {
                missingType++;
            }
            left++;
        }
    }
    return s.substring(start, start+minLen);
};
// @lc code=end

/*
undone
最小覆盖字串
描述：s里面包含t的最短的子字符串
题解：
思路：
先将字符串t的各个字符个数记录并记录类型个数。
当类型个数为0的时候，看是否能够缩小窗口，即left++操作
*/

