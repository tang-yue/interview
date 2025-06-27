/*
 * @lc app=leetcode id=437 lang=javascript
 *
 * [437] Path Sum III
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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
  if (!root) return 0;
  // 以当前节点为起点找路径
  const startWithRoot = findPath(root, targetSum);
  // 递归去左子树找路径
  const leftPaths = pathSum(root.left, targetSum);
  // 递归去右子树找路径
  const rightPaths = pathSum(root.right, targetSum);

  return startWithRoot + leftPaths + rightPaths;
};

// 辅助函数：从指定节点开始向下寻找路径
function findPath(node, target) {
  if (!node) return 0;
  let count = 0;
  // 如果当前节点值等于目标值，找到一条路径
  if (node.val === target) count++;

  //继续往下找，目标值减去当前节点值
  count += findPath(node.left, target - node.val);
  count += findPath(node.right, target - node.val);

  return count;
}
// @lc code=end
// 问题在于不是一个路径上的所有元素都等于targetSum，而是连续不确定的几个元素
// 如何解决连续不确定这个说法
// 这道题简直太优秀了，非常开心能遇到这样的题目
// 这道题是真难啊

