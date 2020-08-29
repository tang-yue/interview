### 1、 求和路径

给定一个棵二叉树，其中。。。。。

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

需要兼容 set、map、symbol、object

放弃


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






