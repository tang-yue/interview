/*
 * @lc app=leetcode id=1372 lang=javascript
 *
 * [1372] Longest ZigZag Path in a Binary Tree
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
var longestZigZag = function(root) {
    let maxLength = 0;
    
    // DFS 函数，返回 [leftLength, rightLength]
    // leftLength: 从当前节点向左走的最长 ZigZag 路径长度
    // rightLength: 从当前节点向右走的最长 ZigZag 路径长度
    function dfs(node) {
        if (!node) {
            return [-1, -1]; // 空节点返回 [-1, -1]
        }
        
        // 递归计算左右子树
        let [leftLeft, leftRight] = dfs(node.left);
        let [rightLeft, rightRight] = dfs(node.right);
        
        // 计算从当前节点向左和向右的最长路径
        let currentLeft = 1 + leftRight;   // 从当前节点向左 = 1 + 左子节点向右的最长路径
        let currentRight = 1 + rightLeft;  // 从当前节点向右 = 1 + 右子节点向左的最长路径
        
        // 更新全局最大值
        maxLength = Math.max(maxLength, currentLeft, currentRight);
        
        return [currentLeft, currentRight];
    }
    
    dfs(root);
    return maxLength;
};
// @lc code=end
// 这道题真是不好理解
// 考察的题型：DFS 动态规划
// 但是这道题真不错

