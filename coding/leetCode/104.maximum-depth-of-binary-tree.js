/*
 * @lc app=leetcode id=104 lang=javascript
 *
 * [104] Maximum Depth of Binary Tree
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
var maxDepth = function (root) {
  let res = 0;
  const dfs = (n, l) => {
    if (!n) {
      return;
    }
    if (!n.left && !n.right) {
      res = Math.max(res, l); // 记录层级并不断刷新
    }
    dfs(n.left, l + 1);
    dfs(n.right, l + 1);
  };
  dfs(root, 1);
  return res;
};
// @lc code=end

/*
题解：
求解二叉树的最大深度
深度遍历
思路：自己思考下吧
用递归法，深度遍历
*/

