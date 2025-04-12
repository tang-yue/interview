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
    const freq = {};
    for (const num of arr) {
        freq[num] = (freq[num] || 0) + 1;
    }
    return Object.values(freq).length === new Set(Object.values(freq)).size;
};

// 优化后的答案 还是AI给出的解法优秀
// 1、使用普通对象替代 Map，更简单直观
// 2、使用 for...of 循环替代传统的 for 循环，代码更简洁
// 3、使用 Set 的 size 属性直接比较，不需要额外的数组转换
// 4、代码行数从 15 行减少到 5 行，更易读
// 5、这个解法的时间复杂度是 O(n)，空间复杂度也是 O(n)，是最优的解法

// @lc code=end

// 思路是没有错，但是感觉有点复杂了，尤其遇到了遍历map, 在循环里if 判断然后return false, 
// 发现退不出来。

// 我的答案
// 1、使用了 Map 和数组，数据结构较多
// 2、需要两次遍历（一次统计频率，一次检查唯一性）
// 3、代码不够简洁直观
/*
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
*/


