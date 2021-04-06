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

#3-88-合并两个有序数组

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

#2-215-数组中的第K个最大元素   难度-中等

思路：简单，排序取k-1位置的元素

实现：

```js
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a );
    return nums[k-1]
}
```

#3-112-路径总和

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

#4-53-最大子序和

思路： 找到最大和的连续子数组，返回其最大和

居然没哟思路，一点都没有

#5-1-两数之和

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

#6-209-长度最小的子数组

概述：长度最小的连续子数组，其总大于等于target

思路：

实现：

```js
var minSubArrayLen = function(target, nums) {

};
```

#7-129-求根到叶子节点数字之和

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

#8-165-比较版本号

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

#9-102-二叉树的层序遍历

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

#10-230-二叉搜索树中第K小的元素

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

#11-141-环形链表

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

#12-剑指 Offer 22.链表中倒数第k个节点

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

#13-93-复制ip地址

概述，给一串字符串，返回所有有效的ip 地址集合

我觉得这个好难啊

```js

```