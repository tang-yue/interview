1、 求和路径

给定一个棵二叉树，其中。。。。。

2、 求平方根，不用 Math

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

3、防抖函数和节流函数

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



