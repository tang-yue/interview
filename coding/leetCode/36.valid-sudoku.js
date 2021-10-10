/*
 * @lc app=leetcode id=36 lang=javascript
 *
 * [36] Valid Sudoku
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isExistInMap = function (map, item) {
  if (map[item] && item !== ".") {
    return false;
  } else {
    map[item] = item;
    return true;
  }
};

var validateHV = function (nums) {
  const validateMap = {};
  return nums.every(num => isExistInMap(validateMap, num));
}

var getVerticalNums = function(nums, row) {
    const result = [];
    for(let i = 0; i < nums.length; i++) result.push(nums[i][row])
    return result;
};
var get3x3 = function(nums, row, col) {
    const result = [];
    for(let i = col; i < col + 3; i++) {
        for(let j = row; j < row + 3; j++){
            result.push(nums[i][j]);
        } 
    }
    return result;
};

var isValidSudoku = function (board) {
  for (let i = 0; i < 9; i++) {
    if (!validateHV(board[i])) return false;
    if (!validateHV(getVerticalNums(board, i))) return false;
    for (let j = 0; j < 9; j++) {
        if(i % 3 === 0 && j % 3 === 0 && !validateHV(get3x3(board, i, j))) return false
    }
  }
  return true;
};
// @lc code=end

/*
题解：有效的数独
遵循以下规则，验证填入的数字是否有效即可
1. 数字 1-9 在每一行只能出现一次。
2. 数字 1-9 在每一列只能出现一次。
3. 数字 1-9 在每3*3方格里只能出现一次。
*/

