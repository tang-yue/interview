/*
 * @lc app=leetcode id=236 lang=javascript
 *
 * [236] Lowest Common Ancestor of a Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // 递归终止条件
    if (!root || root === p || root === q) {
        return root;
    }
    
    // 递归处理左右子树
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    
    // 如果左右子树都找到了目标节点，当前节点就是 LCA
    if (left && right) {
        return root;
    }
    
    // 如果只有一边找到了，返回找到的那一边
    return left || right;
};
// @lc code=end
/*
本题考查：
1、后序遍历：先处理子节点，再处理当前节点
2、状态传递：子节点的结果影响父节点的判断
3、分治思想：将问题分解为左右子树的子问题
4、递归终止：找到目标节点或空节点时终止 --本题关键--决定了递归的入参
*/