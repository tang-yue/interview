/*
 * @lc app=leetcode id=21 lang=javascript
 *
 * [21] Merge Two Sorted Lists
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let p = l1, q = l2;
  let l3 = new ListNode(0);
  let m = l3;
  while (p && q) {
    let p_val = p.val;
    let q_val = q.val;
    
    if (p_val > q_val) {
      m.next = new ListNode(q_val);
      q = q.next;
    } else {
      m.next = new ListNode(p_val);
      p = p.next;
    }
    m = m.next;
  }
  if (p) {
    while (p) {
      m.next = new ListNode(p.val);
      m = m.next;
      p = p.next;
    }
  }
  if (q) {
    while (q) {
      m.next = new ListNode(q.val);
      m = m.next;
      q = q.next;
    }
  }
  return l3.next;
};
// @lc code=end

/*
合并两个排序好的链表
思路：
// 自己思考吧
疑问：如何区分有头节点还是无头节点
*/
// @after-stub-for-debug-begin
module.exports = mergeTwoLists;
// @after-stub-for-debug-end