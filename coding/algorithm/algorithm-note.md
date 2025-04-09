刷题

1. 刷题网站：推荐使用 LeetCode.
2. 刷题顺序：推荐按照类型刷题，相当于集中训练
3. 重点关注：通用套路，时间/空间复杂度分析和优化。

## 概念

### 时间复杂度

1、一个函数，用大 O 表示，比如 O(1)、O(n)、O(logN)....

2、定性描述该算法的运行时间

大小顺序：n 的 2 次方 > n > logN > 1

```js
for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n; j += 1) {
    console.log(i, j);
  }
}
```

上述如果有两次 for 循环，那么时间复杂度为 n 的 2 次方

```js
let i = 1;
while (i < n) {
  console.log(i);
  i *= 2;
}
```

上述这样的话，那么时间复杂度为 O(logN)

### 空间复杂度

1、一个函数，用大 O 表示，比如 O(1)、O(n)、O(n^2) .....
2、算法在运行过程中临时占用存储空间大小的量度

```js
let i = 0;
i += 1;
```

因为它只声明了单个变量，单个变量所占用内存永远是 1，因为是横定的变量。 O(1)

```js
const list = [];
for (let i = 0; i < n; i += 1) {
  list.push(i);
}
```

上述代码，空间复杂度为 O(n)

```js
const matrix = [];
for (let i = 0; i < n; i += 1) {
  matrix.push([]);
  for (let j = 0; j < n; j += 1) {
    matrix[i].push(j);
  }
}
```

上述代码，二维数组空间复杂度为 n 的二次方

### 栈是什么？

1. 一个后进先出的数据结构
2. JavaScript 中没有栈，但是可以用 Array 实现栈的所有功能

十进制转二进制

有效的括号 问题

思路：

1. 越靠后的左括号，对应的右括号越靠前。
2. 左括号入栈，右括号出栈，最后栈空了就是合法的。

函数调用堆栈

leetcode 20. 有效的括号

解题步骤

- 新建一个栈。
- 扫描字符串，遇到左括号入栈，遇到和栈顶括号类型匹配的右括号就出栈，类型
  不匹配直接判定为不合法。
- 最后栈空了就合法，否则不合法。

实现

```js
var isValid = function (s) {
  if (s.length % 2 === 1) {
    return false;
  }
  const stack = [];
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    // 遇到左括号
    if (c === "(" || c === "{" || c === "[") {
      stack.push(c);
    } else {
      const t = stack[stack.length - 1];
      if (
        (t === "(" && c === ")") ||
        (t === "{" && c === "}") ||
        (t === "[" && c === "]")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
```

3-4 JS 中函数调用堆栈

3-5 leetcode 144. 二叉树的前序遍历

```js
// 根左右
var preorderTraversal = function (root) {
  const res = [];
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const n = stack.pop();
    res.push(n.val);
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
  return res;
};
```

3-6 栈-章节总结

技术要点

1. 栈是一个后进先出的数据结构
2. JavaScript 中没有栈，但可以用 Array 实现栈的所有功能
3. 栈常用操作：push、pop、stack[stack.length -1]

3-7 阶段思考题

1. 使用 ES6 封装 Stack 类
2. 用栈这个数据结构，将 100 这个十进制转为二进制

```js
class Stack {
  constructor() {
    this.stack = [];
  }
  push(val) {
    this.stack.push(val);
  }
  pop() {
    return this.stack.pop();
  }
  peek() {
    const len = this.stack.length;

    if (len === 0) {
      return null;
    } else {
      return this.stack[len - 1];
    }
  }
}
```

### 队列是什么？

1. 一个先进先出的数据结构
2. JavaScript 中没有队列，但可以用 Array 实现队列的所有功能

4-2 什么场景用队列

1. 需要先进先出的场景
2. 比如： 食堂排队打饭， JS 异步中的任务队列，计算最近请求次数

4-3 leetCode 933. 最近的请求次数

解题步骤

1. 有新请求就入队，3000ms 前发出的请求出队
2. 队列的长度就是最近请求次数

```js
var RecentCounter = function () {
  this.q = [];
};

RecentCounter.prototype.ping = function (t) {
  this.q.push(t);
  while (this.q[0] < t - 3000) {
    this.q.shift();
  }
  return this.q.length;
};
```

4-4 前端与队列： JS 异步中的任务队列

4-5 队列-章节总结

技术要点

1. 队列是一个先进先出的数据结构
2. JavaScript 中没有队列，但可以用 Array 实现队列的所有功能
3. 队列常用操作：push shift queue[0]

### 链表是什么？

1. 多个元素组成的列表
2. 元素存储不连续，用 next 指针连在一起

数组 vs 链表

1. 数组：增删非首尾元素时往往需要移动元素。
2. 链表：增删非首尾元素，不需要移动元素，只需要更改 next 的指向即可。

5-2 leetcode 237 删除链表中节点

解题思路:

1. 无法直接获取被删除节点的上个节点。
2. 将被删除节点转移到下个节点

```js
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
```

5-3 leetCode: 206 反转链表

解题思路：

1. 反转两个节点：将 n+1 的 next 指向 n。

解题步骤

1. 双指针一前一后遍历链表
2. 反转双指针

```js
var reverseList = function (head) {
  let p1 = head;
  let p2 = null;
  while (p1) {
    const tmp = p1.next;
    p1.next = p2;
    p2 = tmp;
    // p1 = tmp;
  }
  return p2;
};
```

5-4 leetCode：2 两数相加

解题思路：

1. 小学数学题，模拟相加操作。
2. 需要遍历链表

```js
var addTwoNumbers = function (l1, l2) {
  const l3 = new ListNode(0);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let carry = 0;
  while (p1 || p2) {
    const v1 = p1 ? p1.val : 0;
    const v2 = p2 ? p2.val : 0;
    const val = v1 + v2 + carry;
    carry = Math.floor(val / 10);
    p3.next = new ListNode(val % 10);
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
    p3 = p3.next;
  }
  if (carry) {
    p3.next = new ListNode(carry);
  }
  return l3.next;
};
```

5-5 leetCode 83 删除排序链表中的重复元素

解题步骤：

1. 遍历链表，如果发现当前元素和下个元素值相同，就删除下个元素值
2. 遍历结束后，返回原链表的头部

```js
var deleteDuplicates = function (head) {
  let p = head;
  while (p && p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return head;
};
```

5-6 leetcode 141. 环形链表

解题思路

1. 两个人在圆形操场上的起点同时起跑，速度快的人一定会超过速度慢的人一圈。
2. 用一快一慢两个指针遍历链表，如果指针能够相逢，那么链表就有圈。
3. 慢指针一次走一步，快指针一次走两步，如果指针能够相逢代表有圈。

解题步骤

1. 用一快一慢两个指针变遍历链表，如果指针能够相逢，就返回 true。
2. 遍历结束后，还没有相逢就返回 false.

```js
var hasCycle = function (head) {
  let p1 = head;
  let p2 = head;
  while (p1 && p2 && p2.next) {
    p1 = p1.next; // 慢指针
    p2 = p2.next.next; // 快指针
    if (p1 === p2) {
      // 重复
      return true;
    }
  }
  return false;
};
```

5-7 前端与链表： JS 中的原型链

5-8 前端与链表： 使用链表指针获取 JSON 的节点值

```js
const json = {
  a: { b: { c: 1 } },
  d: { e: 2 },
};
const path = ["a", "b", "c"];

let p = json;

path.forEach((k) => {
  p = p[k];
});
```

5-9 链表-章节总结

技术要点

1. 链表里的元素存储不是连续的，之间通过 next 连接
2. JavaScript 中没有链表，但可以用 Object 模拟链表
3. 链表常用操作：修改 next、遍历链表

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

1. 用集合对 nums1 去重。
2. 遍历 nums1，筛选出 nums2

```js
var intersection = function (nums1, nums2) {
  return [...new Set(nums1)].filter((n) => nums2.includes(n));
};
```

6-3 前端与集合：使用 ES6 中 Set

Set 操作

1. 使用 Set 对象： new、add、delete、has、size
2. 迭代 Set：多种迭代方法、Set 与 Array 互转、求交集/差集

6-4 集合章节总结

同上

6-5 阶段思考

1. 在你的实际工作中使用集合完成一次去重操作
2. 了解数据库中的 join 操作符吗？ inner join 属于集合中的哪个操作

### 字典是什么？

1. 与集合类似，字典也是一种存储唯一值的数据结构，但它是以键值对的形式来存储的
2. ES6 中有字典，名为 Map
3. 字典的常用操作：键值对的增删改查

leetCode 349. 两个数组的交集

解题步骤

1. 新建一个字典，遍历 nums1，填充字典。
2. 遍历 nums2，遇到字典里的值就选出，并从字典中删除

```js
var intersection = function (nums1, nums2) {
  const map = new Map();
  nums1.forEach((n) => {
    map.set(n, true);
  });
  const res = [];
  nums2.forEach((n) => {
    if (map.get(n)) {
      res.push(n);
      map.delete(n);
    }
  });
  return res;
};
```

leetCode 20. 有效的括号

```js
var isValid = function (s) {
  if (s.length % 2 === 1) {
    return false;
  }
  const stack = [];
  const map = new Map();
  map.set("(", ")");
  map.set("{", "}");
  map.set("[", "]");
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    // 遇到左括号
    if (map.has(c)) {
      stack.push(c);
    } else {
      const t = stack[stack.length - 1];
      if (map.get(t) === c) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
```

7-4 leetCode： 1. 两数之和

解题步骤

1. 新建一个字典作为婚姻介绍所。
2. nums 里的值，逐个来介绍所找对象，没有合适的就先登记着，有合适的就牵手成功。

```js
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const n2 = target - n;
    if (map.has(n2)) {
      return [map.get(n2), i];
    } else {
      map.set(n, i);
    }
  }
};
```

// 上述的题目有点问题呀，如果改成用 forEach 去遍历，居然会返回 undefined

7-5 leetcode 3 无重复字符的最长子串

题目描述：给定一个字符串，请你找出其中不含有重复字符的最长子串的长度
解题思路

1. 先找出所有的不包含重复字符的子串
2. 找出长度最大的那个字串，返回其长度即可

解题步骤

1. 用双指针维护一个滑动窗口，用来剪切子串。
2. 不断移动右指针，遇到重复字符，就把左指针移动到重复字符的下一位

```js
var lengthOfLongestSubstring = function (s) {
  let l = 0;
  let res = 0;
  const map = new Map();
  for (let r = 0; r < s.length; r += 1) {
    if (map.has(s[r]) && map.get(s[r]) >= l) {
      // 并且这个值必须在滑动窗口里面，也就是说这个值的位置应该大于等于左指针
      l = map.get(s[r]) + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(s[r], r);
  }
  return res;
};
```

7-6 leetcode 76. 最小覆盖子串

解题步骤

1. 用双指针维护一个滑动窗口。
2. 移动右指针，找到包含 T 的字串，移动左指针，尽量减少包含 T 的子串的长度。
3. 循环上述过程，找出包含 T 的最小子串

```js
var minWindow = function (s, t) {
  let l = 0;
  let r = 0;
  const need = new Map();
  for (let c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }
  let needType = need.size;
  let res = "";
  while (r < s.length) {
    const c = s[r];
    if (need.has(c)) {
      need.set(c, need.get(c) - 1);
      if (need.get(c) === 0) needType -= 1;
    }
    while (needType === 0) {
      const newRes = s.substring(l, r + 1);
      if (!res || newRes.length < res.length) res = newRes; // 找到最小长度的res
      const c2 = s[l];
      // 移动左指针的时候，会把需要的字符给移动出去了，因此我们要从右边进行替补，所以need里面就要加上这个字符。
      if (need.has(c2)) {
        need.set(c2, need.get(c2) + 1);
        if (need.get(c2) === 1) needType += 1;
      }
      l += 1;
    }
    r += 1;
  }
  return res;
};

// 时间复杂度： O(m+n)，m是t的长度，n是s的长度。

// 空间复杂度：O(m)
```

7-7 字典--章节总结

技术要点

1. 与集合类似，字典也是一种存储唯一值的数据结构，但它是以键值对的形式来存储。
2. ES6 中有字典，名为 Map。
3. 字典的常用操作：键值对的增删改查。

### 什么是树？

1. 一种分层数据的抽象模型
2. 前端工作中常见的树包括：DOM 树，级联选择、树形控件...
3. JS 中没有树，但是可以用 Object 和 Array 构建树。
4. 树的常用操作：深度/广度优先遍历、先中后序遍历

8-2 深度与广度优先遍历

深度优先遍历：尽可能深的搜索树的分支。

类似于看书

按照顺序，先看第一个标题里的第一章，然后多个小结，，然后再看第二章

广度优先遍历：先访问离根节点最近的节点

先看标题，然后看目录，然后看第一个目录里的小结

深度优先遍历算法口诀：

1. 访问根节点。
2. 对根节点的 children 挨个进行深度优先遍历。

代码见 tree/dfs.js

广度优先遍历算法口诀：

1. 新建一个队列，把根节点入队。
2. 把队头出队并访问。
3. 把对头的 children 挨个入队。
4. 重复第二、三步，直到队列为空。

代码见 tree/bfs.js

8-3 二叉树的先中后序遍历

二叉树是什么？

树中每个节点最多只能有两个子节点。

先序遍历算法口诀：

1. 访问根结点
2. 对根节点的左子树进行先序遍历。
3. 对根节点的右子树进行先序遍历。

代码见 tree/preorder.js

中序遍历算法口诀：

1. 对根节点的左子树进行中序遍历。
2. 访问根节点
3. 对根节点的右子树进行中序遍历。

代码见 tree/inorder.js

后序遍历算法口诀：

1. 对根节点的左子树进行后序遍历。
2. 对根节点的右子树进行后序遍历。
3. 访问根节点

其实有前，中，后，层，垂序遍历

代码见 tree/postorder.js

8-4 二叉树的先中后序遍历 （非递归版）

代码见 tree 下面的 inorder.js postorder.js preorder.js

8-5 leetCode 104 二叉树的最大深度

解题思路

1. 求最大深度，考虑使用深度优先遍历。
2. 在深度优先遍历过程中，记录每个节点所在的层级，找出最大的层级即可。

解题步骤

1. 新建一个变量，记录最大深度。
2. 深度优先遍历整棵树，并记录每个节点的层级，同时不断刷新最大深度这个变量。
3. 遍历结束返回最大深度这个变量。

```js
var maxDepth = function (root) {
  let res = 0;
  const dfs = (n, l) => {
    if (!n) {
      return;
    }
    if (!n.left && !n.right) {
      res = Math.max(res, l); // 记录层级并不断刷新
    }
    dfs(n.left, l + 1);
    dfs(n.right, l + 1);
  };
  dfs(root, 1);
  return res;
};
```

8-6 LeetCode: 二叉树的最小深度 111

解题思路：

1. 求最小深度，考虑使用广度优先遍历。
2. 在广度优先遍历过程中，遇到叶子节点，停止遍历，返回节点层级。

解题步骤：

1. 广度优先遍历整棵树，并记录每个节点的层级。
2. 遇到叶子节点，返回节点层级，停止遍历。

```js
var minDepth = function (root) {
  if (!root) {
    return 0;
  }
  const q = [[root, 1]];
  let res = 0;
  while (q.length) {
    const [n, l] = q.shift(); // 先进先出
    if (!n.left && !n.right) {
      return l;
    }
    if (n.left) q.push([n.left, l + 1]);
    if (n.right) q.push([n.right, l + 1]);
  }
};
```

8-7 leetCode 二叉树的层序遍历 102

解题步骤

1. 广度优先遍历二叉树
2. 遍历过程中，记录每个节点的层级，并将其添加到不同的数组中。

第一种方法

```js
var levelOrder = function (root) {
  if (!root) return [];
  const q = [[root, 0]];
  const res = [];
  while (q.length) {
    const [n, level] = q.shift();
    if (!res[level]) {
      res.push([n.val]);
    } else {
      res[level].push(n.val);
    }
    if (n.left) q.push([n.left, level + 1]);
    if (n.right) q.push([n.right, level + 1]);
  }
  return res;
};
```

第二种方法

```js
var levelOrder = function (root) {
  if (!root) return [];
  const q = [root];
  const res = [];
  while (q.length) {
    let len = q.length;
    res.push([]);
    while (len--) {
      const n = q.shift();
      res[res.length - 1].push(n.val);
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
  }
  return res;
};
```

8-8 leetCode： 94 二叉树的中序遍历

递归版

```js
var inorderTraversal = function (root) {
  const res = [];
  const rec = (n) => {
    if (!n) return;
    rec(n.left);
    res.push(n.val);
    rec(n.right);
  };
  rec(root);
  return res;
};
```

非递归版

```js
var inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let p = root;

  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    res.push(n.val);
    p = n.right;
  }
  return res;
};
```

8-9 LeetCode：路径总和 112

解题思路：

1. 在深度优先遍历的过程中，记录当前路径的节点值的和。
2. 在叶子节点处，判断当前路径的节点值的和是否等于目标值。

```js
var hasPathSum = function (root, sum) {
  if (!root) return false;
  let res = false;
  const dfs = (n, s) => {
    if (!n.left && !n.right && s === sum) {
      res = true;
    }
    if (n.left) dfs(n.left, s + n.left.val);
    if (n.right) dfs(n.right, s + n.right.val);
  };
  dfs(root, root.val);
  return res;
};

// 时间复杂度和空间复杂度 都是  O(n)
```

8-10 前端与树：遍历 JSON 的所有节点值

代码见 tree/json.js

8-11 前端与树：渲染 Antd 中的树组件

```js
class Demo extends React.Component {
    dfs = (n) => {
        return (
            <TreeNode title={n.title} key={n.key}>
                {n.children.map(this.dfs)}
            </TreeNode>
        )
    }
    render() {
        return <Tree>{json.map(this.dfs))}</Tree>
    }
}
```

8-12 树-章节总结

1. 树是一种分层数据的抽象模型，在前端广泛应用。
2. 树的常用操作：深度/广度优先遍历，先中后序遍历......

### 图是什么

1. 图是网络结构的抽象模型，是一组由边连接的节点
2. 图可以表示任何二元关系，比如道理，航班.....
3. JS 中没有图，但是可以用 Object 和 Array 构建图。
4. 图的表示法：邻接矩阵，邻接表，关联矩阵....

图的常用操作

1. 深度优先遍历
2. 广度优先遍历

9-2 图的深度广度优先遍历

深度优先遍历算法口诀

1. 访问根节点
2. 对根节点的`没访问过的相邻`节点挨个进行深度优先遍历 // 如果访问过的可能会陷入死循环

代码见 graph/dfs.js

广度优先遍历算法口诀

1. 新建一个队列，把根节点入队。
2. 把队头出队并访问。
3. 把队头的没访问过的相邻节点入队。
4. 重复第二、三步，直到队列为空。

9-3 leetCode：65. 有效数字

解题步骤

1. 构建一个表示状态的图。
2. 遍历字符串，并沿着图走，如果到了某个节点无路可走就返回 false.
3. 遍历结束，如走到 3/5/6，就返回 true，否则返回 false。

```js
var isNumber = function (s) {
  const graph = {
    0: { blank: 0, sign: 1, ".": 2, digit: 6 },
    1: { digit: 6, ".": 2 },
    2: { digit: 3 },
    3: { digit: 3, e: 4 },
    4: { digit: 5, sign: 7 },
    5: { digit: 5 },
    6: { digit: 6, ".": 3, e: 4 },
    7: { digit: 5 },
  };

  let state = 0;
  for (c of s.trim()) {
    if (c >= "0" && c <= "9") {
      c = "digit";
    } else if (c === " ") {
      c = "blank";
    } else if (c === "+" || c === "-") {
      c = "sign";
    }
    state = graph[state][c];
    if (state === undefined) {
      return false;
    }
  }
  if (state === 3 || state === 5 || state === 6) {
    return true;
  }
  return false;
};
```

9-4 LeetCode: 417 太平洋大西洋水流问题

解题步骤

1. 把矩阵想象成图。
2. 从海岸线逆流而上遍历图，所到之处就是可以流到某个大洋的坐标。

解题步骤

1. 新建两个矩阵，分别记录能流到两个大洋的坐标。
2. 从海岸线，多管齐下，同时深度优先遍历图，过程中填充上述矩阵。
3. 遍历两个矩阵，找出能流到两个大洋的坐标。

```js
var pacificAtlantic = function (matrix) {
  if (!matrix || !matrix[0]) {
    return [];
  }
  const m = matrix.length;
  const n = matrix[0].length;
  const flow1 = Array.from({ length: m }, () => new Array(n).fill(false));
  const flow2 = Array.from({ length: m }, () => new Array(n).fill(false));

  console.log(flow1);

  const dfs = (r, c, flow) => {
    flow[r][c] = true;
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([nr, nc]) => {
      if (
        // 保证在矩阵中
        nr >= 0 &&
        nr < m &&
        nc >= 0 &&
        nc < n &&
        // 防止死循环
        !flow[nr][nc] &&
        // 保证逆流而上
        matrix[nr][nc] >= matrix[r][c]
      ) {
        dfs(nr, nc, flow);
      }
    });
  };

  // 沿着海岸线逆流而上
  for (let r = 0; r < m; r += 1) {
    dfs(r, 0, flow1); // 太平洋
    dfs(r, n - 1, flow2); // 大西洋
  }
  for (let c = 0; c < n; c += 1) {
    dfs(0, c, flow1);
    dfs(m - 1, c, flow2);
  }
  // 收集能流到两个大洋里的坐标
  const res = [];
  for (let r = 0; r < m; r += 1) {
    for (let c = 0; c < n; c += 1) {
      if (flow1[r][c] && flow2[r][c]) {
        res.push([r, c]);
      }
    }
  }
  return res;
};

// 时间复杂度和空间复杂度 都是 m * n
```

9-5 leetCode：克隆图 133

解题步骤

1. 深度或广度优先遍历所有节点
2. 拷贝所有的节点，存储起来
3. 将拷贝的节点，按照原图的连接方法进行连接

深度遍历

```js
var cloneGraph = function (node) {
  if (!node) return;
  const visited = new Map();
  const dfs = (n) => {
    const nCopy = new Node(n.val);
    visited.set(n, nCopy);
    (n.neighbors || []).forEach((ne) => {
      if (!visited.has(ne)) {
        dfs(ne);
      }
      nCopy.neighbors.push(visited.get(ne));
    });
  };
  dfs(node);
  return visited.get(node);
};

// 时间复杂度和空间复杂度都是 O(n)
```

9-6 图-章节总结

### 什么是堆？

1. 堆是一种特殊的完全二叉树

完全二叉树：每层节点都完全填满，如果最后一层没有填满，则是缺少右边节点。

2. 所有的节点都大于等于（最大堆）或小于等于（最小堆）它的子节点。

js 中的堆

1. JS 中通常用数组表示堆
   下述的 2，3，4 是有条件的：将该二叉树按照广度优先遍历的顺序，并将顺序值依次存入数组，会有如下的规律
2. 左侧子节点的位置是 2 \* index + 1.
3. 右侧子节点的位置是 2 \* index + 2.
4. 父节点位置是(index -1)/2;

堆的应用

1. 堆能高效、快速地找出最大值和最小值，时间复杂度： O(1)
2. 找出第 K 个最大（小）元素

第 K 个最大元素

1. 构建一个最小堆，并将元素依次插入堆中。
2. 当堆的容量超过 k，就删除堆顶。
3. 插入结束后，堆顶就是第 K 个最大元素。

10-2 JavaScript 实现： 最小堆类

实现步骤

1. 在类里，声明一个数组，用来装元素。
2. 主要方法：插入、删除堆顶、获取堆顶、获取堆大小。

插入方法

1. 将值插入堆的底部，即数组的尾部。
2. 然后上移：将这个值和它的父节点进行交换，直到父节点小于等于这个插入的值
3. 大小为 k 的堆中插入元素的时间复杂度为 O(logk).

代码见 heap/MinHeap.js

删除堆顶

1. 用数组尾部元素替换堆顶 (直接删除堆顶会破坏堆结构)。
2. 然后下移：将新堆顶和它的子节点进行交换，直到子节点大于等于这个新堆顶。
3. 大小为 k 的堆中删除堆顶的时间复杂度为 O(logK)。

代码见 heap/MinHeap.js

10-3 LeetCode 数组中的第 K 个最大元素 215

解题步骤

1. 构建一个最小堆，并依次把数组的值插入堆中。
2. 当堆的容量超过 K, 就删除堆顶。
3. 插入结束后，堆顶就是第 K 个最大元素。

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }
  res() {
    return this.heap;
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    // return Math.floor((i - 1) / 2);  // 获取该节点的父节点的位置
    return (i - 1) >> 1;
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex); // 因为要一直上移，所以这里递归调用
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

var findKthLargest = function (nums, k) {
  const h = new MinHeap();
  nums.forEach((n) => {
    h.insert(n);
    if (h.size() > k) {
      h.pop();
    }
  });
};

// 时间复杂度 O(n * log k)

// 空间复杂度 O(k)   // 维持了k大小的堆
```

10-4 LeetCode 347 前 K 个高频元素

```js
var topKFrequent = function (nums, k) {
  const map = new Map();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  const list = Array.from(map).sort((a, b) => b[1] - a[1]);
  return list.slice(0, k).map((n) => n[0]);
};
```

上述解法时间复杂度 O (n \* log n) 不符合题目要求

使用堆解决

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }
  res() {
    return this.heap;
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    // return Math.floor((i - 1) / 2);  // 获取该节点的父节点的位置
    return (i - 1) >> 1;
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].value > this.heap[index].value
    ) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex); // 因为要一直上移，所以这里递归调用
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].value < this.heap[index].value
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].value < this.heap[index].value
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

var topKFrequent = function (nums, k) {
  const map = new Map();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  const h = new MinHeap();
  map.forEach((value, key) => {
    h.insert({ value, key });
    if (h.size() > k) {
      h.pop();
    }
  });
  return h.heap.map((a) => a.key);
};

// 时间复杂度
// 上面的 for 循环是 O(n) 下面的for 循环是 O(n * log k)  最终的时间复杂度是 O(n * log k)

// 空间复杂度
// 上面的 map 是 O(n)  下面的堆 是 O(k)  最终的空间复杂度为  O(n)
```

10-5 LeetCode: 23. 合并 K 个排序链表

解题思路

1. 新链表的下一个节点一定是 k 个链表头中的最小节点
2. 考虑选择使用最小堆

解题步骤

1. 构建一个最小堆，并依次把链表头插入堆中。
2. 弹出堆顶接到输出链表，并将堆顶所在链表的新链表头插入堆中
3. 等堆元素全部弹出，合并工作就完成了。

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }
  res() {
    return this.heap;
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    // return Math.floor((i - 1) / 2);  // 获取该节点的父节点的位置
    return (i - 1) >> 1;
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].val > this.heap[index].val
    ) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex); // 因为要一直上移，所以这里递归调用
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].val < this.heap[index].val
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].val < this.heap[index].val
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    if (this.size() === 1) return this.heap.shift();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
    return top;
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

var mergeKLists = function (lists) {
  const res = new ListNode(0);
  let p = res;
  const h = new MinHeap();
  lists.forEach((l) => {
    if (l) h.insert(l);
  });

  while (h.size()) {
    const n = h.pop();
    p.next = n;
    p = p.next;
    if (n.next) h.insert(n.next);
  }
  return res.next;
};

// 时间复杂度 O (n * logk)  主要就是 while 循环内部
// 空间复杂度 O (k)   变量堆
```

10-6 堆-章节总结

技术要点

1. 堆能高效，快速地找出最大值和最小值，时间复杂度： O(1)。
2. 找出第 K 个最大 (小) 元素。

### 排序和搜索是什么？

1. 排序： 把某个乱序的数组变成升序或者降序的数组。
2. 搜索： 找出数组中某个元素的下标。
3. JS 中 排序： 数组的 sort 方法
4. JS 中 排序： 数组的 indexOf 方法

11-2 JavaScript 实现: 冒泡排序

visualgo.net 观看算法的动画

时间复杂度 O(n 的二次方)

代码见 sort/bubbleSort.js

11-3 JavaScript 实现: 选择排序

先确定一个最小值
然后比较找到最小值，然后和一开始确定的最小值的下标进行交换，
上述执行 n-1 轮

时间复杂度 O(n 的二次方)

代码见 sort/selectionSort.js

11-4 JavaScript 实现: 插入排序

1. 从第二个数开始往前比。
2. 比它大就往后排。
3. 以此类推进行到最后一个数。

时间复杂度 O (n 的 2 次方)

代码见 sort/insertionSort.js

11-5 JavaScript 实现：归并排序

归并排序的思路

1. 分：把数组劈成两半，再递归地对子数组进行 "分" 操作，直到分成一个个单独的数。
2. 合：把两个数合并为有序数组，再对有序数组进行合并，直到全部子数组合并为一个完整数组。

合并两个有序数组

1. 新建一个空数组 res，用于存放最终排序后的数组。
2. 比较两个有序数组的头部，较小者出队并推入 res 中。
3. 如果两个数组还有值，就重复第二步。

代码见 sort/mergeSort.js

1. 分的时间复杂度是 O(logN).
2. 合的时间复杂度是 O(n).
3. 又因为分和合是嵌套的关系，所以最后的时间复杂度是： O(n \* logN).

11-6 JavaScript 实现：快速排序

快速排序的思路

1. 分区：从数组中任意选择一个"基准"，所有比基准小的元素放在脊椎前面，比基准大的元素放在脊椎的后面。
2. 递归地对基准前后的子数组进行分区

代码见 sort/quickSort.js

时间复杂度

1. 递归的时间复杂度是 O(log N).
2. 分区操作的时间复杂度是 O (n).
3. 时间复杂度：O(n \* logN).

11-7 JavaScript 实现：顺序搜索

代码见：search/sequentialSearch.js

时间复杂度为 O(n)

11-8 JavaScript 实现：二分搜索

思路：

1. 从数组的中间元素开始，如果中间元素正好是目标值，则搜索结束。
2. 如果目标值大于或者小于中间元素，则在大于或小于中间元素的那一半数组中搜索。

代码见：search/binarySearch.js

时间复杂度：每一次比较都使搜索范围缩小一半，时间复杂度 O(logN)

11-9 LeetCode：合并两个有序链表 21

解题思路：

1. 与归并排序中的合并两个有序数组很相似
2. 将数组替换成链表就能解此题

解题步骤：

1. 新建一个新链表，作为返回结果。
2. 用指针遍历两个有序链表，并比较两个链表的当前节点，较小者先接入新链表，并将指针后移一步。
3. 链表遍历结束，返回新链表

```js
var mergeTwoLists = function (l1, l2) {
  const res = new ListNode(0); // 注意如果直接写成 p = new ListNode(0) 是不对的
  let p = res;
  let p1 = l1;
  let p2 = l2;
  while (p1 && p2) {
    if (p1.val < p2.val) {
      p.next = p1;
      p1 = p1.next;
    } else {
      p.next = p2;
      p2 = p2.next;
    }
    p = p.next;
  }
  if (p1) {
    p.next = p1;
  }
  if (p2) {
    p.next = p2;
  }
  return res.next;
};
// 时间复杂度 O(m+n)
// 空间复杂度 O(1)
```

11-10 LeetCode：猜数字大小 374

```js
var guessNumber = function (n) {
  let low = 1;
  let high = n;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const res = guess(mid);
    if (res === 0) {
      return mid;
    } else if (res === 1) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
};

// 时间复杂度 O(log N)
// 空间复杂度 O(1)
```

11-11 排序与搜索---章节总结

### 分而治之是什么？

1. 分而治之是算法设计中的一种方法。
2. 它将一个问题分成多个和原问题相似的小问题，递归解决小问题，再将结果合并以解决原来的问题。

场景一：归并排序

1. 分：把数组从中间一分为二。
2. 解：递归地对两个子数组进行归并排序。
3. 合：合并有序子数组。

场景二：快速排序

1. 分：选基准，按基准把数组分成两个子数组。
2. 解：递归地对两个子数组进行快速排序。
3. 合：对两个子数组进行合并。

12-2 LeetCode：猜数字大小

解题步骤：

1. 分：计算中间元素，分割数组。
2. 解：递归地在较大或者较小子数组进行二分搜索。
3. 合：不需要此步，因为在子数组中搜到就返回了。

采用的是递归版

```js
var guessNumber = function (n) {
  const rec = (low, high) => {
    if (low > high) {
      return;
    }
    const mid = Math.floor((low + high) / 2);
    const res = guess(mid);
    if (res === 0) {
      return mid;
    } else if (res === 1) {
      return rec(mid + 1, high);
    } else {
      return rec(1, mid - 1);
    }
  };
  return rec(1, n);
};

// 时间复杂度 O(logN)   因为一分为二，不停地分
// 空间复杂度 O(logN)   具体的空间复杂度是多少，那要看我们的递归堆栈有多少层
```

12-3 LeetCode: 翻转二叉树 226

解题思路

1. 先翻转左右子树，再将子树换个位置。
2. 符合 "分、解、合" 特性。
3. 考虑选择分而治之

解题步骤

1. 分：获取左右子树。
2. 解：递归地翻转左右子树。
3. 合：将翻转后的左右子树换个位置放到根节点上。

```js
var invertTree = function (root) {
  if (!root) {
    return null;
  }
  return {
    val: root.val,
    left: invertTree(root.right),
    right: invertTree(root.left),
  };
};

// 时间复杂度：树的每个节点都访问到了，所以是 O(n)
// 空间复杂度：我们这是堆栈，递归，O(h)， h 就是，递归的高度就是堆栈的高度就是树的高度
```

12-4 LeetCode： 100. 相同的树

解题步骤

1. 分：获取两个树的左子树和右子树。
2. 解：递归地判断两个树的左子树是否相同，右子树是否相同。
3. 合：将上述结果合并，如果根节点的值也相同，树就相同。

```js
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (
    p &&
    q &&
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  ) {
    return true;
  }
  return false;
};

// 时间复杂度  O(n)
// 空间复杂度  O(n)
```

12-5 LeetCode： 对称二叉树 101

解题步骤

1. 分：获取两个树的左子树和右子树。
2. 解：递归地判断树 1 的左子树和树 2 的右子树是否镜像，树 1 的右子树和树 2 的左子树是否镜像。
3. 合：如果上述都成立，且根节点也相同，两个树就镜像。

```js
var isSymmetric = function (root) {
  if (!root) return true;
  const isMirror = (l, r) => {
    if (!l && !r) return true;
    if (
      l &&
      r &&
      l.val === r.val &&
      isMirror(l.left, r.right) &&
      isMirror(l.right, r.left)
    ) {
      return true;
    }
    return false;
  };
  return isMirror(root.left, root.right);
};

// 时间复杂度： O(n) 因为递归访问了所有节点
// 空间复杂度：由于我们的递归里面调用了堆栈，所以空间复杂度也是 O(n)，n就是堆的高度，也是树的高度
```

12-6 分而治之 --- 章节总结

应用场景

1. 归并排序
2. 快速排序
3. 二分搜索
4. 翻转二叉树

12-7 阶段思考

### 动态规划是什么？

1. 动态规划是算法设计中的一种方法。
2. 它将一个问题分解为相互重叠的子问题，通过反复求解子问题，来解决原来的问题
3. 而分而治之是将一个问题分解为相互独立的子问题。

13-2 LeetCode：爬楼梯 70

解题步骤

1. 定义子问题：F(n) = F(n-1) + F(n-2)。
2. 反复执行：从 2 循环到 n，执行上述公式。

```js
var climbStairs = function (n) {
  if (n < 2) {
    return 1;
  }
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
// 时间复杂度为 O(n)
// 空间复杂度为 O(n)
```

降低空间复杂度版

```js
var climbStairs = function (n) {
  if (n < 2) {
    return 1;
  }
  let dp0 = 1;
  let dp1 = 1;
  for (let i = 2; i <= n; i++) {
    const temp = dp0;
    dp0 = dp1;
    dp1 = dp1 + temp;
  }
  return dp1;
};

// 时间复杂度为 O(n)
// 空间复杂度为 O(1)
```

13-3 LeetCode：打家劫舍 198

解题思路：

1. f(k) = 从前 k 个房屋中能偷窃到的最大数额 s
2. Ak = 第 k 个房屋的钱数
3. f(k) = max(f(k-2) + Ak, f(k-1))

解题步骤：

1. 定义子问题：f(k) = max(f(k-2) + Ak, f(k-1)).
2. 反复执行：从 2 循环到 n，执行上述公式。

```js
var rob = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  const dp = [0, nums[0]];
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1]);
  }
  return dp[nums.length];
};

// 时间复杂度：O(n)
// 空间复杂度：O(n)
```

降空间复杂度

```js
var rob = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  // const dp = [0, nums[0]];
  let dp0 = 0;
  let dp1 = nums[0];
  for (let i = 2; i <= nums.length; i++) {
    const temp = dp0;
    dp0 = dp1;
    dp1 = Math.max(temp + nums[i - 1], dp0);
  }
  return dp1;
};
```

13-4 动态规划---章节总结

13-5 阶段思考题

### 贪心算法是什么？

1. 贪心算法是算法设计中的一种方法。
2. 期盼通过每个阶段的局部最优选择，从而达到全局的最优。
3. 结果并不一定是最优

场景：

1. 零钱兑换
2. 天龙八部-珍珑棋局

14-2 LeetCode：分饼干 455

解题思路：

1. 局部最优：既能满足孩子，还消耗最少。
2. 先将 “较小的饼干” 分给“胃口最小”的孩子

解题步骤

1. 对饼干数组和胃口数组升序排序。
2. 遍历饼干数组，找到能满足第一个孩子的饼干。
3. 然后继续遍历饼干数组，找到满足第二、三、.....、n 个孩子的饼干

```js
var findContentChildren = function (g, s) {
  const sortFunc = function (a, b) {
    return a - b;
  };
  g.sort(sortFunc);
  s.sort(sortFunc);
  let i = 0;
  s.forEach((n) => {
    if (n >= g[i]) {
      //  满足第一个，然后满足第二个，然后满足第三个
      i += 1;
    }
  });
  return i;
};

// sort 排序  chrome 用的是快排， firefox 用的归并，  最后的时间复杂度 O(n * logN)
// 空间复杂度  O(1)
```

14-3 LeetCode: 买卖股票的最佳时机 II 122

解题思路：

1. 前提：上帝视角，知道未来的价格
2. 局部最优：见好就收，见差就不动，不做任何长远打算。

解题步骤：

1. 新建一个变量，用来统计总利润。
2. 遍历价格数组，如果当前价格比昨天高，就在是昨天买，今天卖，否则就不交易。
3. 遍历之后，返回总利润。

```js
var maxProfit = function (prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      // 如果后者大于前者，那么就前者买，后者卖
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
};

// 时间复杂度为  O(n)
// 空间复杂度为 O(1)
```

14-4 贪心算法--章节总结

14-5 阶段思考

### 什么是回溯算法？

1. 回溯算法是算法设计中的一种方法。
2. 回溯算法是一种渐进式寻找并构建问题解决方式的策略。
3. 回溯算法会先从一个可能的动作开始解决问题，如果不行，就回溯并选择另一个动作，直到将问题解决。

什么问题适合用回溯算法解决？

1. 有很多路。
2. 这些路里，有死路，也有出路。
3. 通常需要递归来模拟所有的路。

场景全排列

解决思路

1. 用递归模拟出所有情况。
2. 遇到包含重复元素的情况，就回溯。
3. 收集所有到达递归终点的情况，并返回。

15-2 LeetCode：46 全排列

解题思路

1. 要求：1、所有排列情况；2、没有重复元素。
2. 有出路，有死路。
3. 考虑使用回溯算法。

```js
var permute = function (nums) {
  const res = [];
  const backtrack = (path) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    nums.forEach((n) => {
      if (path.includes(n)) {
        return;
      }
      backtrack(path.concat(n));
    });
  };
  backtrack([]);
  return res;
};

// 时间复杂度：O(n!), 因为是嵌套的 for循环，而循环每次的次数又都减一
// 空间复杂度：递归的深度，就是数组的长度，即 O(n)
```

上述的代码不错。

15-3 LeetCode：子集 78

解题步骤：

1. 用递归模拟出所有情况。
2. 保证接的数字都是后面的数字。
3. 收集所有到达递归终点的情况，并返回。

```js
var subsets = function (nums) {
  const res = [];
  const backtrack = (path, l, start) => {
    if (path.length === l) {
      res.push(path);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      backtrack(path.concat(nums[i]), l, i + 1); //  保证接的数字都是后面的数字。
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    backtrack([], i, 0);
  }
  return res;
};
// 时间复杂度：O(2的n次方)，因为每个元素都有两种可能 （存在或不村在）
// 空间复杂度：O(n)   即递归的深度，即 nums的长度
```

15-4 章节总结

15-5 课程回顾

1. 数据结构：栈、队列、链表、集合、字典、树、图、堆
2. 算法：链表/树/图的遍历、数组的排序和搜索
3. 算法设计思想：分而治之、动态规划、贪心、回溯。

重点难点

1. 数据结构：所有数据结构都很重要，跟前端最相关的是链表和树
2. 算法：链表/树/图的遍历，数组的排序和搜索...
3. 设计思想：分而治之、动态规划教常考，贪心，回溯次之

经验心得

1. 搞清楚数据结构与算法的特点和应用场景。
2. 用 JS 实现一遍，最好能用第二第三语言再实现一遍。
3. 学会分析时间/空间复杂度
4. 提炼前端和算法的结合点，用于工作实战。

拓展建议

1. 多刷题，最好能保证 300 道以上。
2. 多总结各种套路、模版。
3. 多阅读源码，比如 React、Lodash、V8....
