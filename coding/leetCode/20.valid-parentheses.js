/*
 * @lc app=leetcode id=20 lang=javascript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let stack = [], leftArr = ["{", "[", "("], rightArr = ["}", "]", ")"];
  for (let item of s) {
    if (leftArr.includes(item)) {
      // 左括号
      stack.push(item);
    } else {
      // 右括号
      let len = stack.length;
      let idx = rightArr.indexOf(item);
      if (leftArr[idx] === stack[len - 1]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
// @lc code=end

/*
有效括号问题
题解：用栈的方式解决
*/

