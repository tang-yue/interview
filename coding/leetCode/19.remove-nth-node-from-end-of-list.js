/*
 * @lc app=leetcode id=19 lang=javascript
 *
 * [19] Remove Nth Node From End of List
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let slow = slowCopy = fast = new ListNode();
  slow.next = head;
  while (n--) {
    fast = fast.next;
  }
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return slowCopy.next;
};
// @lc code=end

/*
移除链表的倒数第n个节点
思路：设置快慢指针，让快指针先走n步，然后快慢指针一起走，
快指针达到链表尽头的时候，慢指针的下一个节点就是第n个节点
*/