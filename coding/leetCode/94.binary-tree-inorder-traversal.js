/*
 * @lc app=leetcode id=94 lang=javascript
 *
 * [94] Binary Tree Inorder Traversal
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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  // 用递归实现
  if (!root) return [];
  let res = [];
  var dfs = (n) => {
    if (!n) return;
    if (n.left) dfs(n.left);
    res.push(n.val);
    if (n.right) dfs(n.right);
  }
  dfs(root);
  return res;
};
// @lc code=end

/*
题解：二叉树的中序遍历
左根右 
递归实现或者用栈实现
*/

