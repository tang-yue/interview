### 手写 ajax

```js
  var Ajax = {
    get: function(url, fn) {
      // XMLHttpRequest对象用于在后台与服务器交换数据   
      var xhr = new XMLHttpRequest();            
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
          // 从服务器获得数据 
          fn.call(this, xhr.responseText);
        }
      };
      xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      // 添加http头，发送信息至服务器时内容编码类型
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
          fn.call(this, xhr.responseText);
        }
      };
      xhr.send(data);
    }
  }
```
### URL 解析

在浏览器环境中，可以a标签

```js
function URLParser(url) {
  const a = document.createElement('a')
  a.href = url;

  return {
    protocol: a.protocol,
    username: a.username,
    password: a.password,
    hostname: a.hostname,
    port: a.prot,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash
  }
}
```

[参考文章1](https://juejin.im/post/6844903697198088199)
[参考文章2](https://www.cnblogs.com/fangsmile/p/11534671.html)

### 获取类型

调用Object原型上未被覆盖的toString() 方法，使用call 来改变this指向来达到我们想要的效果。

function getType(target) {
  return Object.prototype.toString.call(target)
}

### 实现数字千分位 带小数

```js
// 正则表达式实现：
function formatNumber1(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+$)/g, ',')
  return parts.join('.')
}
```

分析： 
- \B 匹配的是非单词边界
- x(?=y) 如果x后面跟的是y,则匹配x。 如字符串xyz中的x会被匹配，而后面的y是不会被匹配的，先行断言

- $ 表示3个，3个之间，结束，不要匹配更多。


[参考文章](https://juejin.im/post/6844903609029623815)

```js
// 调用全局方法
function formatNumber2(num) {
  const parts = num.toString().split('.');
  parts[0] = Number(parts[0]).toLocaleString()
  return parts.join('.')
}
```

```js
// js 实现
  function formatNumber3(num) {
    const parts = num.toString().split('.');
    const partsF = parts[0].split('').reverse();
    let str = ''
    for(let i = 0; i < partsF.length; i=i+3) {
      const c = i + 3;
      if(i < partsF.length -3) {
        str += partsF.slice(i,c).join('') + ','
      } else {
        str += partsF.slice(i,c).join('') + ''
      }
    }
    const remainCount = partsF%3
    const remainCountStr = partsF[0].split('.').slice(0, remainCount)
    return str.split(',').reverse().join() + remainCountStr + '.' + parts[1]
  }
  // 注意点： 分割符，要细心，还有不足3的时候的情况的处理
```

下面解决几道简单小问题。

### 题目1

题目描述：

v1.2.3 v0.3.0  这样的版本号比大小（找简单方法，不要随便写一个循环的版本）

解题思路：

首先是有两个参数，然后解析取数字，并且知道优先级从左到右。

实现：

```js
function compare(v1, v2) {
  let v1_num = Number(v1.slice(1).split('.').join(''))
  let v2_num = Number(v2.slice(1).split('.').join(''))

  
  return v1_num > v2_num;
}

console.log(compare('v1.2.3','v0.3.0'));
```

### 题目3

题目描述：

用 O(n) 的复杂度合并两个有序数组。

实现：

```js
function merge(nums1, nums2) {
    let n1 = nums1.length;
    let n2 = nums2.length;
    let p1 = 0;
    let p2 = 0;
    let res = [];
    while(p1 < n1 && p2 < n2) {
        if(nums1[p1] < nums2[p2]) {
            res.push(nums1[p1])
            p1++;
        } else {
            res.push(nums2[p2])
            p2++;
        }
    }

    if(p1 >= n1) {
        res = res.concat(nums2.slice(p2))
    }
    if(p2 >= n2) {       
        res = res.concat(nums1.slice(2))
    }
    return res;
}
```

### 题目4

题目描述：

数组生成树形结构

给定树形结构

```js
var arr = [
  { id: 1, value: '节点1', p_id: 0 },     //  p_id 代表的是 parent_id
  { id: 2, value: '节点2', p_id: 1 },
  { id: 3, value: '节点3', p_id: 1 },
  { id: 4, value: '节点4', p_id: 2 },
  { id: 5, value: '节点5', p_id: 0 },
  { id: 6, value: '节点6', p_id: 5 },
  { id: 7, value: '节点7', p_id: 6 },
  { id: 8, value: '节点8', p_id: 6 }
]
```

感觉还是有点难度的。

放弃

参考实现：

```js
let getTree = (arr) => {
  return arr.reduce((prev, _) => {
    let finder = arr.find(item => item.id === _.p_id);  // 双重遍历 // 找到 arr里面那些值的id,  且他们存在children 的。
      if(finder) {
        (finder.children || (finder.children = [], finder.children)).push(_)
        prev.every(_ => _.id !== finder.id) && prev.push(finder) // 没有 push 进去过的，push 进去。
      }
      return prev
    }, [])
    .reduce((prev, _, i, arr) => (arr.every(item => item.id !== _.p_id) && prev.push(_), prev), [])
}
```

### 题目5

数组 L 型输出

```js
// L 型输出
var arr = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9']
]

// 输出顺序 1 4 7 8 9 2 5 6 3
```
整体思路：

先取出竖行，找出规律，然后，写代码，再找出横行的规律，然后融合在一起。

实现：

```js
function LInput(arr) {
    if(!Array.isArray(arr)) return;
    let r = arr.length;
    let res = [];
    var number = 1;
    for(let i = r; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        res.push(arr[j][r - i])
      }
      var arrSlice = arr[r - number]&&arr[r - number].slice(number);
  
      res.push(...arrSlice);
      ++number;
    }
    return res;
  }
```

[参考文章](https://blog.csdn.net/weixin_43915035/article/details/109029180)

### 题目6

题目描述：

数组求排列组合

```js
var arr = [
  ['A', 'B', 'C'],
  [1, 2, 3],
  ['X', 'Y', 'Z']
]

// 输出类似 A1X A1Y A1Z
```

感觉和全排列是类似的

实现：

```js
function arrange(arr) {
    let res = [];
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length; j++) {
            for(let p = 0; p < arr.length; p++) {
                res.push(arr[0][i] + arr[1][j] + arr[2][p])
            }
        }
    }
    return res;
  }
```
比较简单

### 题目7

题目描述：

实现一个函数 find(obj, str)，满足

```js
var obj = {a:{b:{c:1}}};

find(obj, 'a.b.c');
find(obj, 'a.d.c');
```

实现:

```js
function find(obj, str) {
    let arr = str.split('.');
  
    // 我觉得是一个递归
    let i = 1;
    let temp = obj[arr[0]]
    while(i < arr.length) {
      if(temp) {
        temp = temp[arr[i]]
      } else {
        return undefined;
      }
      i++;
    }
    return temp;
  }
```
不是很难。

### 题目8

123 instanceof Number;     // false

new Number(123) instanceof Number;   // true

Number(123) instanceof Number;    // false

以上输出打印出什么。
