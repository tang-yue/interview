/*
 * @lc app=leetcode id=116 lang=javascript
 *
 * [116] Populating Next Right Pointers in Each Node
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (!root) return root;
  const q = [root];
  while (q.length > 0) {
    let size = q.length;
    for (let i = 0; i < size; i++) {
      const node = q.shift();
      if (i < size - 1) {
        node.next = q[0];
      }
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return root;
};
// @lc code=end

/*
描述：在每个指针中填充下一个右指针
题解：
思路：其实仔细看会发现都是在每一层的末尾加了'#'
所以可以先通过层序遍历收集，再在每一层遍历结束后添加‘#’
可以参考leetcode 103 Z 字形输出
上述的思路完全是错误的
题目要求返回并不是一个数组，而是连接好了的二叉树
对二叉树进行层序遍历，在层序遍历的过程中将二叉树每一层的节点拿出来遍历并连接
*/

