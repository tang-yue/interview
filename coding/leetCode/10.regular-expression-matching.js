/*
 * @lc app=leetcode id=10 lang=javascript
 *
 * [10] Regular Expression Matching
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  // 别人的答案
  var lenS = s.length;
  var lenP = p.length;
  var map = {};
  return check(0, 0);
  function check(idxS, idxP) {
    if (map[idxS + ':' + idxP] !== undefined) return map[idxS + ":" + idxP];
    if (idxS > lenS) return false;
    if (idxS === lenS && idxP === lenP) return true;

    if (p[idxP] === "." || p[idxP] === s[idxS]) {
      map[idxS + ":" + idxP] = p[idxP + 1] === "*" ?
        check(idxS + 1, idxP) || check(idxS, idxP + 2) :
        check(idxS + 1, idxP + 1);
    } else {
      map[idxS + ":" + idxP] = p[idxP + 1] === "*" ?
        check(idxS, idxP +2) : false
    }
    return map[idxS + ":" + idxP];
  }
};

// @lc code=end

/*
explain: 题目就是考察正则
这个我有什么思路呢，如果对的话，那么就补齐
没有思路，hard 模式，看题解，也是不怎么懂
*/

