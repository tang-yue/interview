听慕课网玩转算法视频并记录笔记。

虚拟焦点是如何做的呢？自己深入研究下。

5月20日   上午11点

和对应几个案例我觉得就可以了吧，多个视频都观看然后再糅合到一起就好了吧。

5月21日

按照别人的文档格式，进行排版。

## 复杂度分析

### 时间复杂度：

#### 概念

定性描述该算法的运行时间，用O(f(n))  这样表示。

#### 什么是大O

n 表示数据规模；O(f(n)) 表示运行算法所需要执行的指令数，和f(n）成正比。
比如： O(logn) 所需执行指令数：a * logn，随着 n 的数量级增加，指令数是被 f(n) 所控制

#### 常见的代码复杂度分析

```js
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

// O(n平方)

for(let i = 0; i < n; i += 1) {
    for(let j = 0; j < n; j += 1) {
        console.log(i, j)
    }
}

// ？？如何是下面这样呢？

for(let i = 0; i < n; i += 1) {
    for(let j = 0; j < 20; j += 1) {
        console.log(i, j)
    }
}

// O(logn)

function binarySearch(arr, target) { 
  let l = 0; r = arr.length - 1;
  while(l <= r) {
    let mid = parseInt((l + r)/2,  10) // l + (r-l)/2  可以避免整型溢出
    if(arr[mid] === target) return mid;
    if(arr[mid] > target) r = mid -1;
    else l = mid + 1;
  }
  return -1;
}

// ??

function intToString(num) {
  let s = '';
  while(num) {
    s += num%10;
    num = parseInt(num/10, 10);
  }
  return s;
}

// ??

function hello(n) {
  for(let i = 1; i < n; i += i) {
    for(let j = 1; j < n; j ++) {
      console.log(i, j)
    }
  }
}

// ?? O(sqrt(n))

function isPrime(n) {
  for(let i = 2; i * i <= n; i++) {
    if(n*x === 0) return false;
    return true;
  }
}

```
递归算法的复杂度分析

关注点：1、递归的调用的次数 2、递归深度 3、在每个递归函数中，做的其他事情的时间复杂度 假设为 T  ===> 最后的时间复杂度就是 O(T * depth)

// 待todo 等到看完之后再考虑要不要将这部分给加进去。

## 数组

基本数组
```js
// 二分查找 左闭右闭 or 左闭右开

// 283. Move Zeros
var moveZeroes = function(nums) {
  let len = nums.length;
  let count = 0;
  for(var i = 0; i < len; i++) {
    if(nums[i - count] === 0) {
      nums.splice(i-count, 1);
      nums.push(0);
      count++;
    }
  }
  return nums;
}
// 第二种解法
// 时间复杂度O(n) 空间复杂度为O(1)
var moveZeroes = function(nums) {
  let k = 0;
  for(let i = 0; i < nums.length; i++) {
    if(nums[i]) {
      nums[k++] = nums[i]
    }
  }
  for(let i = k; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
}

// 27 remove element
var removeElement = function(nums, val) {
    // 删除后nums的长度
    let len = nums.length;
    let count = 0;
    for(let i = 0; i < len; i++) {
        if(nums[i-count] === val) {
            nums.splice(i-count, 1);
            count++;
        }
    }
    return nums.length;
};

// 26

// 80
```
三路快排

```js
// 75 Sort Colors
// 三路快排法，先过掉吧，继续往下看
// 88 Merge Sorted Array
// 215 Kth Largest Element in an Array

```

对撞指针

```js
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
// 125 Valid Palindrome
// 344 Reverse String
// 345 Reverse Vowels of a String
// 11 Container With Most Water
```
滑动窗口

```js
// 209 Minimum Size Subarray Sum
// 我的答案
var sum = function(l, r, nums) {
    let sum = 0;
    for(let i = l; i <= r; i++) {
        sum = sum + nums[i]
    }
    return sum;
}
var minSubArrayLen = function(target, nums) {
    // 用滑动窗口来解决这个问题 // 先自己想下思路
    let min = nums.length + 1, l = 0;
    for(let i = 0; i < nums.length; i++) {
        // 感觉自己很是没有耐心啊
        if(sum(l, i, nums) >= target) {
            min = Math.min(min, i - l +1);
            l++; i--;
        }
    }
    return min === nums.length + 1 ? 0 : min;
};
// 视频讲解答案
// 还可以进一步简化
var minSubArrayLen = function(target, nums) {
  let l = 0, r = -1; // nums[l...r]为我们的滑动窗口
  let sum = 0;
  let res = nums.length +1;
  while(l < nums.length) {
    if(r +1 < nums.length && sum < target) {
      sum += nums[++r];
    } else {
      sum -= nums[l++]
    }
    if(sum >= target) {
      res = Math.min(res, r-l +1);
    }
  }
  if(res === nums.length + 1) {
    return 0;
  }
  return res;
}
// 3 Longest Substring Without Reeating Characters
// 在一个字符串中寻找没有重复字母的最长子串
// 自己的
var lengthOfLongestSubstring = function(s) {
  let map = new Map();
  let max = 0, l = 0; // 左边是从0 开始的
  for(let i = 0; i < s.length; i++) {
    if(map.has(s[i]) && map.get(s[i]) >= l) {   // 此时表示已经存在了// 那么我要走什么样的逻辑呢
      l = map.get(s[i]) + 1; // 这里我总是犯错
    }
    max = Math.max(max, i - l +1);
    map.set(s[i], i)
  }
  return max;
}
// 视频的解法先过掉
// 438 Find all Anagrams in a string
// 76 Minimum Window Substring
```

第四章

4-1 set 的使用问题

```js
// 349 Intersection of Two Arrays
// 先过掉吧. // 而且不是js写的

```
4-2 map的使用问题

```js
// 350 Intersection of Two Arrays ||
// 过掉吧
// 之后用 js 自己实现一遍就好了
```
4-3  视频没有
4-4 使用查找表的经典问题

```js
// 1、 Two sum
// 过掉吧，因为自己实现了，和167题类似
// 15、3 Sum
// 18、4 sum
// 16、3Sum Closet
```
4-5 灵活选择键值 4 sum II
```js
// 454. 4 Sum II
// 感觉这个要循环很多次啊 // 感觉即使听了也可能听不懂，先过掉吧

```
4-6 灵活选择键值
```js
// 447. Number of Boomerangs
// 先过掉
```

4-7 查找表和滑动窗口
```js
// 219 Contains Duplicate II
// 自己先思考下吧

```

4-8 二分搜索树底层实现的顺序性

```js

```




## 数据结构
## 疑问记录

1、 2-1 中字母排序为什么是 slogs 呢（s 指的是 字母的长度）
2、 数组有序，那么可以用二分查找