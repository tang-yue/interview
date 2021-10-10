/*
 * @lc app=leetcode id=54 lang=javascript
 *
 * [54] Spiral Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    let res = [];
    let r1 = 0, r2 = matrix.length -1;   // 规定当前层的上下边界
    let c1 = 0, c2 = matrix[0].length - 1; // 规定当前层的左右边界
    while(r1 <= r2 && c1 <= c2) {
        for(let c = c1; c <= c2; c++) {
            res.push(matrix[r1][c]);
        }
        for(let r = r1+1; r <= r2; r++) {
            res.push(matrix[r][c2]);
        }
        if(r1 < r2 && c1 < c2) {
            for(let c = c2 -1; c > c1; c--) {
                res.push(matrix[r2][c]);
            }
            for(let r = r2; r > r1; r--) {
                res.push(matrix[r][c1]);
            }
        }
        r1++;
        r2--;
        c1++;
        c2--;
    }
    return res;
};
// @lc code=end

/*
题解：
00 01 02 03
10 11 12 13
20 21 22 23
参考：https://zhuanlan.zhihu.com/p/44208253
*/

