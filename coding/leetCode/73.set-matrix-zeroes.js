/*
 * @lc app=leetcode id=73 lang=javascript
 *
 * [73] Set Matrix Zeroes
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
  var setZeroes = function (matrix) {
    let m = matrix.length;
    let n = matrix[0].length;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if(typeof matrix[i][j] === 'number') {
          if (matrix[i][j] === 0) {
            // 则设置是横轴为0，设置纵轴为0
            // 先横轴
            for (let p = 0; p < n; p++) {
              matrix[i][p] = matrix[i][p] === 0 ? 0 : '0';
            }
            for (let q = 0; q < m; q++) {
              matrix[q][j] = matrix[q][j] === 0 ? 0 : '0';
            }
          } else {
            matrix[i][j] = [matrix[i][j]] + '';
          }
        }
      }
    }
    return matrix.map((item) => item.map((val) => Number(val)));
  };
// @lc code=end
/*
题解：
简单
如果当前值为0，则该值的横轴上的所有值都为0，以及纵轴上的所有值也都为0
要求空间复杂度极小，其实就是在matrix的基础上进行改动，将数字变为字符串设置为0，就可以避免下次再遍历了
还有就是注意本身是0的还没有遍历到不要设置为字符串0
*/

