/*
 * @lc app=leetcode id=1456 lang=javascript
 *
 * [1456] Maximum Number of Vowels in a Substring of Given Length
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
   const vowels = ['a', 'e', 'i', 'o', 'u'];
   let max = 0;
   let currentCount = 0
   for (i = 0; i < k; i++) {
    if (vowels.includes(s[i])) {
      currentCount ++;
    }
   }
   max = Math.max(max, currentCount);

   for (i = k; i < s.length; i++) {
    if (vowels.includes(s[i])) {
      currentCount++;
    }
    if (vowels.includes(s[i -k])) {
      currentCount--
    }
    max = Math.max(max, currentCount);
   }
   return max;
};
// @lc code=end

// 这个和643属于同类，并且用的滑动窗口的逻辑都是一样的。
// 但是还是要靠自己手写一遍的，不然还是记不住。


// 滑动窗口通用模版
// function slidingWindow(s, k) {
//     // 1. 初始化窗口
//     let window = /* 初始窗口值 */;
    
//     // 2. 计算第一个窗口的结果
//     let result = /* 第一个窗口的结果 */;
    
//     // 3. 滑动窗口
//     for (let i = k; i < s.length; i++) {
//         // 处理移出窗口的元素
//         window -= /* 移出元素的影响 */;
        
//         // 处理移入窗口的元素
//         window += /* 移入元素的影响 */;
        
//         // 更新结果
//         result = /* 更新结果 */;
//     }
    
//     return result;
// }