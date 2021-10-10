/*
 * @lc app=leetcode id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if(x === 0) return 0;
    if(x === 1) return 1;
    if(x === -1) return n%2 === 0 ? 1 : -1;
    var sum = 1, m = n <0 ? -n : n;
    while(m > 0) {
        sum = sum * x;
        m--;
    }
    if(n >=0) {
        return sum;
    } else {
        return 1/sum;
    }
};
// @lc code=end

/*
题解：
实现一个Math.pow()方法
字符串如何正好转换为数字呢，同时保留的小数个数不变。
思路：乘方 就是 自身相乘的次数 考虑 边界 0 1 -1;
我的解法如下：
var myPow = function(x, n) {
    if(x === 0) return 0;
    if(x === 1) return 1;
    if(x === -1) return n%2 === 0 ? 1 : -1;
    var sum = 1, m = n <0 ? -n : n;
    while(m > 0) {
        sum = sum * x;
        m--;
    }
    if(n >=0) {
        return sum;
    } else {
        return 1/sum;
    }
};
*/

