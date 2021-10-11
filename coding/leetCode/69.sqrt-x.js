/*
 * @lc app=leetcode id=69 lang=javascript
 *
 * [69] Sqrt(x)
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  // 二分查找解法
  let l = 0;
  let r = x;
  let m = 0;
  let res = -1;
  while (l <= r) {
    m = Math.floor((l + r) / 2);
    if (m * m <= x) {
      res = m;
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  return res;
};
// @lc code=end

/*
题解：
计算x的平方根
x 的取值范围是 0 到 pow(2, 31) -1
暴力解法
let re = 0;
  while (!((re * re) <= x && (re + 1) * (re + 1) > x)) {
    re++;
  }
  return re;
*/

