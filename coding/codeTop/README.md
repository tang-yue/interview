[地址-字节跳动-频度由高到低](https://codetop.cc/#/home)


#1-3-无重复字符的最长子串

思路：考察双指针问题

注意点：1、左指针要从上一个重复的字母位置往后移1位
2、再一次获取的重复值要在左指针的右边或包含

我的答案

```js
var lengthOfLongestSubstring = function(s) {
  let l = 0;
  let count = 0;
  let map = new Map();
  for(let i = 0; i < s.length; i++) {
      if(map.has(s[i]) && map.get(s[i]) >= l) {
          l = map.get(s[i]) + 1
      }
       map.set(s[i], i)
      count = Math.max(count, i - l + 1)
  }
  return count;
};
```

#2-88-合并两个有序数组

思路：nums1的 m个元素conat n个nums2 之后排序

注意点：现实用concat不起作用，后改用push

我的答案

```js
var merge = function(nums1, m, nums2, n) {
    nums1.length = m;
    nums2.length = n;
    for(let i = 0; i < n; i++) {
        nums1.push(nums2[i])
    }
    return nums1.sort((a,b) => a - b);
};
```

#3-215-数组中的第K个最大元素   难度-中等

思路：简单，排序取k-1位置的元素

实现：

```js
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a );
    return nums[k-1]
}
```

#4-112-路径总和

思路：深度遍历，判断的是是否存在，临界点该节点既没有左节点也没有右节点

我的答案

```js
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
```

#5-53-最大子序和

思路： 找到最大和的连续子数组，返回其最大和

居然没哟思路，一点都没有

#6-1-两数之和

思路：简单

我的答案

```js
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0; i < nums.length; i++) {
        if(map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i]
        }
        map.set(nums[i], i)
    }
};
```

#7-209-长度最小的子数组

概述：长度最小的连续子数组，其总大于等于target

思路：

实现：

```js
var minSubArrayLen = function(target, nums) {

};
```

#8-129-求根到叶子节点数字之和

思路：和路径之和差不多，只不过是要带上路径，路径字符串值，number 后相加

我的答案

```js
var sumNumbers = function(root) {
    let res = 0
    const dfs = (n,path) => {
        if(!n.left && !n.right) {
            res = res + Number(path.join(''))
        }
        if(n.left) dfs(n.left, path.concat(n.left.val))
        if(n.right) dfs(n.right, path.concat(n.right.val))
    }
    dfs(root, [root.val])
    return res;
};
```

#9-165-比较版本号

思路：简单，用分割符进行分割，然后相同位置进行比较，无论是大还是小，立即输出

我的答案  用时有点长
```js
var compareVersion = function(version1, version2) {
  let vs1 = version1.split('.');
  let vs2 = version2.split('.');
  let len = vs1.length > vs2.length ? vs1.length : vs2.length;

  for(let i = 0; i < len; i++) {
    let vs1_v = vs1[i] || 0;
    let vs2_v = vs2[i] || 0;

    if(parseInt(vs1_v) > parseInt(vs2_v)) {
      return 1;
    } else if(parseInt(vs1_v) < parseInt(vs2_v)) {
      return -1;
    }
  }
  return 0;
};
```

#10-102-二叉树的层序遍历

思路：二叉树的广度遍历

```js
var levelOrder = function(root) {
 // 自己重新默写一遍吧
    if(!root) return [];
    let q = [[root, 0]];
    let res = [];
    while(q.length) {
        const [n, level] = q.shift();
        if(!res[level]) {
            res.push([n.val])
        } else {
            res[level].push(n.val)
        }
        if(n.left) q.push([n.left, level + 1]);
        if(n.right) q.push([n.right, level + 1])
    }
    return res;
};
```

#11-230-二叉搜索树中第K小的元素

思路：深度遍历所有，将所有值放入数组，然后排序取值

我的答案：

```js
var kthSmallest = function(root, k) {
    let res = []
    const dfs = (n) => {
        res.push(n.val);
        if(n.left) dfs(n.left)
        if(n.right) dfs(n.right)
    }
    dfs(root);
    res.sort((a, b) => a - b);
    return res[k-1];
};
```

#12-141-环形链表

思路：快指针和慢指针，如果两者能够相遇则代表有环

```js
var hasCycle = function(head) {
    let slow = head,
        fast = head;
    
    while(slow !== null && fast && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast) {
            return true
        }
    }
    return false
}
```

#13-剑指 Offer 22.链表中倒数第k个节点

思路：一样的链表问题

1. 遍历单链表，遍历同时得出链表长度N
2. 再次从头遍历，访问至第N - K 个节点为所求节点


```js
var listLength = function(head) {
    let count = 0;
    pCur = head.next;
    while(pCur) {
        count++;
        pCur = pCur.next;
    }
    return count;
}
var getKthFromEnd = function(head, k) {
    let pCur = head;
    let len = listLength(head);
    for(let i = 0; i < len - k + 1; i++) {
        pCur = pCur.next
    }
    return pCur;
};
```

#14-93-复制ip地址

概述，给一串字符串，返回所有有效的ip 地址集合

我觉得这个好难啊，别人的回溯答案

整体思路：截取下一位的时候，可能是1个，也可能是2个，还有可能是3个，判断是否符合条件，符合就留着，不符合就扔掉。

```js
var restoreIpAddresses = function (s) {
  const result = []

  function permute(arr, str) {
    if(arr.length === 3) {
      if(isValid(str)) result.push([...arr, str]);
      return;
    }

    for(let i = 1; i < 4; i++) {
      let subStr = str.slice(0, i);
      if(!isValid(subStr)) continue;
      permute([...arr, subStr], str.slice(i));
    }
  }

  function isValid(str) {
    if(+str > 255 || !str.length) return false;
    if(str.length >= 2 && str[0] === '0') return false;
    return true;
  }

  permute([], s);

  return result.map(x => x.join('.'))
}
```

#15-62-不同路径

思路：这道题考察的是什么呢？

相等于是告诉你  1出现 2次，0 出现1次，有多少种组合
`[1,0]` 
所以我可以以全排列的方式去想这个问题。
```
[1,1,0]
[0,1,1]
[1,0,1]
```
上述实践失败

别人的答案：利用类似于斐波拉契数列的递归思想

```js

```
我已经尝试了很多方法，但是没有效果。我看了下别人的答案

```js
var uniquePaths = function(m, n) {
    const res = [];
    for(let i = 0; i < n; i++) {
        res.push(new Array(m).fill(1));
    }
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            res[i][j] = res[i-1][j] + res[i][j-1]
        }
    }
    return res[m-1][n-1]  
}
```

#16-718-最长重复子数组

概述：最长的子数组（不重复）内容既包含在A数组里也包含在B数组里，且子数组要在原数组中连续，

思路： 感觉这个比较简单，filter

实践结果：如果A里面有两个1，B里面也有两个1，那么重复部分其实是两个1而不是去重后扽一个1, 如果包含了则把该值给去掉，然后再进行比较，发现case `[0,0,0,0,1], [1,0,0,0,0]`不通过

原因是：子数组要在原数组中连续

别人的答案：暴力动态规划解版

```js
var findLength = (A, B) => {
  const m = A.length;
  const n = B.length;
  let dp = [];
  for(let i = 0; i <= m; i++) {
    dp.push(new Array(n+1).fill(0))
  }
  let res = 0;

  for(let i = 1; i <= n; i++) {
    for(let j = 1; j <= m; j++) {
      if(A[i-1] === B[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
        res = Math.max(res, dp[i][j])
      }
    }
  }
  return res;
}
```

#17-46-全排列

思路： 回溯加递归法

我的答案：

```js
var permute = function(nums) {
    let res = [];
    var backtrack = (path) => {
        if(path.length === nums.length) {
            res.push(path)
        } 
        nums.forEach((n) => {
            if(path.includes(n)) return;
            backtrack(path.concat(n))
        })
    }
    backtrack([]);
    return res;
};
```

#18-160-相交链表

概述：返回两个链的相交节点

困惑的地方：我怎么知道 skip 是几呢？ 这个节点相同，节点相同意味着，节点之前或者之后有公共的部分，如果单单是值相同的话是不符合要求的

我的答案：

```js
var getIntersectionNode = function(headA, headB) {
  const l3 = new ListNode(0);
  let p1 = headA;
  let p2 = headB;
  let p3 = l3;
  while(p1) {
      const v1 = p1.val;
      while(p2) {
          const v2 = p2.val;
          if(v1 === v2) {
              l3.next = new ListNode(v1);
          }
          if(p2) p2 = p2.next;
      }
      if(p1) p1 = p1.next;
  }
  return p3.next;
}
```

上述我的答案错误是，理解成值相同了

别人的答案：还是比较容易理解的

```js
var getIntersectionNode = function(headA, headB) {
    // 默写一边别人的简单答案
    let a = headA;
    let b = headB;
    while(a !== b) {
        a = a ? a.next : headA;
        b = b ? b.next : headB;
    }
    return a;
};
```

#19-695-岛屿的最大面积

跳过


#20-226-翻转二叉树

别人的答案：

第一种：

```js
var invertTree = function(root) {
    if(root !== null) {
        const temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
    }
    return root;
};
```

第二种：

#21-200-岛屿的数量

跳过

#22-206-反转链表

思路简单

```js
var reverseList = function(head) {
    // 重新默写一遍
    let p1 = head;
    let p2 = null;
    while(p1) {
        const tmp = p1.next;
        p1.next = p2;
        p2 = p1;  // 本质上是赋值，然后又需要遍历，赋值前还得做些事情
        p1 = tmp;
    }
    return p2;
}
```

#23-剑指 offer 62 圆圈中最后剩下的数字

这道题的思路是什么呢？

官方的答案：看别人的解释倒是能够看懂

```js
function f(n, m) {
  if(n === 1) { return 0 }
  let x = f(n-1, m);
  return (m + x) % n;
}

function lastRemaining(n, m) {
  return f(n, m);
}
```

#24-70-爬楼梯

经典动态规划问题

```js
var memo = [];
 var climbStairs = function(n) {
     if(n <= 2) return n;
     else if (memo[n] > 0) {
         return memo[n];
     }
     memo[n] = climbStairs(n - 1) + climbStairs(n - 2);
    
     return memo[n];
 };
```
另一种解法

```js
var climbStairs = function(n) {
     let dp = [1,1];

    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
 };
```

#25-54-螺旋矩阵

跳过

#26-104-二叉树的最大深度

思路：深度遍历，并不是对称二叉树

我的答案，简单

```js
var maxDepth = function(root) {
    let count = 0;
    if(!root) return count;
    var dfs = function (n, level) {
        if(!n.left && !n.right) {
            count = Math.max(count, level)
        }
        if(n.left) dfs(n.left, level + 1) 
        if(n.right) dfs(n.right, level + 1)
    }
    dfs(root, 1)
    return count;
};
```

#27-15-三数之和

这道题很容易考

思路：我觉得我还是去看别人的题解吧,

根据官方题解改编的js答案

```js
var threeSum = function(nums) {
  let n = nums.length;
  nums.sort((a,b) => a - b);
  let ans = []
  for(let first = 0; first < n; first++) {
    if(first > 0 && nums[first] === nums[first -1]) {
      continue;
    }
    // 第三个数对应的指针初始化指向数组的最右端
    let third = n - 1;
    let target = -nums[first];
    // 枚举 b
    for(let second = first + 1; second < n; second++) {
      // 需要和上一次枚举的数不相同
      if(second > first + 1 && nums[second] == nums[second -1]) {
        continue;
      }
      // 需要保证 b 的指针在 c 的指针的左侧
      while(second < third && nums[second] + nums[third] > target) {
        --third;
      }
      // 如果指针重合，随着 b 后续的增加
      // 就不会有满足 a + b + c = 0 并且 b < c 的 c 了，可以退出循环
      if(second == third) {
        break;
      }
      if(nums[second] + nums[third] === target) {
        ans.push([nums[first], nums[second], nums[third]]);
      }
    }
  }
  return ans;
}
```
#28-121-买卖股票的最佳时机

思路：考察的是贪心算法

贪心算法的本质

我的答案如下：暴力法但是显示超时。

```js
var maxProfit = function(prices) {
   // prices[i] 第i天 股票的价格
   // 没有思路啊
   let max = 0;
   for(let i = 0; i < prices.length; i++) {
    for(let j = i + 1; j < prices.length; j++) {
        max = Math.max(max, prices[j] - prices[i])
    }
   }
   return max;
};
```

正解

思路：第一点卖出的一定是在买进的后面；第二点如果遇到一个比现在的值更小的值，那么果断更新最小值，因为卖出的总是在买入之后，这样利润才会最大。

```js
var maxProfit = function(prices) {
    let maxProf = 0, min = prices[0];
    for(let x of prices) {
        if(min < x) {
            maxProf = Math.max(maxProf, x - min);
        } else {
            min = x;
        }
    }
    return maxProf;
}
```

#29-113-路径总和 II

概述：返回所有根到叶子节点路径，每一条路径和等于目标值

思路：深度遍历二叉树，简单

我的答案：

```js
var pathSum = function(root, targetSum) {
    if(!root) return [];
    let res = [];
    const dfs = (n, path, sum) => {
        if(!n.left && !n.right && sum === targetSum) {
            res.push(path);
        } 
        
        if(n.left) dfs(n.left, path.concat(n.left.val), sum + n.left.val);
        if(n.right) dfs(n.right, path.concat(n.right.val), sum + n.right.val);
    }
    dfs(root, [root.val], root.val)
    return res;
};
```

#30-94-二叉树的中序遍历

概述：给定一个二叉树，返回其中序遍历。

前序遍历： 根左右  先访问根节点，然后遍历左子树，最后遍历右子树
中序遍历： 左根右  先遍历左子树，然后访问根，最后遍历右子树
后序遍历： 左右根  先遍历左子树，然后遍历右子树，最后访问根部


思路：我觉得深度遍历就挺符合的，稍微改变下顺序

我的答案：

```js
var inorderTraversal = function(root) {
    if(!root) return [];
    let res = [];
    const dfs = (n) => {
        if(n.left) dfs(n.left)
        res.push(n.val);
        if(n.right) dfs(n.right)
    }
    dfs(root);
    return res;
};
```

#31-429-N叉树的层序遍历

思路： 想下层序遍历的思路

困惑：这是 n叉树，并且每层会以一个null 分割，但是我没有启发啊

看题解所得：二叉树是有左右两个子节点，那么n 叉树，那就有多个子节点了，

最后综合所得答案

```js
var levelOrder = function(root) {
    // 广度遍历的思路，应该就是入栈，出栈，采用队列的方式吧
    let res = []
    let q = [[root, 0]];
    while(q.length) {
        let p = q.shift();
        const [n, level] = p;
        if(!n) break;
        if(res[level]) {
            res[level].push(n.val)
        } else {
            res[level] = [n.val]
        }
        // 这里要遍历下n的多个子节点
        for(let child of n.children) {
            if(child) q.push([child, level + 1])
        }
    }
    return res;
};
```

#32-56-合并区间



#33-剑指 Offer24-反转链表









