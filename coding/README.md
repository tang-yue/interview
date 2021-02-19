
[手写new](#手写new)

[手写call](#手写call)

[apply](#手写apply)


### <a id="手写new">手写 new</a>

实现思路：

1. new 的结果是一个对象，也是实例，
2. 该实例可以访问到构造函数里的属性，
3. 也可以访问到 Func.prototype 中的属性。
4. 构造函数可能是有返回值对象，构造函数可能返回一个null

```js
function NEW() {
    // 取出构造函数
    let construct = [].shift.call(arguments)

    let obj = Object.create(construct.prototype)   // 访问方法

    let result = construct.apply(obj, arguments)   // 让obj拥有Construct中的属性

    return typeof result === 'object' ? result || obj : obj
}
```

延伸知识点：通过new 一个构造函数后，发生了什么。

1. 创建了一个对象
2. 执行构造函数，并且把属性方法设置给了对象
3. 把this的指向指向给对象
4. 将对象的__proto__跟函数的prototype做对应

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
    context = context || window; // context 就是传入的对象obj

    context.fn = this; // 用this就可以获取到方法如上面的count
    
    let args = [];

    // i 要从1开始哦，因为第一个参数是对象
    for(let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    
    let result = context.fn(...args)

     delete context.fn
    
    return result;
}
```

[参考文章](https://github.com/mqyqingfeng/Blog/issues/11)

### <a id="apply">手写 apply</a>

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
        for (let i = 0; i < arr.length; i++) {
            args.push(arr[i])
        }
        result = context.fn(...args)
        // 或者直接是写成 result = context.fn(...arr);
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
        // 下面括号里的arguments，是调用bind函数之后返回的函数里的参数
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

注意点：

1. 当bind返回的函数作为构造函数的时候，bind时指定的this值会失效，但传入的参数依然生效，但是已经指向new 之后的对象了。

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

### 手写双向绑定

```html
    <div>
        <input id="input" />
        <span id="span" class="span"></span>
    </div>
```

```js
    let obj = {}

    var oSpan = document.getElementById('span');
    var oInput = document.getElementById('input');

    oInput.onchange = function (e) {
        obj.data = e.target.value;
    }

    Object.defineProperty(obj, 'data', {
        get: function() {
            return oInput.value
        },
        set: function(newValue) {
            oInput.value = newValue;
            document.getElementById('span').innerHTML = newValue;
        }
    })
```

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

    let cloneTarget = init(target)

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
    // 克隆 symbol 这段代码是可以去掉的，感觉不影响
    if(type === symbolTag) {
        return Object(String.prototype.valueOf.call(target))
    }
   
    // 克隆对象和数组
    
    for(var key in target) {
        cloneTarget[key] = clone(target[key], map)
    }

    return cloneTarget
}
```
注意：仍旧觉得上述的克隆有点问题，应该是些细节问题，待完续

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
// 上述也可写成如下这样

[参考coding文章](https://github.com/yinhaiying/Javascript/blob/master/deep_clone/index1.js)

[如何写出一个惊艳面试官的深拷贝](http://www.conardli.top/blog/article/JS%E8%BF%9B%E9%98%B6/%E5%A6%82%E4%BD%95%E5%86%99%E5%87%BA%E4%B8%80%E4%B8%AA%E6%83%8A%E8%89%B3%E9%9D%A2%E8%AF%95%E5%AE%98%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D.html)

[参考文章](https://github.com/mqyqingfeng/Blog/issues/32)

[完整版深拷贝代码参考](https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js)

### 手写发布--订阅模式

```js
class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(eventName, callback) {
        if(this.events[eventName]) {
            this.events[eventName].push(callback)
        } else {
            this.events[eventName] = [callback]
        }
    }

    // 以上 on 是正确的
    
    off(eventName, callback) {
        if(this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter((cb) =>  {cb !== callback} )
        }
    }
    // 

    once(eventName, callback) {
        const one = (...args) => {
            callback.apply(this, args)
            this.off(eventName, callback)
        }
        this.on(eventName, one)
    }

    emit(eventName, callback) {
        if(this.events[eventName]) {
            this.events[eventName].forEach((cb) => {
                cb();
            })
        }
    }
}

const execute = new EventEmitter();

execute.on('失恋', () => { console.log('心情不好') })

execute.emit('失恋')

execute.once('one', () => { console.log('我只执行一次的')})

// execute.emit('失恋')

execute.off('失恋', () => { console.log('心情不好') })

execute.emit('one')

execute.emit('失恋')

execute.emit('失恋')
```

### 手写 jsonp

```js
function jsonp(url, data, callback) {
    let dataStr = ''
    dataStr + = url.indexOf('?') === -1 ? '?' : '&'

    for(var key in data) {
        dataStr += key + '=' + data[key] + '&'
    }

    let cb_name = 'jsonpCallback'

    dataStr += 'callback=' + cb_name;

    let scriptBody = document.createElement('script');

    scriptBody.src = url  + dataStr;
    
    window[callbackName] = function (data) {
        callback(data)
        document.body.removeChild(scriptBody)   // 这步出错了
    }
    document.body.appendChild(scriptBody);   // 这步也出错了
}
```

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

function sortLetter(arr) {
    return arr.sort(function(a, b) {
        if(a.length === b.length) {
            for(var s in a) {
                if(a.charCodeAt(s) > b.charCodeAt(s)) {
                    return 1;
                } else if(a.charCodeAt(s) < b.charCodeAt(s)){
                    return -1;
                } else {
                    continue;
                }
            }
        } else if(a.length > b.length) {
            return 1;
        } else {
            
            return -1;
        }
    })
}

console.log(sortLetter(arr)) // [ 'cc', 'da', 'dd', 'bbb', 'rrr', 'aaaa' ]
```


### 给定一个字符串，请统计字符串中出现最多的字母和次数

例如：`aaaabbaa`

下面两种解法，都没有考虑到两个不同字母，出现的次数相同，因为最后我都是返回一个

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

另一种解法：差不多

```js
function getRes(str) {
    let strArr = [];
    let numArr = [];

    for(var s of str) {
        let index = strArr.indexOf(s);
        if(index !== -1) {
            // 存在
            numArr[index]++;
        } else {
            // 不存在
            strArr.push(s)
            numArr.push(1)
        }
    }
    // 找到最大值的下标
    let max = numArr[0];
    let maxI = 0;
    for(let i = 0; i < numArr.length; i++) {
        if(numArr[i] > max) {
            max = numArr[i];
            maxI = i;
        }
    }
    return { str: strArr[maxI], num: max}
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

另一种解法： 一样的思路

```js
function transformNum(value) {
    let arr = String(value).split('.');
    // arr[0]  1,123,456
    // arr[1]  78
    // 主要针对 arr[0]，进行循环遍历，并且再加上逗号
    // 先把 arr[0] 进行一个翻转 654,321,1
    let arr_reverse = arr[0].split('').reverse();
    let str = '' + arr_reverse[0]
    
    for(let i = 1; i < arr_reverse.length; i++) {
        if(i%3 === 0) {
            str = str + ',' + arr_reverse[i]
        } else {
            str = str + arr_reverse[i];
        }       
    }
    return str.split('').reverse().join('') +  '.' + arr[1]
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
  const parts = num.toString().split('.');    // 如果后面的小数位很多，会被截掉，用String 或.toString方法
  parts[0] = Number(parts[0]).toLocaleString()
  return parts.join('.')
}
```
### 函数柯里化

一个接受任意多个参数的函数，如果执行的时候传入的参数不足，那么它会返回新的函数，新的函数会接受剩余的参数，直到所有参数都传入才执行操作。这种技术就叫柯里化。

举例说明：

```js
const f = (a, b, c, d) => { .... }
const curried = curry(f)

curried(a,b,c,d)
curried(a,b,c)(d)
```

```js
const curry = (fn, arr = []) => {
    return (...args) => {
        if([...arr, ...args].length === fn.length) {
            return fn(...arr, ...args)
        } else {
            return curry(fn, [...arr, ...args]) // 需要把参数全部传进去，然后再接受新的参数
        }
    }
}
```

### 斐波拉契数列

#### 递归版

```js
function fibonacci(n) {
    if(n < 2) {
        return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}
```

### 洗牌算法

将数组中的数字，打乱顺序，保证每个位置的概率相等

思路：首先应该是交换，交换的下标是随机的，还有一个条件是这个随机下标的范围在 [0 原数组的长度]， 然后循环一遍交换

```js
// 一种实现
function disorder(array) {
    const length = array.length;
    let current = length - 1;
    let random;
    while(current > -1) {
        random = Math.floor(length * Math.random());
        [array[current], array[random]] = [array[random], array[current]];
        current--;
    }
    return array;
}
```

```js
// 另一种实现
const flush = function(num = []) {
    for (let i = 0; i < num.length; i++) {
        let index = Math.floor(Math.random() * num.length);
        let temp = num[i];
        num[i] = num[index];
        num[index] = temp;
    }
    return num;
};
```


### 无重复字符的最长子串

题目描述：给定一个字符串，请你找出其中不含有重复字符的最长字串的长度。

```js
function getRes(str) {
    let arr = [];
    let lenObjArr = []

    for(let s of str) {
        if(arr.includes(s)) {
            lenObjArr.push(arr.join(''))
            arr = []
            arr.push(s);
        } else {
            arr.push(s)
        }
    }
    lenObjArr.push(arr.join(''))

    lenObjArr.sort((a,b) => b.length - a.length)

    return lenObjArr[0]
}

console.log(getRes('abcdefgaabcdefgegbeedgef')) // 'abcdefg'
```
以上答案是错误的。不是这么简单的，因为并不是遇到重复字符然后就重新开始了。

正确答案如下：

```js
var lengthOfLongestSubstring = function (s) {
    let l = 0;
    let res = 0; 
    const map = new Map();
    for(let r = 0; r < s.length; r += 1) {
        if(map.has(s[r]) && map.get(s[r]) >= l) {   
            // 并且这个值必须在滑动窗口里面，也就是说这个值的位置应该大于等于左指针
            // 举例说明：abbcdea
            l = map.get(s[r]) + 1; // 重复字符位置加1
        }
        res = Math.max(res, r - l + 1);
        map.set(s[r], r);
    }
    return res;
}
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

思路：
1. 遍历字符串的一半，如果这个值和其应该对应的回文位置的值不相等的话，那么尝试删除。
2. 需要考虑 如果不删除的话，是否本身就是回文。

注意：
1. 翻转会改变原数组，因此要写在后面
实现

```js
/**
 * @param {string} s
 * @return {boolean}
 */
function validPalindrome(str) {
    const len = str.length;
    str = str.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
    if(str.split('').reverse().join('') === str) return true;
    for(let i = 0; i < parseInt(len/2); i++) {
        if(str[i] !== str[len - i -1]) {
            let arr = str.split('');
            let arr2 = str.split('');
            arr.splice(i, 1);
            arr2.splice(len - i -1, 1);
            return arr.join('') === arr.reverse().join('') ||
            arr2.join('') === arr2.reverse().join('')
        }
    }
    return false;
}
```

### [路径总和 leetcode 112](https://leetcode-cn.com/problems/path-sum/)

题目描述：

给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

解题思路：

1. 在深度优先遍历的过程中，记录当前路径的节点值的和。
2. 在叶子节点处，判断当前路径的节点值的和是否等于目标值。

注意点：

1. 要考虑空节点

```js
var hasPathSum = function(root, sum) {
    if(!root) return false;
    let res = false;
    const dfs = (n, s) => {
        if(!n.left && !n.right && s === sum) {
            res = true;
        }
        if(n.left) dfs(n.left, s + n.left.val)
        if(n.right) dfs(n.right, s + n.right.val)
    }
    dfs(root, root.val);
    return res;
}
```

### 二叉树找指定和的路径  剑指offer 34

思路：

1. 和路径总和有点类似的，在深度优先遍历的过程中，记录当前路径的节点值的和，以及当前值。
2. 在叶子节点处，判断当前路径的节点值和是否等于目标值，并将所有路径返回。


```js
var pathSum = function(root, sum) {
     if(!root) return []
    let res = [];
    const dfs = (n, s, path) => {
        if(!n.left && !n.right && s === sum) {
            res.push(path)
        }
        if(n.left) dfs(n.left, s + n.left.val, path.concat(n.left.val))
        if(n.right) dfs(n.right, s + n.right.val, path.concat(n.right.val))
    }
    dfs(root, root.val, [root.val]);
    return res;
};
```

### x 的平方根 leetCode 69

思路：

存在一个值的2次方，是等于 x。我们现在就要找到这个值。首先肯定是小于 x 的，而且题目要求是整数。

```js
function mySqrt(x) {
    var re = 0;
    while(!(re * re <= x && (re+1) * (re+1) > x)) {
        re++;
    }
    return re;
}
```

二分查找解法

思路：

左边和右边，之间的距离不断的缩小。然后用两者和的一半的乘积去和 x 值进行比较。
```js
var mySqrt = function(x) {
    let l = 0;
    let r = x;
    let m = 0;
    let res = -1;
    while(l <= r) {
        m = Math.floor((l+r) / 2);
        // 也可写成 m = (l + r) >> 1
        if(m * m <= x) {
            res = m;
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return res
}
```


### 深度优先遍历二叉树

```js
function dfs(root) {
    if(!root && !root.left && !root.right) return;
    if(root.left) dfs(root.left)
    if(root.right) dfs(root.right)
}
```

### 广度优先遍二叉树


```js
    1
  2   3
4  5 6 7
```

```js
var bfs = function(root) {
    const q = [root];
    while(q.length) {
        const n = q.shift(); // 先取出来左节点喽
        if(!n.left && !n.right) {
            return;
        }
        if(n.left) q.push(n.left);
        if(n.right) q.push(n.right);
    }
}
```

### 0-1 背包问题

感觉这个问题和分饼干问题，虽说分饼干是贪心算法。但是背包问题是动态规划。

问题描述：

给你一个可装载重量为 W的背包 和 N 个物品，每个物品有重量和价值两个属性。其中第i个物品的重量为wt[i]，价值为

val[i]，现在让你用这个背包装物品，最多能装的价值是多少？

思路：

就是第i个物品是装入还是不装入。

这里的状态有两个，背包容量和可选择的物品。

如果把第 i 个物品不装入背包，最大价值`f[i][j]`等于`f[i-1][j]`，继承之前的结果。

如果把第 i 个物品装入背包，最大价值`f[i][j]` 等于`f[i-1][W-wt[i-1]] + val[i]`

```js    
function knapsack(weights, values, W) {
    let n = weights.length;
    let f = new Array(n);
    for(let i = 0; i < n; i++) {
        f[i] = [];
    }
    for(var i = 0; i < n; i++) {
        for(var j = 0; j <= W; j++) {
            if(i === 0) {
                f[i][j] = j - weights[i] < 0 ? 0 : values[i] // 连一个都不够装
            } else {
                if(j < weights[i]) { // 等于之前的最优值
                    f[i][j] = f[i-1][j]
                } else {
                    f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]] + values[i])
                }
            }
        }
    }
    return f[n-1][W]
}
```
[参考文章](https://segmentfault.com/a/1190000012829866)

[参考文章](https://juejin.im/post/6891247226044350478)

### 全排列 LeetCode 46

解题思路

1. 所有排列情况；
2. 没有重复元素。
3. 也就是两种情况，如果已经有了该值即重复，那么不要，如果没有那么就留下。
4. 用回溯解法

// 这个设计思想的确是挺不错的。

```js
var permute = function(nums) {
    const res = [];
    const backtrack = (path) => {
        if(path.length === nums.length) {
            res.push(path);
        }
        nums.forEach(n => {
            if(path.includes(n)) { return; }
            backtrack(path.concat(n))
        })
    }
    backtrack([]);
    return res;
}

// 时间复杂度：O(n!), 因为是嵌套的 for循环，而循环每次的次数又都减一
// 空间复杂度：递归的深度，就是数组的长度，即 O(n)
```

### 子集  LeetCode 78

```js
var subsets = function(nums) {
    const res = [];
    const backtrack = (path, l, start) => {
        if(path.length === l) {
            res.push(path);
            return;
        }
        for (let i = start; i < nums.length; i++) {
            backtrack(path.concat(nums[i]), l, i+1);
        }
    }
    for(let i = 0; i <= nums.length; i++) {
        backtrack([], i, 0)
    }
    return res;
}

// 时间复杂度：O(2的n 次方)，因为每个元素都有两种可能 (存在或不存在)
// 空间复杂度：O(n) 即递归的深度，即 nums的长度
```

### 二分查找   leetCode  704

给定一个排序好的数组，用二分查找的办法找出目标元素，返回其下标。

```js
var search = function(nums, target) {
    let low = 0; 
    let high = nums.length - 1;
    while(low <= high) {
        const mid = Math.floor((low + high)/2);
        const element = nums[mid];
        if(element < target) {
            low = mid + 1;   // 这里才是二分查找的关键点吧
        } else if(element > target) {
            high = mid - 1;  // 同理
        } else {
            return mid;
        }
    }
    return -1;
}
```

### 最长连续递增序列  leetCode  674

题目描述：

给定一个未经排序的整数数组，找到最长且连续递增的子序列，并返回该序列的长度。

这道题相对比较简单，不需要返回序列的内容，只需要返回长度就可以了。

```js
var findLengthOfLCIS = function(nums) {
    if(!nums.length) return 0;
    let count = 1;
    let temp = 1;
    for(let i = 0; i < nums.length -1; i++) {
        if(nums[i+1] > nums[i]) {
            temp++;
        } else {
            count = Math.max(temp, count);
            temp = 1;
        }
    }
    return Math.max(temp, count);
}
```

或者如下：

```js
function findLengthOfLCIS(num) {
    if(num.length === 0) return 0;
    let temp = 1;
    let res = 1;
    for(let i = 0; i < num.length-1; i++) {
        if(num[i+1] > num[i]) {
            temp++;
            res = Math.max(res, temp);
        } else {
            temp = 1;
        }
    }
    return res;
}
```

### 最长连续子序列 leetCode 128

最长连续数列的意思是，左右元素相差一。

参考答案：

还是比较好理解的。

```js
var longestConsecutive = function(nums) {
    let numsSet = new Set(nums), max = 0;
    numsSet.forEach(n => {
        if(numsSet.has(n-1)) {
            return;
        }
        let currConse = 0, currNum = n;
        while(numsSet.has(currNum)) {
            currConse++;
            currNum++;
        }
        max = Math.max(max, currConse);
    })
    return max;
}
```

### 分饼干问题 LeetCode 455

解题思路

1. 首先采用的是贪心算法
2. 对饼干数组和胃口数组升序排序
3. 遍历饼干数组，找到能满足第一个孩子的饼干。
4. 然后继续遍历饼干数组，找到满足第二、三、..... n个孩子的饼干

```js
// s 代表饼干，g代表3个小孩的胃口值
var findContentChildren = function(g, s) {
    const sortFunc = function(a, b) {
        return a - b;
    }
    g.sort(sortFunc);
    s.sort(sortFunc);
    let i = 0;
    s.forEach(n => {
        if(n >= g[i]) {
            i += 1;
        }
    })
    return i;
}
```

### 有64 匹马，一共有8个赛道，想要找出最快的4匹马，要比赛最少多少轮才可以？

[答案众说纷纭](https://juejin.cn/post/6896025445839011853)

我没有看下去 过











