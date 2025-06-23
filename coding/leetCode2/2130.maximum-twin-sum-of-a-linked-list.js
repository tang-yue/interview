/*
 * @lc app=leetcode id=2130 lang=javascript
 *
 * [2130] Maximum Twin Sum of a Linked List
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
 * @return {number}
 */
var pairSum = function(head) {
    // 1、先把链表转换成数组，方便我们
    const values = [];
    let current = head;
    while (current !== null) {
      values.push(current.val);
      current = current.next;
    }
    // 2、用双指针法找到所有双胞胎节点的和
    let maxSum = 0;
    let left = 0;
    let right = values.length - 1;
    while(left < right) {
      // 计算当前双胞胎节点的和
      const twinSum = values[left] + values[right];
      // 更新最大和
      maxSum = Math.max(maxSum, twinSum);
      // 移动指针
      left++;
      right--;
    }
    return maxSum;
};
// @lc code=end
// 完全没有思路
/* AI 给出的解法思路
第一种解法：先把链表转换成数组，然后再利用双指针法，left 从头部开始向右移动
right 指针从尾部开始向左移动。每次的left和right指向的就是一对双胞胎节点。
这个思路非常的nice.

第二种解法：
1、找到链表中点
2、反转后半部分链表
3、同时遍历前半部分和反转后的后半部分
解法如下：
var pairSum = function(head) {
    // 1. 找到链表中点
    let slow = head;
    let fast = head;
    let prev = null;
    
    while (fast && fast.next) {
        fast = fast.next.next;
        let temp = slow.next;
        slow = temp;
    }
    
    // 2. 反转后半部分链表
    let current = slow;
    prev = null;
    while (current) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    // 3. 计算最大双胞胎和
    let maxSum = 0;
    let firstHalf = head;
    let secondHalf = prev;
    
    while (secondHalf) {
        maxSum = Math.max(maxSum, firstHalf.val + secondHalf.val);
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }
    
    return maxSum;
};
*/