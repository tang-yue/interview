/*
 * @lc app=leetcode id=872 lang=javascript
 *
 * [872] Leaf-Similar Trees
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
  // 用来收集叶子节点的函数
  const getLeaves = (root, leaves = []) => {
    // 如果节点为空，直接返回
    if (!root) return leaves;

    // 如果是叶子节点 （左右子节点都为空），收集该节点的值
    if (!root.left && !root.right) {
      leaves.push(root.val);
      return leaves;
    }

    // 递归遍历左右子树
    getLeaves(root.left, leaves);
    getLeaves(root.right, leaves);

    return leaves;
  }
  // 分别获取两棵树的叶子节点序列
  const leaves1 = getLeaves(root1);
  const leaves2 = getLeaves(root2);

  // 比较两个序列是否相同
  // 1. 长度必须相同
  // 2. 对应位置的值必须相同
  if (leaves1.length !== leaves2.length) return false;
    
    for (let i = 0; i < leaves1.length; i++) {
        if (leaves1[i] !== leaves2[i]) return false;
    }
    
    return true;
};
// @lc code=end
// 找到root1 和 root2的叶子节点，然后进行比较
// 如何拿到叶子节点呢，感觉最近自己的脑袋都不灵光了
// 如果2i+1 是null和2i+2 是null，那么i 就是叶子节点的索引，这个适用于数组的完全二叉树
// 感觉涉及到二叉树的时候，好多都用到了递归遍历
