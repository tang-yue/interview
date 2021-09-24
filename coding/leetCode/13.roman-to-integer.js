/*
 * @lc app=leetcode id=13 lang=javascript
 *
 * [13] Roman to Integer
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    // 我的解法
      let twoMap = [
        { d: 900, r: "CM" },
        { d: 90, r: "XC" },
        { d: 40, r: "XL" },
        { d: 400, r: "CD" },
        { d: 9, r: "IX" },
        { d: 4, r: "IV" }
      ]
      let oneMap = [
        { d: 1, r: "I" },
        { d: 5, r: "V" },
        { d: 10, r: "X" },
        { d: 50, r: "L" },
        { d: 100, r: "C" },
        { d: 500, r: "D" },
        { d: 1000, r: "M" }
      ]
      var sum = 0;
      for (let i = 0; i < s.length; i++) {
        let twoS = s[i] + s[i + 1];
        let flag = false;
        twoMap.forEach(function (el) {
          if (el.r === twoS) {
            flag = true;
            sum = sum + el.d;
            i++;
          }
        });
        if (!flag) {
          oneMap.forEach(function (el) {
            if (el.r === s[i]) {
              sum = sum + el.d;
            }
          });
        }
      }
      return sum;
    };
// @lc code=end

/*
罗马转整数
I: 1
V: 5
X: 10
L: 50
C: 100
D: 500
M: 1000
应该就是几个特殊符号，然后特殊处理下
CM: 900
XC: 90
XL: 40
CD: 400
IX: 9
IV: 4
所以思路就是分成一个字符去处理，或者两个字符去处理，通过
*/


