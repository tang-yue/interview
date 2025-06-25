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
var maxDepth = function(root) {
  // 如果节点未空，深度为0
  if(root === null) {
    return 0;
  }
  // 递归计算左子树的最大深度
  const leftDepth = maxDepth(root.left);
  // 递归计算右子树的最大深度
  const rightDepth = maxDepth(root.right);

  // 返回左右子树最大深度 + 1 (当前节点这一层)
  return Math.max(leftDepth, rightDepth) + 1;
};
// @lc code=end

// 我发现我深度遍历全部都忘光了
// 完全用的是递归解法啊

