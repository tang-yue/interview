/*
 * @lc app=leetcode id=53 lang=javascript
 *
 * [53] Maximum Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) { 
    let sum = nums[0];
    let maxSum = nums[0];
    if(nums.length === 1) {
        return nums[0];
    }
    for(let i = 1; i < nums.length; i++) {
        sum = sum < 0 ? nums[i] : sum + nums[i];
        maxSum = sum > maxSum ? sum : maxSum;
    }
    return maxSum; 
};
// @lc code=end

/*
题解：
这道题比较好。
就是遍历一遍，判断包含从0到当前遍历值i的最大子序列和，
如果sum<0, 那么就丢掉之前的子序列，直接让sum = nums[i],
如果sum>0，否则sum = sum + nums[i]
计算后的sum如果大于maxSum，那么就进行替换
*/

