/*
 * @lc app=leetcode id=2095 lang=javascript
 *
 * [2095] Delete the Middle Node of a Linked List
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
var deleteMiddle = function(head) {
    // 处理特殊情况：空链表或只有一个节点
    if (head === null || head.next === null) {
        return null;
    }
    
    // 使用快慢指针找到中间节点
    let slow = head;
    let fast = head;
    let prev = null;
    
    // 快指针每次走两步，慢指针每次走一步
    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        prev = slow;
        slow = slow.next;
    }
    
    // 删除中间节点
    prev.next = slow.next;
    
    return head;
};
// @lc code=end
// 这道题我没有什么思路
// 题解，这道题处理的很美丽，很让人喜欢

