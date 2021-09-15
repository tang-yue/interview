/*
 * @lc app=leetcode id=7 lang=javascript
 *
 * [7] Reverse Integer
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    // 反转整数
  let res;
  if (x < 0) {
    res = Number('-' + (x + '').slice(1).split('').reverse().join(''));
  } else {
    res = Number((x + '').slice(0).split('').reverse().join(''))
  }
  if (res > 2147483648 || res < -2147483648) {
    return 0;
  } else {
    return res;
  }
};
// @lc code=end

// explain: 考虑负数，考虑末尾数或连续末尾数为0，简单，需要考虑下范围

