
[手写new](#手写new)

[手写call](#手写call)


### <a id="手写new">手写 new</a>

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

### <a id="手写call">手写 call</a>

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

### 冒泡排序

+ 冒泡排序 只会操作相邻的两个数据。
+ 每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小要求。如果不满足就让它俩互换

```js
function bubbleSort(arr) {
    if(arr.length <= 1) return arr;

    for(let i = 0; i < arr.length; i++) {
        for(let j = i; j < arr.length; j++) {
            if(arr[j] <= arr[i]) {
                let temp;
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
    return arr;
}
```


### 快速排序

思路：

+ 先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两个部分，依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
+ 左右分别用一个空数组去存储比较后的数据。
+ 最后递归执行上述操作，直到数组长度 <= 1

```js
function quickSort(arr) {
    
    if(arr.length <=1) return arr;
    let index = arr.length/2;
    
    let middleValue = arr.splice(index, 1)

    let left = [];
    let right = [];

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] >= middleValue) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    return quickSort(left).concat(middleValue, quickSort(right))
}
```

### 手写 虚拟 dom

```js
class VNode {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }
}

const h = function (t, p, c) {
  return new VNode(t, p, c)
}
```

[思路过程](./../vue/vue-note.md)


### 手写 深拷贝和浅拷贝

#### 浅拷贝

创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。引用类型属性是共享同一个内存地址。


```js
arr.slice()
arr.concat()
```

实现

```js
var shallowCopy = function(obj) {
    // 只拷贝对象
    if(typeof obj !== 'object') return obj;
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是 obj 的属性才拷贝
    for(var key in obj) {
        if(obj.hasOwnPropery(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj;
}
```

举例说明：

```js
var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]

// 用上面的方法进行拷贝得到 new_arr

var new_arr = shallowCopy(arr);

arr[3][0] = 'old3'

console.log(arr, new_arr) // 发现 arr  和 new_arr  都被改变了
```

#### 深拷贝

将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。引用类型属性不是共用同一个内存地址。


### 第一种方式

```js
JSON.parse(JSON.stringify())
```
存在弊端：

1. 不能拷贝其他引用类型 如 map set
2. 不能拷贝函数
3. 不能循环引用

### 第二种方式

```js
// 再重新默写一下  clone

let arrayTag = '[object Array]';

let setTag = '[object Set]';

let mapTag = '[object Map]';

let objectTag = ['object Object'];

let objTag = [arrayTag, setTag, mapTag, objectTag];

let symbolTag = '[object Symbol]';

function getType(target) {
    return Object.prototype.toString.call(target)
}

function init(target) {
    const Ctor = target.constructor;
    return new Ctor()
}

function clone(target, map = new WeakMap()) {

    // 克隆原始类型

    if(typeof target !== 'object') {
        return target;
    }

    // 初始化

    const type = getType(target);

    let cloneTarget;

    if(objTag.includes(type)) {
        cloneTarget = init(target)
    }


    // 防止循环引用出错

    if(map.get(target)) {
        return map.get(target)
    }

    map.set(target, cloneTarget)

    // 克隆 map

    if(type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map))
        })
        return cloneTarget
    }

     // 克隆 set

    if(type === setTag) {
        target.forEach((value) => {
            cloneTarget.add(clone(value, map))
        })
        return cloneTarget
    }

    // 克隆 symbol

    if(type === symbolTag) {
        return Object(String.prototype.valueOf.call(target))
    }
   
    // 克隆对象和数组
    
    cloneTarget = typeof target === arrayTag ? [] : {};

    for(var key in target) {
        cloneTarget[key] = clone(target[key], map)
    }

    return cloneTarget
}
```

```js
// 测试用例

let map = new Map();

let set = new Set();

let sym = Symbol()

map.set('key', 'value')

set.add('key')


let obj = {
    a: 'a',
    b: [2,3],
    map,
    set,
    sym: sym
}

let res = clone(obj);

console.log(res, 'res')
```

[如何写出一个惊艳面试官的深拷贝](http://www.conardli.top/blog/article/JS%E8%BF%9B%E9%98%B6/%E5%A6%82%E4%BD%95%E5%86%99%E5%87%BA%E4%B8%80%E4%B8%AA%E6%83%8A%E8%89%B3%E9%9D%A2%E8%AF%95%E5%AE%98%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D.html)

[参考文章](https://github.com/mqyqingfeng/Blog/issues/32)

[完整版深拷贝代码参考](https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js)

### 数组拍平

#### 第一种方式

```js
function flat(arr) {
    let res = []

    arr.forEach((item) => {
        if(Array.isArray(item)) {
            res = res.concat(flat(item))
        } else {
            res.push(item)
        }
    })
    return res 
}
```

#### 第二种方式

```js
function flat2(arr, num) {
    return num > 0 ?
        arr.reduce((res, value) => {
            Array.isArray(value) ? res = res.concat(flat2(value, num-1)): res.push(value)
            return res;
        }, [])
    : arr;
}
```

```js
  function flat3(arr, num = 1) {
    return num > 0
    ? arr.reduce(
      (pre, cur) => 
        pre.concat(Array.isArray(cur) ? flat3(cur, num-1): cur), []
    ) : arr.slice();
  }
```

### 数组去重

```js

Array.from(new Set(arr1));

```

```js
function unique(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}
```

### 实现instanceof

typeof 用来检测给定变量的数据类型

typeof 原理：不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位存储其类型信息。

instanceof 可以判断某个实例是否属于某种类型

举例说明

```js
[] instanceof Array; // true
[] instanceof Object; // true
[] instanceof RegExp; // false
new Date instanceof Date; // true
```
instanceof 可以判断一个实例是否是是父类型或者祖先类型的实例

举例说明

```js
function Person() {

}

const xiaoming = new Person();

console.log(auto instanceof Person)  // true
console.log(auto instanceof Object)  // true
```

实现
```js
function _instanceof(L, R) { // L 是左边， R 是右边
    const O = R.prototype;
    L = L.__proto__;
    while(true) {
        if(L === null) return false;
        if(L === O) return true;
        L = L.__proto__;
    }
}
```

### 给定一个字符串数组，请输出先按字符串长度排序，如果长度相等按照ASCII码值排序

例如：`['aaaa', 'bbb', 'cc', 'rrr', 'dd', 'da']`

实现：

```js
let arr = ['aaaa', 'bbb', 'cc', 'rrr', 'dd', 'da']

const res = arr.sort((a,b) => {
    if(a.length > b.length) {
        return 1;
    }
    if(a.length < b.length) {
        return -1;
    }
    if(a.length === b.length) {
        for(var s in a) {
            if(a.charCodeAt(s) > b.charCodeAt(s)) {
                return 1;
            } else {
                return -1;
            }
            return 0;
        }        
    }
})

console.log(res) // [ 'cc', 'da', 'dd', 'bbb', 'rrr', 'aaaa' ]
```


### 给定一个字符串，请统计字符串中出现最多的字母和次数

例如：`aaaabbaa`

```js
let strArr = [];
let numArr = [];

function getRes(str) {
    for(var s of str) {
        if(strArr.includes(s)) {
            let i = strArr.indexOf(s);
            numArr[i] ++;
        } else {
            strArr.push(s);
            numArr.push(1);
        }
    }
    let resObj = []

    numArr.map((item, index) => {
        resObj.push({str: strArr[index], num: item})
    })

    resObj.sort((a,b) => b.num - a.num)
    
    return resObj[0]   // { str: 'a', num: 6 }
}
```

### 数字千分位

js 实现

```js
function transformNum(num) {
    // 如果有小数，要保留小数
    // 转成 string
    let strNum = num.toString();
    let index = strNum.indexOf('.');

    // 末尾数是.34
    let rightStr = strNum.slice(index);

    // 前面的进行分割
    let leftStr = strNum.slice(0, index);
    let leftArr = leftStr.split('').reverse();

    // 每隔三位加一个逗号，并且还要是倒过来的
    let str = ''

    for(let i = 0; i < leftArr.length; i++) {
        if((i+1)%3 === 0 && i !== leftArr.length -1) {
            str = str + leftArr[i] + ','
        } else {
            str = str + leftArr[i]
        }
    }

    return str.split('').reverse().join('') + rightStr
}
```

正则表达式实现

```js
function transformNum1(num) {
    let parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+$)/g, ',')
    return parts.join('.')
}
```

调用全局方法

```js
function formatNumber2(num) {
  const parts = num.toString().split('.');
  parts[0] = Number(parts[0]).toLocaleString()
  return parts.join('.')
}
```

### 最长不含重复字符的子字符串

```js
function getRes(str) {
    let arr = [];
    let lenObjArr = []

    for(let s of str) {
        if(arr.includes(s)) {
            lenObjArr.push(arr.join(''))
            arr = []
        } else {
            arr.push(s)
        }
    }
    lenObjArr.push(arr.join(''))

    lenObjArr.sort((a,b) => b.length - a.length)

    return lenObjArr[0]
}

console.log(getRes('abcdefgeeegbeedgef')) // 'abcdefg'
```


### 简单的验证回文 leetcode 125

实现

```js
var isPalindrome = function(s) {
    const str =  s.replace(/[^0-9a-zA-Z]+/g, '').toLowerCase();
    const len = str.length;
    
    for(let i = 0;  i < parseInt(len/2); i++) {
        console.log(str[i], str[len - i -1])
        if(str[i] !== str[len - i -1]) {
            return false
        }
    }
    return true;
}
```

第二种简便解法

```js
var isPalindrome = function(s) {
    let strArr = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase().split('');
    return strArr.join('') === strArr.reverse().join('');
}
```

### 验证回文字符串II leetcode 680

给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

实现

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
      const str =  s.replace(/[^0-9a-zA-Z]+/g, '').toLowerCase();
    const len = str.length;
    
    for(let i = 0;  i < parseInt(len/2); i++) {
        if(str[i] !== str[len - i -1]) {
            let arr = str.split('');
            let arr2 = str.split('');

            arr.splice(i, 1)
            arr2.splice(len - i - 1, 1)

            return arr.join('') === arr.reverse().join('') || arr2.join('') === arr2.reverse().join('')
        }
    }
    return true;
}
```

### 路径总和 leetcode 112

```js

```

### 二叉树找指定和的路径  剑指offer 34

```js

```







