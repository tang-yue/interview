/*
 * @lc app=leetcode id=328 lang=javascript
 *
 * [328] Odd Even Linked List
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
var oddEvenList = function(head) {
    // 如果链表为空或只有一个节点，直接返回
    if (!head || !head.next) return head;
    
    // 保存原始链表头部引用
    let originalHead = head;
    
    // 保存偶数链表的头部引用
    let evenHead = head.next;
    // 用于移动的指针：odd 指向奇数节点，even 指向偶数节点
    let odd = head;
    let even = evenHead;
    
    while (even && even.next) {
        // 更新奇数节点的 next：跳过偶数节点，指向下一个奇数节点
        odd.next = even.next;
        // 移动奇数指针到下一个奇数节点
        odd = odd.next;
        
        // 更新偶数节点的 next：跳过奇数节点，指向下一个偶数节点
        even.next = odd.next;
        // 移动偶数指针到下一个偶数节点
        even = even.next;
    }
    
    // 将奇数链表的末尾与偶数链表的头部相连
    odd.next = evenHead;
    
    // 返回原始头部引用
    return originalHead;
};
// @lc code=end

// 看题目是先把奇数位置上的数全部取出，然后剩余的数还是按照本来的顺序放在之前取出数的后面
// Input: head = [1,2,3,4,5]
// Output: [1,3,5,2,4]
// 链表感觉整个人很懵啊