/*
 * @lc app=leetcode id=206 lang=javascript
 *
 * [206] Reverse Linked List
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let current = head;
  let prev = null
  // 遍历链表
  while (current !== null) {
    let next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return prev
};
// @lc code=end

// 这道题题目意思比较好理解
// 可以倒遍历链表吗， 不可以
// 本质上是把指针的指向发生改变，从指向右，到变成指向左，
// 而我们的惯性思维是先取出最后一个，然后再取出倒数第二个，然后顺序拼接
// AI 给了思路， 自己默写一遍吧


