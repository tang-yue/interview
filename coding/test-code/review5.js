// 开始从头到尾重新默写一遍

// 手写promise，promise.all, promise.finally，promise.race

// 手写 六种继承，并说出优缺点，并写出一个继承

// 原型链继承

function Person() {
    this.age = 30;
    this.height = 160;
}

function Child() {

}

Child.prototype = new Person();

// 属性被共享了

// 构造函数继承

function Person(num) {
    this.age = num;
}

function Child() {
    Person.call(this, 30)
}

// 继承不了方法

// 构造函数组合继承

function Person(num) {
    this.age = num;
}

function Child() {
    Person.call(this, 30);
}

Child.prototype = new Person();

Child.prototype.constructor = Child;  // 这个写的对吗？

// 原生式继承

const person = {
    age: 30
}

const child = Object.create(person);

// 寄生式继承
const person = {
    age: 30
}

function inherit(person) {
    let child = Object.create(person);
    child.getAge = function() {
        return 50
    }
    return child
}

const child = inherit(person);

// 寄生式组合继承

function inherit(Child, Person) {
    let p = Object.create(Person.prototype);
    Child.prototype = p;
    p.constructor = Child;
}

function Person(num) {
    this.age = num
}

function Child() {
    Person.call(this, 30);
}

inherit(Child, Person);

Person.prototype.getAge = function() {
    return this.age;
}

// ok 到此就结束了

// 手写 new call bind apply

// 手写 new

function myNew() {
    // 取出构造函数
    const construct = [].shift.call(arguments);

    const obj = Object.create(construct.prototype);
    
    const res = construct.apply(obj, arguments);

    return typeof res === 'object' ? res || obj : obj;
}

function Test(num) {
    this.value = num;
}

console.log(myNew(Test, 30))

// 手写 call

function Test() {
    this.value = 30;
    this.fn = function() {

    }
}

Function.prototype.myCall = function(context) {
    context = context || window;
    context.fn = this;
    let args = [];
    for(let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    const res = context.fn(args);

    delete context.fn

    return res;
}

// 首先看call的用法
Person.myCall(this, '参数')  // 执行然后返回结果


// 手写 apply，只不过传入的值变成了数组，变成了接受2个参数

Function.prototype.myApply = function(context, arr) {
    context = context || window;
    context.fn = this;
    // let args = [];
    const res = context.fn(...arr.slice(1));

    delete context.fn;

    return res;
}

// 手写 bind 稍微有点复杂

Function.prototype.myBind = function(context) {
    context = context || window;

    const self = this;
    
    let args = Array.prototype.slice.call(arguments, 1);

    // return 这样一个函数
    function fBound() {
      var bindArgs = Array.prototype.slice.call(arguments);
      // 这个内部有arguments，和 this
      // 前者是作为 new，作为构造函数， 后者是作为函数
      return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }

    function temp() {};
    
    Temp.prototype = this.prototype;
    fBound.prototype = new temp();

    return fBound;
}

bind = Person.myBind(this, '参数');

bind(); // 当作函数

new bind('参数');  // 当作对象


// 再重新默写一遍 call


Function.prototype.myCall2 = function() {
    if(typeof this !== 'function') {
        throw new Error('报错')
    }

    let self = this;

    const args = Array.prototype.slice.call(arguments, 1);

    function fBound() {
        const bindArgs = Array.prototype.slice.call(arguments);

        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }

    function temp() {}
    temp.prototype = this.prototype;
    fBound.prototype = new temp();

    return fBound;
}

// 防抖

function debounce(fn, wait = 30) {
    var timer;
    return () => {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this)
        }, wait)
    }
}


// 节流

function throttle(fn, wait = 30) {
    var prev = + new Date();
    return () => {
        var now = + new Date();
        if(now - prev >= wait) {
            fn.apply(this);
            prev = now;
        }
    }
}

// 手写 冒泡排序， 快排

// 冒泡

function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i; j < arr.length; j++) {
            if(arr[j] <= arr[i]) {
                let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
            }
        }
    }
    return arr;
}


// 快排

function quickSort(arr) {
    let midI = Math.floor(arr.length/2);
    let mid = arr.splice(midI ,1);
    let left = [];
    let right = [];

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] >= mid) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    return quickSort(left).concat(mid, quickSort(right))
}

// 手写虚拟 dom

function vNode(t, p, c) {
    this.tagName = t;
    this.props = p;
    this.children = c;
}

function getNode(t, p, c) {
    return new vNode(t, p, c)
}


// 手写双向绑定

// 目标是写完了，然后再去吃饭

// 手写深拷贝，浅拷贝

// 浅拷贝

arr.slice()
arr.concat()

function shallowCopy(obj) {

    let target = typeof obj === 'object' ? {} : []

    for(var i in obj) {
        target[i] = obj[i];
    }
    return target;
}

// 深拷贝
// 这个里面的东西比较多。

let arrayType = '[object, array]';

let objectType = '[object, object]';

let symbolType = '[object, symbol]';

let mapType = '[object, map]';

let setType = '[object, set]';

function getType(obj) {
    return Object.prototype.toString.call(obj).toLowerCase();
}

function init(obj) {
    const Cotor = obj.constructor;
    return new Cotor;
}

function deepCopy(obj, map = new Map()) {
    let target;
    if(typeof obj !== 'object') {
        return obj;
    }

    let type = getType(obj);
    
    target = init(obj);

    // 防止循环递归
    
    if(map.get(obj)) {
        return map.get(obj);
    }
    map.set(obj, target);

    if(type === mapType) {
        obj.forEeach((key, value) => {
            target[key] = deepCopy(value, new Map())
        })
        return target;
    }

    if(tyep === setType) {
        obj.forEeach((key) => {
            target[key] = deepCopy(obj[key], new Map())
        })
        return target;
    }

    // 数组 对象
    for(var key in obj) {
        target[key] = deepCopy(obj[key]);
    }

    return target;
}

// 数组拍平

function flatten(arr, n) {
    return n > 0 
        ? arr.reduce((res, item) => {
            Array.isArray(item) ? res = res.concat(flatten(item, n-1)) : res.push(item)
            return res;
        }, [])
    : arr.slice()
}


// 手写数组去重

Array.from(new Set(arr));

function trim(arr) {
    return arr.filter((val, i) => arr.indexOf(val) === i)
}

// 实现instanceof

[] instanceof Array;

function myInstanceof(l, r) {
    let ol = l.__proto__;
    let or = r.prototype;
    while(ol !== null) {
        if(ol === or) {
            return true;
        }
        ol = ol.__proto__;
    }
    return false;
}

// 一样的道理

// 倒过来写

// 菲波那契

function febonacci(n) {
    if(n < 2) return n;
    return febonacci(n-2) + febonacci(n-1)
}

// 洗牌算法

function flush(arr) {
    for(let i = 0; i < arr.length; i++) {
        let random = Math.floor(Math.random() * arr.length)
        let temp = arr[random];
        arr[random] = arr[i];
        arr[i] = temp;
    }
    return arr;
}


// 函数柯里化

function curry(fn, arr = []) {
    return (...args) => {
        if([...args, ...arr].length = fn.length) {
            return fn(...args, ...arr)
        } else {
            return curry(fn, [...args, ...arr]);
        }
    }
}


function add(a,b) {
    return a + b;
}
const currid = curry(add);

const add1 = currid(3);

// 数字千分位的3种方法

// 正则方法

function transformNumber(number) {
    let parts = number.toString().split('.');

    parts[0] = parts[0].replace(/\B(?=(\d{3})+$)/g,',');

    return parts.join('')
}

function transformNumber2(number) {
    let parts = number.toString().split('.');

    parts[0] = Number(parts[0]).toLocaleString();

    return parts.join('.')
}

// 给定一个字符串数组，请输出。。。。。。。

function getRes(arr) {
    arr.sort((a, b) => {
        if(a.length === b.length) {
            for(var i in a) {
                if(a.charCodeAt(i) > b.charCodeAt(i)) {
                    return 1;
                } else if(a.charCodeAt(i) < b.charCodeAt(i)) {
                    return -1;
                } 
            }
        } else if(a.length > b.length) {
            return 1;
        } else {
            return -1;
        }
    })
}

// 还有最后一道

// 给定一个字符串，

function getRes2(str) {
    let arr = [];
    let strArr = [];
    for(var i in str) {
        let index = strArr.indexOf(str[i]);
        if(index === -1) {
            strArr.push(str[i]);
            arr.push(1);
        } else {
            arr[index]++
        }
    }
    let max = arr[0];
    let maxI = 0;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > max) {
            max = arr[i];
            maxI = i;
        }
    }
    return { str: strArr[maxI], num: arr[maxI]}
}

// 接着算法然后一直往后写

// 1. 无重复字符的最长子串，返回长度就好

// 举例说明  'abcdefgaebde'
// 双指针问题

function getRes3(str) {
    let l = 0; 
    let map = new Map();
    let res = 0;
    for(let r = 0; r < str.length; r++) {
        if(map.has(str[i]) && map.get(str[i]) >= l) {
            l = map.has(str[i]) + 1;
        }
        res = Math.max(res, r - l + 1);
        map.set(str[i], i);
    }
    return res;
}

// 验证回文字符串II

function getRes4(str) {
    str = str.replace(/[^0-9a-zA-Z]/g, '');
    if(str.split('').reverse().join('') === str) return true;
    let len = str.length;
    for(let i = 0; i < parseInt(len/2); i++) {
        if(str[i] !== str[len - i -1]) {
            let arr = str.split('');
            let arr2 = str.split('');
        
            arr.splice(i, 1);
            arr2.splice(len - i -1, 1);

            return arr.join('') === arr.reverse().join('') || arr2.join('') === arr2.reverse().join('')
        }
    }
}

// 路径总和 leetCode 112

function hasPathSum(root, sum) {
    if(!root) return false;
    let res = false;
    const dfs = (n, s) => {
        if(!n.left && !n.right && s === sum) {
            res = true;
        }
        if(n.left) dfs(n.left, s + n.left.val)
        if(n.right) dfs(n.right, s + n.right.val)
    }
    dfs(root, root.val)
    return res;
}


// 二叉树找指定和的路径

function pathSum(root, sum) {
    if(!root) return []
    let res = [];
    const dfs = (n, path, s) => {
        if(!n.left && !n.right && s === sum) {
            res.push(path);
        }
        if(n.left) dfs(n.left, path.concat(n.left.val), s + n.left.val);
        if(n.right) dfs(n.right, path.concat(n.right.val), s + n.right.val);
    }
    dfs(root, [root.val], root.val)
    return res;
}

// x的平方根

// 暴力自增

function mysqrt(x) {
    let i = 0;
    while(!(i * i >= x && (i +1) * (i+1) < x)) {
        i++;
    }
    return i;
}

// 写一遍二分查找解法

function mysqrt(x) {
    let l = 0;
    let r = x;
    let mid = 0;
    let res = 0;
    while(l <= r) {
        mid = Math.floor((l + r)/2);
        if(mid * mid <= x) {
            res = mid;
            l = mid + 1;
        } else {
            r = mid -1;
        }
    }
    return res;
}



// 深度优先遍历

const dfs = (root) => {
    if(!root) return;
    if(n.left) dfs(n.left)
    if(n.right) dfs(n.right)
}

// 广度优先遍历

const bfs = (root) => {
    let q = [root];
    let n;
    while(q.length > 0) {
        n = q.shift();
        if(!n.left && !n.right) return;
        if(n.left) q.push(n.left);
        if(n.right) q.push(n.right);
    }
}


// 最长连续递增序列
// 这个属于比较简单吧

function getRes(nums) {
    let count = 0;
    let res = 0;
    for(let i = 0; i < nums.length-1; i++) {
        if(nums[i+1] < nums[i]) {
            count = 1;
        } else {
            count++;
            res = Math.max(res, count);
        }
    }
    return Math.max(res, count);
}

// 最长连续子序列

function getRes5(nums) {
    let map = new Set(nums);
    let count = 0;
    let cur_add;
    let max = 0;
    for(let i = 0; i < nums.length; i++) {
        if(map.has(nums[i])) {
            cur_add = nums[i];
            count = 1;
            while(map.has(cur_add)) {
                cur_add++;
                count++;
                max = Math.max(max, count);
            }
        }
    }
    return Math.max(max, count);
}

// 居然一次性过了，开心

// 二分查找

function getRes6(nums, target) {
    let res = -1;
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] === target) {
            res = -1;
        }
    }
    return res;
}

// 二分查找重新默写一遍

function search(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    let mid = -1;
    while(low <= high) {
        let mid = Math.floor((low + high/2));
        let ele = nums[mid];
        if(ele < target) {
            low = low +1;
        } else if(ele > target) {
            high = high -1;
        } else {
            return mid;
        }
    }
    return mid;
}


// 分饼干问题 加油
// g 表示孩子的胃口值，s 表示有两块小饼干

function getRes7(g, s) {
    function sortFunc(a, b) {
        return a - b;
    }
    g.sort(sortFunc)
    s.sort(sortFunc)
    
    let i = 0;
    s.forEach((v) => {
        if(v >= g[i]) {
            i++;
        }
    })
    return i;
}

// 数组的全排列问题
// 递归回溯

function getRes8(nums) {
    let res = []
    const backTrack = (num) => {
        if(num.length === nums.length) {
            res.push(num);
        }
        nums.forEeach((val) => {
            if(num.includes(val)) return;
            num.concat(val);
        })
    }

    backTrack([])
    return res;
}

// 背包问题
// 默写一遍吧

function package(weights, values, W) {
    let n = weights.length;
    let f = new Array(n);
    for(let i = 0; i < n.length; i++) {
        f[i] = []
    }

    for(let i = 0; i < n; i++) {
        for(let j = 0; j <= W; j++) {
            if(i === 0) {
                f[i][j] = j < weights[i] ? 0 : values[i]
            } else {
                if(j < weights[i]) {
                    f[i][j] = f[i-1][j]
                } else {
                    f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]] + values[i])
                }
            }
        }
    }
    return f[n-1][W]
}

// 求集合的子集  leetCode 78

// 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集
// 结果里面不能包含重复的子集

