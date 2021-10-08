/*
 * @lc app=leetcode id=23 lang=javascript
 *
 * [23] Merge k Sorted Lists
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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  // 第一种解法，这个思路也是不错的，先两两合并成一个，直到剩下最后一个
  if (lists.length === 0) return null;
  const merge = (l1, l2) => {
    let temp = new ListNode(),
      curr = temp
    while (l1 && l2) {
      if (l1.val < l2.val) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
      curr = curr.next;
    }
    curr.next = l1 || l2;
    return temp.next;
  }
  while (lists.length > 1) {
    let a = lists.shift();
    let b = lists.shift();
    const h = merge(a, b);
    lists.push(h);
  }
  return lists[0]
};
// @lc code=end
/*
题解：
合并多个排序链表
没有思路
第二种题解：把所有的值取出来，然后形成一个排序好的数组，然后返回将该数组形成的链表
const mergeKLists = (lists) => {
  let listsArr = [];
  for (let i = 0; i < lists.length; i++) {
    let curr = lists[i];
    while (curr) {
      listsArr.push(curr.val);
      curr = curr.next;
    }
  }
  listsArr.sort((a, b) => a - b);
  
  // 将这个数组转化成链表的形式
  let res = new ListNode();
  let head = res;
  for (let i = 0; i < listsArr.length; i++) {
    head.next = new ListNode(listsArr[i]);
    head = head.next;
  }
  return res.next;
}
*/

