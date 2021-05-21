
// 再次重新复习一遍
// myPromise.prototype.finally = function(onFulfill) {
//     return thie.then((val) => {
//         onFulfill();
//         return val;
//     }, (err) => {
//         onFulfill();
//         return err;
//     })
// }

// 手写new

function myNew() {
    let construct = [].shift.call(arguments);
    let obj = Object.create(construct.prototype); // 继承原型上的属性

    let res = construct.apply(obj, arguments); // obj 继承属性

    return typeof res === 'object' ? res || obj : obj;
}

// new Person('参数')

// 手写 bind

Function.prototype.myBind = function(context) {
    let self = this;
    let args = Array.prototype.slice.call(arguments, 1);
    
    function fBound() {
        let bindArgs = Array.prototype.slice.call(arguments);
        
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    function temp() {};
    temp.prototype = this.prototype;
    fBound.prototype = new temp();

    return fBound;
}

function test(num) {
    this.age = 1;
    this.num = num;
    console.log(this.value);
    return 3;
}

// console.log(test.myBind(this));

let foo = {
    value: 1
}

let res = test.myBind(foo, 2)

console.log(res(2));

// 节流函数如何拼写

function throttle(fn, wait = 30) {
    var prev = + new Date();
    return () => {
        var now = + new Date();
        if(now - prev >= wait) {
            fn.apply(this)
            prev = now;
        }
    }
}

// 手写双向绑定

/* <div>
    <input id ="input" />
    <span id="span"></span>
</div>

let oInput = document.getElementById('input');
let oSpan = document.getElementById('span');

let data = {
    text: ''
}
oInput.onchange = function(e) {
    data.text = e.target.value;
}

Object.defineProperty(data, 'text', {
    get() {
        return oInput.value
    },
    set(newValue) {
        oInput.value = newValue;
        oSpan.innerHTML = newValue;
    }
}) */


function myInstanceOf(l, r) {
    let ol = l.__proto__;
    let or = r.prototype;

    while(true) {
        if(ol === null) return false;
        if(ol === or) {
            return true;
        }
        ol = ol.__proto__;
    }
    // return false;
}

function curry(fn, arr = []) {
    return (...args) => {
        if([...args, ...arr].length = fn.length) {
            return fn(...args, ...arr);
        } else {
            return curry(fn, [...args, ...arr])
        }
    }
}

// 数字千分位 正则表示式版

function transformNumber(num) {
    let parts = String(num).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})$)/, ',')
    return parts.join('.');
}

console.log(transformNumber(123456.45));

// 验证字符串2

function valid(str) {
    if(str.length === 0) return true;
    if(str === str.split('').reverse().join('')) return true;
    for(let i = 0; i < len/2; i++) {
        if(str[i] !== str[len - i -1]) {
            let arr = str.split('');
            let arr2 = str.split('');

            arr.splice(i, 1);
            arr2.splice(len - i-1,1);
            return arr.join('') === arr.reverse().join('') || arr2.join('') === arr2.reverse().join('')
        }
    }
    return false;
}

// 最长连续递增序列

function getRes(nums) {
    let setNums = new Set(nums);
    let cur;
    let count = 1;
    let max = 0;
    for(let i = 0; i < nums.length; i++) {
        if(setNums.has(nums[i])) {
            cur = nums[i];
            while(setNums.has(cur)) {
                cur++;
                count++;
            }
            max = Math.max(max, count);
        }
    }
    return Math.max(max, count);
}

// 二分查找默写一遍

function search(nums, target) {
    let l = 0;
    let r = nums.length;
    let mid;
    let res = -1;
    if(l <= r) {
        mid = Math.floor((l+r)/2);
        res = nums[mid];
        if(res < target) {
            l = mid + 1;
        } else if(res > target) {
            r = mid - 1;
        } else if(res === target) {
            return mid;
        }
    }
    return res;
}

// 背包问题

function package(weights, values, W) {
    let n = weights.length;
    let f = new Array(n);

    for(var i = 0; i < n; i++) {
        for(var j = 0; j < W; i++) {
            if(i === 0) {
                f[i][j] = j - weights[i] < 0 ? 0 : values[i];
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

// 把下面没有写完的全部写完

