/*
 * @lc app=leetcode id=8 lang=javascript
 *
 * [8] String to Integer (atoi)
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let str = s.trim();
  let num;
  if (str[0] === '+' || str[0] === '-') {
    // 判断下一个字符是否是数字
    if (str[1] && str[1].trim() && !isNaN(str[1])) {
      // 说明是数字，需要到这个数字的末尾
      match = s.match(/[0-9]+/ig);
      if (match) num = Number(str[0] + match[0]);
    } else {
      return 0;
    }
  } else if (str[0] && str[0].trim() && !isNaN(str[0])) {
    // 是数字
     match = s.match(/[0-9]+/ig);
    if (match) num = Number(match[0]);
  } else {
    return 0;
  }
  if (num >= 2147483648) {
    return 2147483647
  } else if (num < -2147483648) {
    return -2147483648
  } else {
    return num;
  }
};
// @lc code=end

/* explain: 思路如果去掉white space 和 正负号，之后是非数字，才会满足条件
注意：数字之间有空格呢? 负数的话，这个负号要紧贴数字吗？如果负号不是紧贴数字也是可以的
遇到的问题：str[0] 或 str[1] 不存在所以加个判断条件
*/


