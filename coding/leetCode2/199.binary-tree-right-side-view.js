/*
 * @lc app=leetcode id=199 lang=javascript
 *
 * [199] Binary Tree Right Side View
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

var levelOrder = function (root) {
  if (!root) return [];
  const q = [[root, 0]];
  const res = [];
  while (q.length) {
    const [n, level] = q.shift();
    if (!res[level]) {
      res.push([n.val]);
    } else {
      res[level].push(n.val);
    }
    if (n.left) q.push([n.left, level + 1]);
    if (n.right) q.push([n.right, level + 1]);
  }
  return res;
};

var rightSideView = function(root) {
    const res = levelOrder(root);
    return res.map(item => item[item.length - 1]);
};
// @lc code=end
// 我大概看明白意思了
// 把二叉树看成一层一层的，也就是每一层的最右侧的可以被看到，即返回每一层的最右侧一个
// 所以我借用了之前一个层序遍历的代码，就很顺利

