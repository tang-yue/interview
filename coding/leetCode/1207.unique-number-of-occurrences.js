/*
 * @lc app=leetcode id=1207 lang=javascript
 *
 * [1207] Unique Number of Occurrences
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
    let totalMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (!totalMap.has(arr[i])) {
            totalMap.set(arr[i], 1)
        } else {
            totalMap.set(arr[i], totalMap.get(arr[i]) + 1)
        }
    }
    let temp = []
    totalMap.forEach((value, key, map) => {
        temp.push(value)
    })
    return temp.length === Array.from(new Set(temp)).length
};

// @lc code=end

// 思路是没有错，但是感觉有点复杂了，尤其遇到了遍历map, 在循环里if 判断然后return false, 
// 发现退不出来。
// 测试
// 233


