/*
 * @lc app=leetcode id=1448 lang=javascript
 *
 * [1448] Count Good Nodes in Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var goodNodes = function(root) {
  const dfs = (node, pathMax) => {
    if (!node) return 0;
    // 计算当前节点是否是好节点
    let count = node.val >= pathMax ? 1 : 0;

    // 更新路径最大值
    const newMax = Math.max(pathMax, node.val);

    // 递归处理左右子树，并把当前路径的最大值传递下去
    return count +
           dfs(node.left, newMax) +
           dfs(node.right, newMax);
  }
  return dfs(root, -Infinity);
};
// @lc code=end

// 我的答案：
/*
var goodNodes = function(root) {
    let max = 0;
    let count = 0;
    const deepDfs = (root) => {
      if (!root) return

      if(root.val >= max) {
        count++;
        max = root.val
      }
      deepDfs(root.left)
      deepDfs(root.right)
    }
  deepDfs(root)
  return count;
};
错误：在于我所有的路径都用了一个同一全局最大值。而我们应该保持每条路径上的最大的独立性。
*/

