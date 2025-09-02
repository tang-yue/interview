/*
 * @lc app=leetcode id=1161 lang=javascript
 *
 * [1161] Maximum Level Sum of a Binary Tree
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
var maxLevelSum = function(root) {
  if (!root) return 1;
  let queue = [root];
  let level = 1;
  let maxSum = root.val;
  let result = 1;
  while (queue.length > 0) {
    let levelSum = 0;
    let size = queue.length;
    // 处理当前层的所有节点
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      levelSum += node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // 更新最大和
    if (levelSum > maxSum) {
      maxSum = levelSum;
      result = level;
    }
    level++;
  }
  return result;
};
// @lc code=end
// 时间复杂度：O(n), 每个节点访问一次
// 空间复杂度：O(w), w是树的最大宽度

