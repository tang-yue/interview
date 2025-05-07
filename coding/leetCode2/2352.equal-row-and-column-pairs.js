/*
 * @lc app=leetcode id=2352 lang=javascript
 *
 * [2352] Equal Row and Column Pairs
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function(grid) {
    // 最优解如下 beats 96.39%:
    // 我应该意识到 filter 方法会增加时间复杂度
    // 而用我的答案里头的数组存储具体值，也会增加空间复杂度。
    const n = grid.length;
    const rowMap = new Map();
    let count = 0;

    // 统计每行的出现次数
    for (let i = 0; i < n; i++) {
        const rowStr = grid[i].join(',');
        rowMap.set(rowStr, (rowMap.get(rowStr) || 0) + 1);
    }

    // 检查每列是否在行中出现过
    for (let i = 0; i < n; i++) {
        const col = [];
        for (let j = 0; j < n; j++) {
            col.push(grid[j][i]);
        }
        const colStr = col.join(',');
        if (rowMap.has(colStr)) {
            count += rowMap.get(colStr);
        }
    }

    return count;
};
// @lc code=end

// 我居然没有看明白题目的意思。后来才明白

// 第一行要和第一列，第二列，第三列... 进行比较
// 同理

// 我的答案
// 存在问题：耗时长且才beats 6.15%，属于暴力解法
/*
var equalPairs = function(grid) {
    const rowLen = grid.length;
    const columnSumArr = []
    let count = 0
    for (let i = 0; i < rowLen; i++) {
        let columnArr = []
        for (let j = 0; j < rowLen; j++) {
            columnArr.push(grid[j][i])
        }
        console.log(columnArr)
        columnSumArr.push(columnArr.join(','));
    }

    for (let i = 0; i < rowLen; i++) {
        count = count + columnSumArr.filter((item) => item === grid[i].join(',')).length
    }

    return count;
};
*/
