/*
 * @lc app=leetcode id=605 lang=javascript
 *
 * [605] Can Place Flowers
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
  // 0 2 都是0的情况下，可以种花
  if (n === 0) return true;
  if(flowerbed.length === 1) {
    if (flowerbed[0] === 0 && n === 1) return true;
    return false;
  }
  for(let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0 && flowerbed[i+1] === 0) {
      if (i === 0) {
        n--;
        flowerbed[i] = 1;
      } else if ((i === flowerbed.length - 2) && flowerbed[i+1] === 0) {
        n--;
        flowerbed[i+1] = 1;
      } else if (flowerbed[i-1] === 0) {
        n--;
        flowerbed[i] = 1;
      }
    }
    if (n === 0) return true;
  }
  return false;
};
// @lc code=end
// 主要是你要考虑各种边界值的问题，这些也只能通过实际的测试用例来验证

