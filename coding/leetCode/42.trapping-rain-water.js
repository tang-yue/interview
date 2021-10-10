/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let maxLeft=height[0];
    let maxRight=height[height.length-1];
    let i=1;
    let j=height.length-2;
    let total=0;
	
    while(i<=j) {
      if(maxLeft<=maxRight){
        if(maxLeft-height[i]>0){
          total+=maxLeft-height[i];
        }
        // update max
        maxLeft=Math.max(height[i],maxLeft)
        i++;
      }else{
        if(maxRight-height[j]>0){
          total+=maxRight-height[j];
        }
        maxRight=Math.max(height[j],maxRight)
        j--;
      }
    }
    return total;
};
// @lc code=end

/*
题解：
给出n个非负整数，代表一张X轴上每个区域宽度为1的海拔图，计算这个海拔图最多能接住多少雨水。
双指针法 和 leetcode 11 题是有点类似的，面积求法要比11的稍微难点。
*/

