/*
 * @lc app=leetcode id=108 lang=javascript
 *
 * [108] Convert Sorted Array to Binary Search Tree
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  var buildTree = (Arr, left, right) => {
    if (left > right) return null;
    let mid = Math.floor(left + (right - left) / 2);
    
    let root = new TreeNode(Arr[mid]);
    root.left = buildTree(Arr, left, mid - 1);
    root.right = buildTree(Arr, mid + 1, right);
    return root;
  }
  return buildTree(nums, 0, nums.length - 1);
};
// @lc code=end

/*
描述：转换为高度平衡二叉搜索树
题解：
递归三部曲：
1、确定递归函数返回值及其参数
2、确定递归终止条件
3、确定单层递归的逻辑
核心：找到分割节点，确定左区间和右区间，然后递归遍历左区间和右区间
*/

