/*
 * @lc app=leetcode id=66 lang=javascript
 *
 * [66] Plus One
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let plus = 1;
  for (let i = digits.length - 1; i >= 0; i--) {
    if ((digits[i] + plus) >= 10) {
      digits[i] = 0;
      plus = 1;
    } else {
      digits[i] = digits[i] + plus;
      plus = 0;
    }
  }
  if (plus === 1) digits.unshift(1);
  return digits;
};
// @lc code=end
/*
题解：
简单
如果大于10了就记录1，并将这个1加到前一个值上，一直到最后，如果还有1留下则加到开头
*/

