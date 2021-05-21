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

```js
// 二分查找 左闭右闭 or 左闭右开

// 283. Move Zeros


```
## 疑问记录

1、 2-1 中字母排序为什么是 slogs 呢（s 指的是 字母的长度）
2、