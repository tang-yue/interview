/*
 * @lc app=leetcode id=345 lang=javascript
 *
 * [345] Reverse Vowels of a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// 下面双指针的思路不错
var reverseVowels = function(s) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  const arr = s.split('');
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !vowels.has(arr[left])) {
      left++;
    }
    while (left < right && !vowels.has(arr[right])) {
      right--;
    }
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr.join('');
};
// @lc code=end
// 题目描述: 找到元音字符取出并记录位置，然后将元音字符反转
// 自己做的，但是替换s的时候，么有想到好方法。并且beats 5.05 % 数据不太好 如下
/*
我的答案：
var reverseVowels = function(s) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let vowelsPostion = []
  let vowelsArr = []
  // 遍历字符串s
  for(let i = 0; i < s.length; i++) {
    if(vowels.includes(s[i].toLowerCase())) {
      vowelsPostion.push(i)
      vowelsArr.push(s[i])
    }
  }
  // 遍历voewlsPostion
  vowelsPostion.forEach((item, index) => {
    s = s.substring(0, item) + vowelsArr[vowelsArr.length - 1 - index] + s.substring(item + 1)
  })
  return s
};
*/
