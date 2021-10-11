/*
 * @lc app=leetcode id=56 lang=javascript
 *
 * [56] Merge Intervals
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // 以start[i] 将 intervals 进行排序
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < intervals.length-1; i++) {
    if (intervals[i][1] >= intervals[i + 1][0]) {
      // 说明重叠 // 并 end_value 取最大值
      let end_value = intervals[i + 1][1] > intervals[i][1] ? intervals[i + 1][1] : intervals[i][1];
      intervals.splice(i, 2, [intervals[i][0], end_value]);
      i--;
    }
  }
  return intervals;
};
// @lc code=end
/*
描述：合并所有重叠区间（任意两个），并返回覆盖输入中所有区间的非重叠区间数组。
题解： 如何判断两个区间是否重叠了呢
只要是某区间的endi 大于 另一个区间的starti，则合并并且合并之后还要再次比较
*/

