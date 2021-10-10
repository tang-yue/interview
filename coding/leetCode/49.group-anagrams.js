/*
 * @lc app=leetcode id=49 lang=javascript
 *
 * [49] Group Anagrams
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const recordMap = {};
    const result = [];
    for(let str of strs) {
        const sortStr = str.split('').sort().join('');
        if(recordMap[sortStr]) {
            recordMap[sortStr].push(str);
        } else {
            recordMap[sortStr] = [str];
        }
    }
    for(let key in recordMap) {
        result.push(recordMap[key])
    }
    return result;
};
// @lc code=end

/*
题解：由一模一样字母组成的短单词合并到一个数组里。
我的解法如下： 但是时间超时， 时间复杂度为 O 平方
var groupAnagrams = function(strs) {
    let res = [];
    for(let i = 0; i < strs.length; i++) {
        let arr = [strs[i]];
        let str = strs[i].split('').sort();
        for(let j = i+1; j < strs.length; j++) {
            let compareStr = strs[j].split('').sort();
            if(str.join('') === compareStr.join('')) {
                arr.push(strs[j]);
                strs.splice(j, 1);
                j--;
            }
        }
        res.push(arr);
    }
    return res;
};

另外一种题解
排序的字符串肯定相同，然后用一个哈希map发现排序的字符串相同就把他们加进去，这个思路很好的
*/

