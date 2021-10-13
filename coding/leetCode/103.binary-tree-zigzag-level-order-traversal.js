/*
 * @lc app=leetcode id=103 lang=javascript
 *
 * [103] Binary Tree Zigzag Level Order Traversal
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  if (!root) {
    return [];
  }
  let ans = [];
  let curr = [];
  let queue = [];
  queue.push(root);
  while (queue.length !== 0) {
    curr = [];
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let val = queue.shift();
      if (val.left) {
        queue.push(val.left);
      }
      if (val.right) {
        queue.push(val.right);
      }
      curr.push(val.val);
    }
    ans.push(curr);
  }
  for (let i = 0; i < ans.length; i++) {
    if (i % 2 !== 0) {
      ans[i] = ans[i].reverse();
    }
  }
  return ans;
};
// @lc code=end

/*
题解：
二叉树的Z字形输出
用栈的方式实现，其实比较好理解，ans 里面存储的顺序都是 左 右，但是奇数行的要翻转下。
*/

