手写 coding

### 手写 new

实现思路：

1. new 的结果是一个对象，也是实例，
2. 该实例可以访问到构造函数里的属性，
3. 也可以访问到 Func.prototype 中的属性。
4. 构造函数可能是有返回值对象，构造函数可能返回一个null

```js
function NEW() {
    let construct = [].shift.call(arguments)

    let obj = Object.create(construct.prototype)   // 继承方法

    let result = construct.apply(obj, arguments)   // 继承属性

    return typeof result === 'object' ? result || obj : obj
}
```

[参考文章](https://juejin.im/post/6844903956859060231)

[参考文章](https://github.com/yy9306/yy9306.github.io/issues/3)

### 手写 call

实现思路：

```js
// 显示的将 this 绑定到 obj 上
count.call(obj, 1, 1);    
count.apply(obj, [1, 1]);  
```

1. 将 count 函数变成obj的一个属性方法
2. 执行完后，并删除
3. 获取参数，然后带参数执行
4. obj 可能会是 null，count函数会有返回值

```js
Function.prototype.call = function(context) {
    let context = context || window;

    context.fn = this;
    
    let args = [];

    for(let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    
    let result = context.fn(...args)

     delete context.fn
    
    return result;
}
```

[参考文章](https://github.com/mqyqingfeng/Blog/issues/11)

### apply

与 call 类似

```js
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;

    context.fn = this;
    
    var result;
    
    if(!arr) {
        result = context.fn()
    } else {
        var args = [];
        for (let i = 1; i < arr.length; i++) {
            args.push(arguments[i])
        }
        result = context.fn(...args)
    }
    delete context.fn;

    return result;
}
```

### 手写 bind

实现思路：

1. 返回函数， 关于this值的指向 和call，apply 一样
2. 可以传入参数
3. 构造函数效果的模拟实现：bind 返回的函数作为构造函数的时候，bind 时指定的this 值会失效，但传入的参数依然生效。

例子

```js
var foo = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18')

// 1
// daisy
// 18
```

```js
Function.prototype.bind = function(context) {
    // 调用bind 的不是函数 怎么办
    if (typeof this !== 'function') {
        throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
    }

    var self = this;

    // 获取 bind2 函数 从第二个参数到最后一个参数，并转成数组
    var args = Array.prototype.slice.call(arguments, 1);

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        // this instanceof fBound 这个比较好
        // 当作为构造函数， this 指向实例，此时结果为 true, 将绑定函数的this 指向该实例，可以让实例获得来自绑定函数的值
        // 当作为普通函数时， this 指向 window, 此时结果为 false，将绑定函数 的this 指向 context
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }
    // fBound.prototype = this.prototype; // 直接修改fBound.prototype 的时候， 也会直接修改绑定函数的 prototype。这个时候，通过一个空函数来中转下
    var fNOP = function () {}
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP()

    return fBound;
}
```

[参考文章](https://github.com/mqyqingfeng/Blog/issues/12)

### 手写 Object.create

```js
Object.create = function(o) {
    function f() {}
    f.prototype = o;
    return new f;
}
```

### debounce 函数

```js
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
```

### throttle 函数

```js
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


