/*
 * @lc app=leetcode id=394 lang=javascript
 *
 * [394] Decode String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 * 
 * 示例:
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 * 
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 * 
 * 解题思路：
 * 1. 使用两个栈：一个存储数字(numStack)，一个存储字符串(strStack)
 * 2. 遍历字符串，遇到不同字符有不同处理：
 *    - 数字：收集完整数字
 *    - 字母：收集当前字符串
 *    - [：将当前数字和字符串入栈，重置当前数字和字符串
 *    - ]：出栈处理，将当前字符串重复指定次数，与栈顶字符串拼接
 */
var decodeString = function(s) {
    const numStack = [];    // 存储数字的栈
    const strStack = [];    // 存储字符串的栈
    let currentNum = 0;     // 当前数字
    let currentStr = '';    // 当前字符串
    
    for (let char of s) {
        if (/\d/.test(char)) {
            // 如果是数字，累加当前数字
            currentNum = currentNum * 10 + parseInt(char);
        } else if (char === '[') {
            // 遇到 [，将当前数字和字符串入栈
            numStack.push(currentNum);
            strStack.push(currentStr);
            // 重置当前数字和字符串
            currentNum = 0;
            currentStr = '';
        } else if (char === ']') {
            // 遇到 ]，出栈处理
            // 获取需要重复的次数和之前的字符串
            const repeatTimes = numStack.pop();
            const prevStr = strStack.pop();
            // 将当前字符串重复指定次数，与之前的字符串拼接
            currentStr = prevStr + currentStr.repeat(repeatTimes);
        } else {
            // 如果是字母，追加到当前字符串
            currentStr += char;
        }
    }
    
    return currentStr;
};
// @lc code=end

// 测试用例
console.log(decodeString("3[a]2[bc]")); // 输出: "aaabcbc"
console.log(decodeString("3[a2[c]]")); // 输出: "accaccacc"
console.log(decodeString("2[abc]3[cd]ef")); // 输出: "abcabccdcdcdef"

// AI 生成，大概看明白了，但还是觉得有点难的
