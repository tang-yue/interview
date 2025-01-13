/*
 * @lc app=leetcode id=151 lang=javascript
 *
 * [151] Reverse Words in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    // 按空格分割成数组
    let arr = s.split(' ');
    // 去掉空字符串
    arr = arr.filter(item => item !== '');
    // 反转数组
    arr = arr.reverse();
    // 返回字符串
    return arr.join(' ');
};
// @lc code=end
// 思路，首先去掉字符串两边的空格,
// 刚写完上面的思路，Ai就提示了，js大法优秀。提示给我的按照空格分割，无疑给我很好的提示
