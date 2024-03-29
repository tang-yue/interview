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
      for (let c = c1; c <= c2; c++) {
          // 最上边横坐标不动，纵坐标依次递增 // 即获取的值为1 2 3 4
            res.push(matrix[r1][c]); 
        }
      for (let r = r1 + 1; r <= r2; r++) {
          // 最右边纵坐标不动，横坐标依次递增 // 即获取的值为 8 12
            res.push(matrix[r][c2]);
        }
        if(r1 < r2 && c1 < c2) {
          for (let c = c2 - 1; c > c1; c--) {
                // 最底层横坐标不动，纵坐标依次递减
                res.push(matrix[r2][c]); // 即获取的值为 11 10 
            }
          for (let r = r2; r > r1; r--) {
                // 最左侧纵坐标保持不变，横坐标依次递减
                res.push(matrix[r][c1]); // 即获取的值为 9 5
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
采用从外到内，一层一层地遍历每个元素，依次往内，每一层按上右下左的顺序，遍历每一个元素，将它们存在一个动态数组中。
参考：https://zhuanlan.zhihu.com/p/44208253
上述参考比较容易理解
*/

