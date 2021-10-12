/*
 * @lc app=leetcode id=79 lang=javascript
 *
 * [79] Word Search
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  // 下面这种解法比较容易是理解
  const n = board.length; m = board[0].length;
  if (word.length < 1) return false;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === word[0]) { // 每一个元素都有可能是开头第一个元素
        const match = dfs(i, j, 0);
        if (match) return true;
      }
    }
  }
  function dfs(i, j, pos) {
    // 条件终止的边界条件
    // 满足超出范围，或者是选择的这个元素并不是word对应位置的元素，则返回false
    if (i === n || i < 0 || j === m || j < 0 || board[i][j] !== word[pos]) return false;
    if (pos === word.length - 1) return true;
    board[i][j] = "."; // 这句话的意识是自身用过了就不可以重复使用了
    const found =
      dfs(i + 1, j, pos + 1) ||
      dfs(i - 1, j, pos + 1) ||
      dfs(i, j + 1, pos + 1) ||
      dfs(i, j - 1, pos + 1);
    
    board[i][j] = word[pos];
    return found;
  }
  return false;
};
// @lc code=end

/*
undone
题解：四个方向都是可以的
递归回溯法
另外一种写法如下:
var exist = function(board, word) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (helper(board, word, row, col, 0)) {
        return true;
      }
    }
  }
  return false;
};

var helper = function (board, word, row, col, wordIndex) {
  if (wordIndex === word.length) return true;
  
  // out of bounds check
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return false;

  if (board[row][col] !== word[wordIndex]) return false;

  let temp = board[row][col];
  board[row][col] = "*";

  // explore
  let bool = helper(board, word, row - 1, col, wordIndex + 1) ||
    helper(board, word, row + 1, col, wordIndex + 1) ||
    helper(board, word, row, col - 1, wordIndex + 1) ||
    helper(board, word, row, col + 1, wordIndex + 1);
  
  // unchoose
  board[row][col] = temp;

  return bool;
}
*/

