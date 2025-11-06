/*
 * @lc app=leetcode id=450 lang=javascript
 *
 * [450] Delete Node in a BST
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
 * @param {number} key
 * @return {TreeNode}
 */

var deleteNode = function(root, key) {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
    return root;
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
    return root;
  }

  // 找到要删除的节点
  if (!root.left) return root.right;
  if (!root.right) return root.left;

  // 找后继：从右子树一直往左走
  let successor = root.right;
  while (successor.left) {
    successor = successor.left;
  }

  // 用后继的值替换当前值
  root.val = successor.val;
  // 删除后继节点
  root.right = deleteNode(root.right, successor.val);
  
  return root;
};
// @lc code=end

