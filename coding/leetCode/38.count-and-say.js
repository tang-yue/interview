/*
 * @lc app=leetcode id=38 lang=javascript
 *
 * [38] Count and Say
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
  if (n === 1) return "1";
  return generatorCount(countAndSay(n - 1));
  // generatorCount(countAndSay(2));
  // generatorCount(generatorCount(countAndSay(1)))
  // 即 generatorCount(generatorCount(1))
  // 即 generatorCount(11) // 21
};
function generatorCount(n) {
  let initStr = n[0];
  let result = "";
  for (let i = 0; i < n.length; i++) {
    if (n[i] === n[i + 1]) {
      initStr += n[i + 1];
    } else {
      result += initStr.length + initStr[0];
      initStr = n[i + 1];
    }
  }
  return result;
}

// @lc code=end

/*
题解：
n = 1 时， “1”
n = 2 时， "11"
n = 3 时， "21"
n = 4 时， "1211"
n = 5 时， "111221"
n = 6 时， "312211"
n = 7 时， "13112221"
递归解法：
countAndSay(1) = "1"
countAndSay(n）是对countAndSay(n-1)的描述，然后转换成另一个数字字符串

1. 从第一个字符串开始，遍历字符串
2. 如果前一个字符和后一个字符相同，就加在一起，直到后一个字符和前一个字符不一样
3. 然后统计之前相同字符的个数，然后进行拼接
*/
