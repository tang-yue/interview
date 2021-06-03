
## 目录
1. [复杂度分析]()
2. [数组里的逻辑思想]()
3. [链表]()
4. [栈]()
5. [树]()
   + 5.1 [二叉树]()
   + 5.2 [最小堆的实现]()
6. [排序和查找]()
7. [基本算法思想]()
   + 7.1 [递归和回溯]()
   + 7.2 [动态规划]()
   + 7.3 [贪心算法]()

## 1.复杂度分析

- [1.1](#1.1)<a name='1.1'></a> **时间复杂度**: 定性描述该算法的运行时间，用O(f(n)) 这样表示

- [1.2](#1.2)<a name="1.2"></a> **什么是大O**: n 表示数据规模；`O(f(n))` 表示运行算法所需要执行的指令数，和f(n）成正比。
比如： `O(logn)` 所需执行指令数：`a * logn`，随着 n 的数量级增加，指令数是被 f(n) 所控制

- [1.3](#1.3)<a name="1.3"></a> **常见的代码复杂度分析**

  基本的一些复杂度分析

```javascript

// O(n)
function sum (n) {
 let sum = 0;
 for(let i = 0; i <= n; i++) {
  sum += i;
 }
 return sum;
}

function reverse(s) {
 for(let i = 0; i < s.length/2; i++) {
  swap( s[i], s[n-1-i]);
 }
}

// 双循环 O(n平方)

for(let i = 0; i < n; i += 1) {
 for(let j = 0; j < n; j += 1) {
  console.log(i, j)
 }
}

// O(n)

for(let i = 0; i < n; i += 1) {
 for(let j = 0; j < 20; j += 1) {
  console.log(i, j)
 }
}

// O(logn)

function binarySearch(arr, target) { 
 let l = 0; r = arr.length - 1;
 while(l <= r) {
  let mid = parseInt((l + r)/2, 10) // l + (r-l)/2 可以避免整型溢出
  if(arr[mid] === target) return mid;
  if(arr[mid] > target) r = mid -1;
  else l = mid + 1;
 }
  return -1;
}

// O(nlogn)

function hello(n) {
 for(let i = 1; i < n; i += i) {
  for(let j = 1; j < n; j ++) {
  	console.log(i, j)
  }
 }
}

// O(sqrt(n))

function isPrime(n) {
 for(let i = 2; i * i <= n; i++) {
  if(n*x === 0) return false;
  return true;
 }
}
```

  **递归算法的复杂度分析**：关键点：1、递归的调用的次数 n 2、递归深度 3、在每个递归函数中，做的其他事情的时间复杂度 假设为 T ===> 最后的时间复杂度就是 O(n * T * depth)

```javascript

function func(n) {
 if(n == 0) {
  return 1;
}
 return f(n-1) + f(n-1)
}
// 对于f(3) 调用是两次 f(2)，而f(2) 又调用两次f(1)，而f(1) 又调用两次f(0)。 相当于 2 的0 次方 + 2的1次方 + 2的2次方 + 2的3次方。 =====> 2 的 n+1次方 -1 ===> O(2的n次方)
```


## 2.数组里的逻辑思想

- [2.1](#2.1)<a name='2.1'></a> 对撞指针

```javascript
// 167 Two Sum II - Input array is sorted
// 思路：两个指针都往中间移动，直到找到
var twoSum = function(numbers, target) {
 let l = 0, r = numbers.length - 1;
 while(l < r) {
  if(numbers[l] + numbers[r] === target) {
    return [l +1, r + 1]
  } else if(numbers[l] + numbers[r] > target) {
    r--
  } else {
    l++;
  }
 }
}
```

- [2.2](#2.2)<a name='3.1'></a> 查找表和滑动窗口

**延伸数据结构字典**：字典是一种存储唯一值的数据结构，是以键值对的形式来存储，用 es6里 map

```javascript
// 3 Longest Substring Without Reeating Characters

var lengthOfLongestSubstring = function(s) {
 let map = new Map();
 max = 0, l = 0; // 左边是从0 开始的
 for(let i = 0; i < s.length; i++) {
  if(map.has(s[i]) && map.get(s[i]) >= l) { // 此时表示已经存在了// 那么我要走什么样的逻辑呢
   l = map.get(s[i]) + 1; 
  }
  max = Math.max(max, i - l +1);
  map.set(s[i], i)
 }
 return max;
}

// l的赋值，我应该列举什么列子？
// lengthOfLongestSubstring('pwwkep')， if 里的条件
```
**延伸数据结构集合**：一种无序且唯一的数据结构，用 es6里的 map

```javascript
// 219 Contains Duplicate II

var containsNearbyDuplicate = function(nums, k) {
 const set = new Set();
 for(let i = 0; i < nums.length; i++) {
  if(set.has(nums[i])) {
   return true;
  }
  set.add(nums[i]);
  if(set.size > k) {
   set.delete(nums[i - k]);
  }
 }
 return false;
}

// 以这个示例为例，再加断点演示
// containsNearbyDuplicate([1,3,2,4,1,2], 3);
```

## 3.链表

- [3.1](#3.1)<a name="3.1"></a> **概念**：1、多个元素组成的列表，2、元素存储不连续，用next指针连在一起
**数组 vs 链表**：1、数组：增删非首尾元素时往往需要移动元素，2、链表：增删非首尾元素，不需要移动元素，只需要更改next的指向即可。

- [3.2](#3.1)<a name='3.2'></a> 设立链表的虚拟头节点

```js
// 可以和反转列表（206）进行对比，为什么要设立虚拟头节点
// 203. Remove Linked List Elements
// 先是正确答案（还在考虑要不要自己写），然后我们再进行改造
var removeElements = function(head, val) {
 let p = new ListNode(0);
 p.next = head;
 let cur = p;
 while(cur.next) {
  if(cur.next.val === val) { // 这样的话会有什么问题
   cur.next = cur.next.next;
  } else {
  cur = cur.next;
  }
 }
  return p.next;
};
```

- [3.3](#3.2)<a name="3.3"></a> 链表和双指针问题

```js
// 这个先过掉吧
// 19. Remove Nth Node From End of List
// 或者就是直接给出答案
var removeNthFromEnd = function(head, n) {
// 照视频思路 然后写一下答案
 let q = new ListNode(0);
 q.next = head;
 let p = q;
 let res = p;
 for(let i = 0; i < n + 1; i++) {
  q = q.next;
 }
 while(q) {
  q = q.next;
  p = p.next;
 }
 p.next = p.next.next;
 return res.next;
};

// 比如总共有7个数，删除倒数第二个结点
// q 结点 和 p 结点 一开始相同
// q 结点往前移动2个位置， p 节点要从开始位置移动第5个位置，
// p 删除第五个元素后面的元素，其实也是倒数第二个结点
```

## 4.栈

- [4.1](#4.1)<a name="4.1"></a> **栈**：后进先出，javascript没有栈，但是可以用Array 实现栈的所有功能。
`[].push()` `[].pop()` **队列**：先进先出，也可以用Array实现栈的所有功能。`[].push()` `[].shift()`

- [4.2](#4.2)<a name="4.2"></a> 栈的基础应用

```javascript
// 20. valid Parentheses 有效括号问题
// 自己是要实现一遍的
var isValid = function(s) {
// 自己实现一遍吧 // 用栈的方法
 if(s.length === 1) return false;
 let leftArr = ['{', '[', '('];
 let rightArr = ['}', ']', ')'];
 let left = [];
 for(let item of s) {
 // 遇到右括号就取出栈顶元素 进行比对，然后删除掉
  if(leftArr.includes(item)) {
   left.unshift(item);
  } else {
   let i = rightArr.indexOf(item);
   console.log(leftArr[i], left[0]);
   if(leftArr[i] === left[0]) {
    left.shift();
   } else {
    return false;
   }
  }
 }
 return left.length === 0;
};
```
- [4.3](#4.3)<a name="4.3"></a> 栈和递归的紧密关系

```javascript
// 144 前序遍历
// 用栈自己实现
var preorderTraversal = function(root) {
// 二叉树的前序遍历 改用栈的实现方式 // 根 左 右
 let res = [], stack = [];
 if(root) stack.push(root);
 while(stack.length) {
// 取出栈顶的第一个元素
  let n = stack.pop(); // 一定是要取出最新的，所以只能是用pop;
  res.push(n.val);
  if(n.right) stack.push(n.right);
  if(n.left) stack.push(n.left);
 }
 return res;
};
```

## 5.树

### 5.1 二叉树
- [5.1.1](#5.1.1)<a name="5.1"></a> **二叉树**：树中每个节点最多只能有两个子节点
- [5.1.2](#5.1.2) **广度优先遍历**：先访问离根最近的节点
- [5.1.3](#5.1.3) **深度优先遍历**：尽可能深的搜索分支
- [5.1.4](#5.1.4) **前中后序遍历**：**前**：1、 访问根结点 2、 对根节点的左子树进行先序遍历。3、 对根节点的右子树进行先序遍历。 后面同理

前序遍历的递归版和非递归版

```javascript
// 144 前序遍历递归版
var preorderTraversal = function(root) {
// 二叉树的前序遍历
 let res = [];
 var dfs = function(n) {
  if(!n) return; 
  res.push(n.val);
  if(n.left) dfs(n.left);
  if(n.right) dfs(n.right);
 }
 dfs(root);
 return res;
};
// 144 前序遍历非递归版用栈
var preorderTraversal = function(root) {
// 二叉树的前序遍历 改用栈的实现方式 // 根 左 右
 let res = [], stack = [];
 if(root) stack.push(root);
 while(stack.length) {
// 取出栈顶的第一个元素
  let n = stack.pop(); // 一定是要取出最新的，所以只能是用pop;
  res.push(n.val);
  if(n.right) stack.push(n.right);
  if(n.left) stack.push(n.left);
 }
// 
 return res;
};

// 同理中后序递归版遍历类似于前序递归遍历，而非递归版自己可以思考下
```

有关广度和深度遍历示例

```javascript
// 112 路径总和 // 典型的深度遍历列题
var hasPathSum = function(root, targetSum) {
 if(!root) return false;
 let res = false;
 const dfs = (n, s) => {
  if(!n.left && !n.right && s === targetSum) {
  res = true;
 }
  if(n.left) dfs(n.left, s + n.left.val);
  if(n.right) dfs(n.right, s + n.right.val);
 }

 dfs(root, root.val)
 return res;
};
// 111 二叉树的最小深度 // 广度
var minDepth = function(root) {
// 广度优先遍历
 let stack = [[root, 1]];
// if(!root) return 0;
 while(stack.length) {
  let [n, l] = stack.shift();
  if(!n) { return 0 }
  if(!n.left && !n.right) {
   return l;
 }
  if(n.left) stack.push([n.left, l+1]);
  if(n.right) stack.push([n.right, l+1]);
 }
};
```

### 5.2 最小堆的实现
- [5.2.1](#5.2.1) **概念**：堆是一种特殊的完全二叉树 **完全二叉树**：每层节点都完全填满，如果最后一层没有填满，则是缺少右边节点 **最大堆vs最小堆** 所有节点都大于等于（最大堆）或小于等于（最小堆）它的子节点

- [5.2.2](#5.2.2) **实现最小堆步骤**：
1. 在类里，声明一个数组，用来装元素 
2. 主要方法：插入、删除堆顶、获取堆顶、获取堆大小
3. 备注：如果将二叉树按照广度优先遍历的顺序，并将顺序依次存入数组，子父节点位置和下标存在一定的关系

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  getParentIndex(i) {
    return Math.floor((i-1)/2);
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  shiftUp(index) {
    if(index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if(this.heap[parentIndex] > this.heap[index]) {
      // 执行交换操作
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if(this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index)
      this.shiftDown(leftIndex);
    }
    if(this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  // 删除堆顶
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0)
  }
  // 获取堆顶
  peek() {
    return this.heap[0];
  }
  // 获取堆的大小
  size() {
    return this.heap.length;
  }
}

const heap = new MinHeap();

heap.insert(3);
heap.insert(2);
heap.insert(1);
heap.pop();
```

   最小堆应用：

```javascript
// 215 数组中的第K个最大元素
class MinHeap {
  constructor() {
    this.heap = [];
  }
  getParentIndex(i) {
    return Math.floor((i-1)/2);
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  shiftUp(index) {
    if(index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if(this.heap[parentIndex] > this.heap[index]) {
      // 执行交换操作
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if(this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index)
      this.shiftDown(leftIndex);
    }
    if(this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  // 删除堆顶
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0)
  }
  // 获取堆顶
  peek() {
    return this.heap[0];
  }
  // 获取堆的大小
  size() {
    return this.heap.length;
  }
}
var findKthLargest = function(nums, k) {
    const h = new MinHeap();
    nums.forEach((n) => {
        h.insert(n);
        if(h.size() > k) {
            h.pop();
        }
    })
    return h.peek();
}
```

## 6. 排序和查找
冒泡，快排，归并，插入，等等排序，二分查找等，不作过多描述，可以简要讲下思路，这个可以自己搜搜

## 基本算法思想
### 7.1 递归和回溯
- [7.1.1](#7.1.1) **概述特征** 递归回溯是一种暴力解法，因为我们要用递归模拟出所有的可能性，然后在这些所有的可能性里辨别（逻辑）哪些是我们想要的，收集递归到终点符合条件的情况，最后返回结果
- [7.1.2](#7.1.2) **案例分析**

```javascript
// 46 全排列
var permute = function(nums) {
// 自己实现一遍吧 // 你已经是自己有思路的了
 let res = [];
 var backTrack = function(path) {
  if(path.length === nums.length) {
  res.push(path);
 }
 nums.forEach((n) => {
  if(path.includes(n)) { return };
   backTrack(path.concat(n));
  })
 }
 backTrack([])
 return res;
};

```

### 7.2 动态规划
- [7.2.1](#7.2.1) **概述特征**：通过枚举多个，基本上可以总结出一定的规律，最后的结果一般是有多个相同子部分，然后通过反复求解

```javascript
// 经典问题 70 爬楼梯
// 非递归版
var climbStairs = function(n) {
 let dp = [1,1];
 for(let i = 2; i <= n; i++) {
  dp[i] = dp[i-1] + dp[i-2]
 }
 return dp[n];
};
// 递归版 // 会超时
var climbStairs = function(n) {
 if(n < 2) return 1;

 return climbStairs(n-1) + climbStairs(n-2);
};

// ，打家劫舍，斐波那契数列等
```

### 7.3 贪心算法
- [7.3.1](#7.3.1) **概述特征**：期盼通过每个阶段的局部最优选择，从而达到全局的最优

```javascript
// 455 分饼干
var findContentChildren = function(g, s) {
// 自己思考下
// s[j] >= g[i] // 饼干的尺寸值肯定要大于胃口值
// 尽可能满足越多数量的孩子
// 首先对胃口值和尺寸值进行排序
 g.sort((a,b) => a -b);
 s.sort((a,b) => a - b);

 let count = 0;
 for(let i = 0; i < s.length; i++) {
  if(s[i] >= g[count]) {
   count++;
  }
 }
  return count;
};
```

```javascript
// 122 买卖股票的最佳时机 II
var maxProfit = function(prices) {
// 自己思考下吧
 let result = 0;
 for(let i = 1; i < prices.length; i++) {
  result += Math.max(prices[i] - prices[i-1], 0)
 }
 return result;
};
```

最后

以上参考慕课网视频 等

