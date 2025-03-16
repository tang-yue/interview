/*
 * @lc app=leetcode id=443 lang=javascript
 *
 * [443] String Compression
 */

// @lc code=start
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
  let newChars = [];
    for(let i = 0; i < chars.length; i++) {
      let count = 1;
      while(i + 1 < chars.length && chars[i] === chars[i + 1]) {
        count++;
        i++;
      }
      newChars.push(chars[i]);
      if(count > 1) {
        newChars.push(...count.toString());
      }
    }
    for(let i = 0; i < newChars.length; i++) {
      chars[i] = newChars[i];
    }
    return newChars.length;
};
// @lc code=end

// AI 总是自己帮自己写。
// 这题相对比较简单，思路是遍历字符数组，统计连续相同字符的数量，然后将字符和数量拼接到新数组中，最后将新数组的内容复制回原数组并返回新数组的长度。

