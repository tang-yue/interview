/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  let map = new Map();
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }
  return helper(preorder, 0, preorder.length-1, inorder, 0, inorder.length -1, map)
};
function helper(preorder, p_start, p_end, inorder, i_start, i_end, map) {
  if (p_start > p_end) return null;
  let rootVal = preorder[p_start];
  let root = new TreeNode(rootVal);
  let mid = map.get(rootVal);
  let leftNum = mid - i_start;
  root.left = helper(preorder, p_start + 1, p_start + leftNum, inorder, i_start, mid - 1, map);
  root.right = helper(preorder, p_start + leftNum + 1, p_end, inorder, mid + 1, i_end, map);
  return root;
}
// @lc code=end
/*
描述：根据前序遍历以及中序遍历还原原来的样子
题解：
前序：根节点，左子树，右子树
中序：左子树，根节点，右子树
思路：首先根据前序遍历，找到根节点的值，然后在中序遍历里找到这个值对应的下标。
然后左子树和右子树，递归遍历
*/

