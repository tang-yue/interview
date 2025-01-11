/*
 * @lc app=leetcode id=1431 lang=javascript
 *
 * [1431] Kids With the Greatest Number of Candies
 */

// @lc code=start
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {
  // 初始化candies 数组长度的新数组，内容为false
  let result = new Array(candies.length).fill(false);
  // 遍历candies
  for(let i = 0; i < candies.length; i++) {
    // 判断是否有孩子拥有最多的糖果
    if(candies[i] + extraCandies >= Math.max(...candies)) {
      result[i] = true;
    }
  }
  return result;
};
// @lc code=end

// 这道题相对还是比较简单的

