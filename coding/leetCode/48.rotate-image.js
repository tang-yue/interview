/*
 * @lc app=leetcode id=48 lang=javascript
 *
 * [48] Rotate Image
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    for(let i = 0; i < matrix.length; i++) {
        for(let j = i; j < matrix.length; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
    }
    return matrix.map(item => item.reverse());
};
// @lc code=end

/*
题解：矩阵旋转问题
思路是什么呢？关键是思路
（1）第一步交换matrix[i][j], matrix[i][j]
 (2) 第二步将得到的每组数组倒序排列即可
*/

