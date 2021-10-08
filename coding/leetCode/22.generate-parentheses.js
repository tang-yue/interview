/*
 * @lc app=leetcode id=22 lang=javascript
 *
 * [22] Generate Parentheses
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const res = [];
  const dfs = (lRemain, rRemain, str) => {
    if (str.length === 2 * n) {
      res.push(str);
      return;
    }
    if (lRemain > 0) {
      dfs(lRemain - 1, rRemain, str + "(");
    }
    if (lRemain < rRemain) {
      dfs(lRemain, rRemain - 1, str + ")"); 
    }
  }
  dfs(n, n, ""); // 递归的入口，剩余数量都是n，初始字符串是空串
  return res;
};
// @lc code=end

/*
题解：
1；输出所有一对括号的组合
2：输出所有二对括号的组合
3：同理
没有思路
*/