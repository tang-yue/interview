/*
 * @lc app=leetcode id=46 lang=javascript
 *
 * [46] Permutations
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let res = [];
  var dfs = (path) => {
    if (path.length === nums.length) {
      res.push(path);
    }
    nums.forEach((n) => {
      if (path.includes(n)) return;
      dfs(path.concat(n));
    })
  }
  dfs([]);
  return res;
};
// @lc code=end

/*
题解：
全排列问题，递归回溯法
条件：要求不能重复and满足长度为nums的长度的时候就可以收集了
*/

