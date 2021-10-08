/*
 * @lc app=leetcode id=29 lang=javascript
 *
 * [29] Divide Two Integers
 */

// @lc code=start
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
 var divide = function(a, b) {
   let flag;
   if (a < 0) { if (b > 0) flag = 1 }
   else if (b < 0) flag = 1;
   
   if (a == - Math.pow(2, 31) && b == -1) return Math.pow(2, 31) - 1;

    let res=0
    b = Math.abs(b)
    a = Math.abs(a)
    while (a >= b) {
      a -= b;
      res++;
    }
    if (flag == 1 ) return (res*-1) // res = (-res)
    else return res
};
// @lc code=end
/*
题解：
 不用乘法，除法或者mod操作符将两数分割
 直接用除法
 var divide = function(dividend, divisor) {
  let res = parseInt(dividend / divisor);
  const max = Math.pow(2, 31) - 1, min = - Math.pow(2, 31);
  if (res > max) return max;
  if (res < min) return min;
  return res;
};
第二种思路：（1）考虑边界其实题目本身并不会小于最小边界
(2) 在不考虑正负，全部转化为整数的情况下，除数减去被除数的倍数，直到减后的除数小于被除数，那么相减的次数就是返回值
(3) 最后根据正负添加正负号
*/

