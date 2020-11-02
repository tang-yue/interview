来自慕课网 JavaScript版 数据结构与算法

## 概念

### 时间复杂度

1、一个函数，用大O表示，比如O(1)、O(n)、O(logN)....

2、定性描述该算法的运行时间

大小顺序：n的2次方 > n > logN > 1

```js
for(let i = 0; i < n; i += 1) {
    for(let j = 0; j < n; j += 1) {
        console.log(i, j)
    }
}
```
上述如果有两次for循环，那么时间复杂度为 n 的 2次方

```js
let i = 1;
while(i < n) {
    console.log(i);
    i *= 2;
}
```
上述这样的话，那么时间复杂度为O(logN)

### 空间复杂度

1、一个函数，用大O表示，比如O(1)、O(n)、O(n^2) .....
2、算法在运行过程中临时占用存储空间大小的量度

```js
let i = 0;
i += 1
```
因为它只声明了单个变量，单个变量所占用内存永远是1，因为是横定的变量。 O(1)

```js
const list = [];
for(let i = 0; i < n; i += 1) {
    list.push(i);
}
```
上述代码，空间复杂度为 O(n)

```js
const matrix = [];
for(let i = 0; i < n; i += 1) {
    matrix.push([]);
    for (let j = 0;  j < n; j +=1) {
        matrix[i].push(j)
    }
}
```
上述代码，二维数组空间复杂度为n的二次方

### 栈是什么？

1. 一个后进先出的数据结构
2. JavaScript 中没有栈，但是可以用Array 实现栈的所有功能

十进制转二进制

有效的括号 问题

思路：
1. 越靠后的左括号，对应的右括号越靠前。
2. 左括号入栈，右括号出栈，最后栈空了就是合法的。

函数调用堆栈

leetcode 20. 有效的括号

解题步骤

+ 新建一个栈。
+ 扫描字符串，遇到左括号入栈，遇到和栈顶括号类型匹配的右括号就出栈，类型
不匹配直接判定为不合法。
+ 最后栈空了就合法，否则不合法。

实现
```js
var isValid = function(s) {
    if (s.length % 2 === 1) { return false; }
    const stack = [];
    for(let i = 0; i < s.length; i +=1) {
        const c = s[i];
        // 遇到左括号
        if(c === '(' || c === '{' || c === '[') {
            stack.push(c);
        } else {
            const t = stack[stack.length -1];
            if(
                (t === '(' && c === ')') ||
                (t === '{' && c === '}') ||
                (t === '[' && c === ']')
            ) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
}
```

3-4 JS 中函数调用堆栈

3-5 leetcode 144. 二叉树的前序遍历

```js
var preorderTraversal = function(root) {
    const res = [];
    const stack = [];
    if (root) stack.push(root);
    while(stack.length) {
        const n = stack.pop();
        res.push(n.val);
        if(n.right) stack.push(n.right);
        if(n.left) stack.push(n.left);
    }
    return res;
}
```

3-6 栈-章节总结

技术要点

1. 栈是一个后进先出的数据结构
2. JavaScript 中没有栈，但可以用Array 实现栈的所有功能
3. 栈常用操作：push、pop、stack[stack.length -1]

3-7 阶段思考题

1. 使用ES6封装Stack类
2. 用栈这个数据结构，将100这个十进制转为二进制

```js
class Stack {
    constructor() {
        this.stack = []
    }
    push(val) {
        this.stack.push(val)
    }
    pop() {
        return this.stack.pop()
    }
    peek() {
        const len = this.stack.length;

        if(len === 0) {
            return null
        } else {
            return this.stack[len-1]
        }
    }
}
```

### 队列是什么？

1. 一个先进先出的数据结构
2. JavaScript 中没有队列，但可以用Array实现队列的所有功能

4-2 什么场景用队列

1. 需要先进先出的场景
2. 比如： 食堂排队打饭， JS异步中的任务队列，计算最近请求次数

4-3 leetCode 933. 最近的请求次数

解题步骤

1. 有新请求就入队，3000ms前发出的请求出队
2. 队列的长度就是最近请求次数

```js
var RecentCounter = function () {
    this.q = [];
}

RecentCounter.prototype.ping = function (t) {
    this.q.push(t);
    while(this.q[0] < t -3000) {
        this.q.shift();
    }
    return this.q.length;
}
```

4-4 前端与队列： JS异步中的任务队列

4-5 队列-章节总结

技术要点

1. 队列是一个先进先出的数据结构
2. JavaScript 中没有队列，但可以用Array 实现队列的所有功能
3. 队列常用操作：push shift queue[0]

### 链表是什么？

1. 多个元素组成的列表
2. 元素存储不连续，用next指针连在一起

数组 vs 链表

1. 数组：增删非首尾元素时往往需要移动元素。
2. 链表：增删非首尾元素，不需要移动元素，只需要更改next 的指向即可。

5-2 leetcode 237 删除链表中节点

解题思路:

1. 无法直接获取被删除节点的上个节点。
2. 将被删除节点转移到下个节点

```js
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
}
```

5-3 leetCode: 206 反转链表

解题步骤

1. 双指针一前一后遍历链表
2. 反转双指针

```js
var reverseList = function(head) {
    let p1 = head;
    let p2 = null;
    while(p1) {
        const tmp = p1.next;
        p1.next = p2;
        p2 = p1;
        p1 = tmp;
    }
    return p2;
}
```

5-4 leetCode：2 两数相加

解题思路：

1. 小学数学题，模拟相加操作。
2. 需要遍历链表

```js
var addTwoNumbers = function(l1, l2) {
    const l3 = new ListNode(0);
    let p1 = l1;
    let p2 = l2;
    let p3 = l3;
    let carry  = 0;
    while(p1 || p2) {
        const v1 = p1 ? p1.val : 0;
        const v2 = p2 ? p2.val : 0;
        const val = v1 + v2 + carry;
        carry = Math.floor(val/ 10);
        p3.next = new ListNode(val % 10);
        if (p1) p1 = p1.next;
        if (p2) p2 = p2.next;
        p3 = p3.next;
    }
    if(carry) {
        p3.next = new ListNode(carry);
    }
    return l3.next;
}
```

5-5 leetCode 83  删除排序链表中的重复元素

解题步骤：

1. 遍历链表，如果发现当前元素和下个元素值相同，就删除下个元素值
2. 遍历结束后，返回原链表的头部

```js
var deleteDuplicates = function (head) {
    let p = head;
    while ( p && p.next) {
        if(p.val === p.next.val) {
            p.next = p.next.next;
        } else {
            p = p.next;
        }
    }
    return head;
}
```

5-6 leetcode 141. 环形链表

解题步骤
1. 用一快一慢两个指针变遍历链表，如果指针能够相逢，就返回true。
2. 遍历结束后，还没有相逢就返回false.

```js
var hasCycle = function(head) {
    let p1 = head;
    let p2 = head;
    while(p1 && p2 && p2.next) {
        p1 = p1.next; // 慢指针
        p2 = p2.next.next; // 快指针
        if ( p1 === p2) {   // 重复
            return true;
        }
    }
    return false;
}
```

5-7 前端与链表： JS 中的原型链

5-8 前端与链表： 使用链表指针获取JSON的节点值

```js
const json = {
    a: { b: { c: 1 } },
    d: { e: 2 }
}
const path = ['a', 'b', 'c'];

let p = json;

path.forEach(k => {
    p = p[k];
})
```

5-9 链表-章节总结

技术要点

1. 链表里的元素存储不是连续的，之间通过next连接
2. JavaScript 中没有链表，但可以用Object模拟链表
3. 链表常用操作：修改next、遍历链表

5-10 阶段思考题

1. 编写一个 instanceOf 方法， 可以判断一个变量是否是另一个变量的实例
2. 请判断一个链表是否为回文链表

### 集合是什么

1. 一种无序且唯一的数据结构。
2. ES6 中有集合，名为 Set
3. 集合的常用操作：去重、判断某元素是否在集合中，求交集

6-2 leetCode 349. 两个数组是的交集

解题思路：

1. 求交集且无序唯一
2. 使用集合

解题步骤

1. 用集合对nums1去重。
2. 遍历nums1，筛选出nums2

```js
var intersection = function(nums1, nums2) {
    return [...new Set(nums1)].filter(n => nums2.includes(n))
}
```

6-3 前端与集合：使用ES6中 Set

Set 操作

1. 使用 Set 对象： new、add、delete、has、size
2. 迭代Set：多种迭代方法、Set 与Array 互转、求交集/差集

6-4 集合章节总结

同上

6-5 阶段思考

1. 在你的实际工作中使用集合完成一次去重操作
2. 了解数据库中的join 操作符吗？ inner join 属于集合中的哪个操作


### 字典是什么？

1. 与集合类似，字典也是一种存储唯一值的数据结构，但它是以键值对的形式来存储的
2. ES6 中有字典，名为Map
3. 字典的常用操作：键值对的增删改查

leetCode  349. 两个数组的交集

解题步骤

1. 新建一个字典，遍历nums1，填充字典。
2. 遍历nums2，遇到字典里的值就选出，并从字典中删除

```js
var intersection = function(nums1, nums2) {
    const map = new Map();
    nums1.forEach(n => {
        map.set(n, true)
    })
    const res = [];
    nums2.forEach(n => {
        if(map.get(n)) {
            res.push(n);
            map.delete(n);
        }
    })
    return res;
}
```

leetCode 20. 有效的括号

```js

```






















