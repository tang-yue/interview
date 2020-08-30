### 1、 求和路径

给定一个棵二叉树，其中。。。。。

放弃不会写

### 2、 求平方根，不用 Math

解法一：
现成的 sqrt 函数

```
var mySqrt = function(x) {
  return parseInt(Math.sqrt(x))
}
```
解法二：
最耿直的自增暴力解

var mySqrt = function(x) {
  var re = 0;
  while(!(re * re <=x && (re+1) * (re+1)> x)) {
    re++;
  }
  return re
}

### 3、防抖函数和节流函数

```
// 防抖函数
// 疯狂点击按钮，每次点击的时间间隔都小于规定时间，那么相应的方法不会执行
// 应用场景：

function debounce (fn, wait=300) {
    var timer
    return function () {
      if (timer) {
        clearTimeOut(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments) 
      }, wait)
    }
}

// 节流函数
// 疯狂点击按钮，规定的时间间隔只触发一次相应的方法

function throttle (fn, wait=300) {
  var prev = +new Date()
    return function () {
      var now = +new Date()
      if（now - prev >= 300) {
         fn.apply(this, arguments)
         prev = now
      }
    }
}
```

### 4、写一个深拷贝

#### 浅拷贝

Object.assign()

arr.slice()

arr.concat()

#### 深拷贝

`JSON.parse(JSON.stringify(object))`

需要兼容 set、map、symbol、object

放弃

[参考文章](https://github.com/ConardLi/awesome-coding-js/blob/master/JavaScript/%E6%B5%85%E6%8B%B7%E8%B4%9D%E5%92%8C%E6%B7%B1%E6%8B%B7%E8%B4%9D.md)

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

### queryString 分析器

接受一个url字符串作为参数，返回一个对象，这个对象包含query string.


### 函数柯里化

函数柯里化：一个接受 任意多个参数的函数，如果执行的时候传入的参数不足，那么它会返回新的函数，新的函数会接受剩余的参数，直到所有参数都传入才执行操作。

思路：

如果你固定某些参数，你将得到接受余下参数的一个函数

参考答案：

```
const curry = (fn, arr = []) => {
  return (...args) => {
    if([..arr, ...args].length === fn.length) {
      // fn.length 表示函数接受的参数个数
      return fn(...arr, ...args)
    } else {
      return curry(fn, [..arr, ...args])
    }
  }
}
```
[思考思路参考文章](https://zhuanlan.zhihu.com/p/31271179)

### 青蛙跳阶

假设一个台阶有n 阶，一次可以跳一阶，也可以跳两阶，请问有多少种跳法

有1阶    f(1) =  1
有两阶    f(2) = 1  2
有三阶    f(3) = 1  21  12
有四阶    f(4) = 1  22  112 121 112
有五阶    f(5) = 1  221 122 212 2111 1211 1112 1121 

通过上述类推得出思路

另一种思路

先令f(n) 为n级台阶的总跳法数，那么第一次如果选择跳一级的话，那么剩下的n-1级台阶的跳法
就为f(n-1)，如果第一次跳两级的话，那么剩下的n-2级台阶的跳法就是f(n-2)。所以n级台阶就有
f(n) = f(n-1) + f(n-1)

```js
// 时间复杂度为 O(n)
function fibonacci(n) {
  if(n > 2) {
    return fibonacci(n-1) + fibonacci(n-2)
  } else {
    return n
  }
}
```

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

### 快排序，冒泡排序

#### 快排

思路：

+ 先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两个部分，依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
+ 左右分别用一个空数组去存储比较后的数据。
+ 最后递归执行上述操作，直到数组长度 <= 1

```js
function quickSort(arr) {
  // 首先确定一个基准值
  if(arr.length <= 1) return arr;
    let index = arr.length/2;
    let arrVal = arr.splice(index, 1); // 删除掉了arr里的一个值
    let middle = arrVal[0]
    let right = [];
    let left = [];

    for(let i = 0; i < arr.length; i++) {
      if(arr[i] > middle) {
        right.push(arr[i])
      } else {
        left.push(arr[i])
      } 
    }
    // 因为之前中间值被删掉了，所以要加回来。
    return quickSort(left).concat(middle, quickSort(right))
  }
```

#### 冒泡排序

```js
// 未优化
const bubbleSort = arr => {
  const length = arr.length;
  if(length <= 1) return;
  // i < length -1 是因为外层只需要 length -1 次就排好了，第length 次比较是多余的
  for(let i = 0; i < length -1; i++) {
    for(let j = 0; j < length - i -1;  j++) {
      if(arr[j] > arr[j+1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp
      }
    }
  }
}
```

思路：

+ 冒泡排序 只会操作相邻的两个数据。
+ 每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小要求。如果不满足就让它俩互换

```js
// 已优化
// 只支持从下到大排
const bubbleSort1 = (arr) => {
  const length = arr.length;
  if(length <= 1) return arr;
  for(let i = 0; i < length - 1; i++) {
    for(let j = 0; j < length - 1 - i; j++) {
      var hasChange = false
      if(arr[j+1] < arr[j]) {
        hasChange = true
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
    if(!hasChange) break;
  }
  return arr;
}
```

[参考文章](https://github.com/biaochenxuying/blog/issues/39)
[参考文章](https://zhuanlan.zhihu.com/p/74900761)


### 手写promise.all

[参见](../promise/api-promise-all.js)


### 手写 call, bind, apply


> 手写 call

思路:

1. 判断当前this是否为函数，防止 Function.prototype.myCall() 直接调用
2. context 为可选参数，如果不传的话默认上下文为 window
<!-- 3.  -->

```js
Function.prototype.myCall = function(context = window, ...args) {
  if(this === Function.prototype) {
    return undefined;
  }
  context = context || window;
  const fn = Symbol(); // 纯属为了定义fn
  context[fn] = this
  const result = context[fn](...args);
  delete context[fn];
  return result;
}
// 测试
var value = 2;
var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.myCall(nlll);   // 2

console.log(bar.myCall(obj, 'name', 18))
```
[参考](https://github.com/ConardLi/awesome-coding-js/blob/master/JavaScript/%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0call%E3%80%81apply%E3%80%81bind.md)