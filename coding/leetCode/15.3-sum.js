/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  // 先抄一遍，理解下思路
  nums.sort((a, b) => a - b);
  const res = [];
  if (nums == null || nums.length < 3) {
    return [];
  }
  for (let i = 0; i < nums.length -2; i++) {
    const curr = nums[i];
    if (curr > 0) break;
    if (i - 1 >= 0 && curr === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      let l = nums[left], r = nums[right];
      if (curr + nums[left] + nums[right] === 0) {
        res.push([curr, nums[left], nums[right]]);
        while (left < right && nums[left] === l) left++;
        // 本来是不需要加while循环，但为了去除重复值
        while (left < right && nums[right] === r) right--;
      } else if (curr + nums[left] + nums[right] > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return res;
};
// @lc code=end

/*
三数之和：将存在的不重复的相加为0的三个数，存取起来
总体思路：（1) 通过枚举确定一个数，（2）然后另外两个指针分别从左边i+1 和 右边 n-1 往中间移动，
将满足条件的存取起来 (3) 要注意去除重复的值
*/

