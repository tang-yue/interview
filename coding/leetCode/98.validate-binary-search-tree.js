/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  // 简单解法
  const inorderList = [];
  inorder(root);
  for (let i = 1; i < inorderList.length; i++) {
    if (inorderList[i] <= inorderList[i - 1]) {
      return false;
    }
  }
  return true;
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    inorderList.push(node.val);
    inorder(node.right);
  }
}
// @lc code=end

/*
描述：
节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数，所有左子树和右子树自身必须也是二叉搜索树
题解：是否是有效的二叉树搜索
二叉搜索树的中序遍历结果就是一个排列好的序列，所以我们可以对二叉树进行中序遍历，
判读当前的遍历节点值是否大于上一个节点值
另外一种解法：
var isValidBST = function(root) {
  let pre = null;
  return validateUsingInorder(root);
  function validateUsingInorder(node) {
    if(!node) {
      return true;
    }
    if(!validateUsingInorder(node.left)) {
      return fasle;
    }
    if(prev !== null && node.val <= prev) {
      return false;
    }
    prev = node.val;
    return validateUsingInorder(node.right);
  }
}
*/

