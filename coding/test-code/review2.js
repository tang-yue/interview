// // 重新默写一遍

// let PENDING = 'PENDING';
// let FULFILLED = 'FULFILLED';
// let REJECTED = 'REJECTED';


// class myPromise {
//     constructor(executor) {
//         this.status = PENDING;
//         this.value = undefined;
//         this.reason = undefined;
        
//         this.onResolvedCallbacks = [];
//         this.onRejectedCallbacks = [];
        
//         let resolve = (value) => {
//             setTimeout(() => {
//                 this.status = FULFILLED;
//                 this.value = value;
//                 this.onResolvedCallbacks.forEach((fn) => {
//                     fn(value);
//                 })
//             })
//         }

//         let reject = (reason) => {
//             setTimeout(() => {
//                 this.status = REJECTED;
//                 this.reason = reason;
//                 this.onRejectedCallbacks.forEach((fn) => {
//                     fn(reason);
//                 })
//             })
//         }
        
//         try {
//             executor(resolve, reject)
//         } catch(e) {
//             reject(e)
//         }
//     }


//     then(onFulfilled, onRejected) {
//         // typeof onFulfilled === 'function' && this.onResolvedCallbacks.push(onFulfilled);
//         // typeof onRejected === 'function' && this.onResolvedCallbacks.push(onRejected);

//         let newPromise;

//         onFulfilled = typeof onFulfilled === 'function'  ? onFulfilled : (value) => value;
//         onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };

//         if(this.status === FULFILLED) {
//             return (newPromise = new myPromise((resolve, reject) => {
//                 setTimeout(() => {
//                     try {
//                         let x = onFulfilled(this.value)
//                         resolvePromise(x, newPromise, resolve, reject)
//                     } catch(e) {
//                         reject(e)
//                     }
//                 })
//             }))
//         }

//         if(this.status === REJECTED) {
//             return (newPromise = new myPromise((resolve, reject) => {
//                 setTimeout(() => {
//                     try {
//                         let x = onRejected(this.reason)
//                         resolvePromise(x, newPromise, resolve, reject)
//                     } catch(e) {
//                         reject(e)
//                     } 
//                 })
//             }))
//         }

//         if(this.status === PENDING) {
//             return (newPromise = new myPromise((resolve, reject) => {
//                 this.onResolvedCallbacks.push((value) => {
//                     try {
//                         let x = onFulfilled(value)
//                         resolvePromise(x, newPromise, resolve, reject)
//                     } catch(e) {
//                         reject(e)
//                     }
//                 })

//                 this.onRejectedCallbacks.push((reason) => {
//                     try {
//                         let x = onRejected(reason)
//                         resolvePromise(x, newPromise, resolve, reject)
//                     } catch(e) {
//                         reject(e)
//                     }
//                 })
//             }))
//         }
//     }

//     catch(onRejected) {
//         return this.then(null, onRejected)
//     } 
// }


// function resolvePromise(x, promise2, resolve, reject) {
//     if(x === promise2) {
//         reject(new TypeError('循环引用'))
//     } else if(x instanceof myPromise) {
//         if(x.status === PENDING) {
//             x.then(
//                 y => {
//                     resolvePromise(y, promise2, resolve, reject)
//                 },
//                 r => {
//                     reject(r)
//                 }
//             )
//         } else {
//             resolve(x)
//         }
//     } else if(x && (typeof x === 'function' || typeof x === 'object')) {
//         let called = false;

//         let then = x.then;

//         if(typeof then === 'function') {
//             try {
//                 if(called) return;
//                 called = true;
//                 then.call(
//                     x,
//                     y => {
//                         resolvePromise(y, promise2, resolve, reject)
//                     },
//                     r => {
//                         reject(r)
//                     }
//                 )
//             } catch(e) {
//                 if(called) return;
//                 called = true;
//                 reject(e)
//             }
//         } else {
//             if(called) return;
//             called = true;
//             resolve(x)
//         }
//     } else {
//         resolve(x)
//     }
// }

// // 接下来 完善 then函数和resolvePromise函数


// myPromise.deferred = function() {
//     let defer = {};
//     defer.promise = new myPromise((resolve, reject) => {
//       defer.resolve = resolve;
//       defer.reject = reject;
//     });
//     return defer;
//   };
  
//   module.exports = myPromise;

// // let promise1 = new myPromise((resolve, reject) => {
// //     setTimeout(() => {
// //         resolve('成功')
// //     })
// // })

// // promise1.then((data) => {
// //     console.log(data, 'first')
// // })


// // promise1.then((data) => {
// //     console.log(data, 'second')
// // })

// // 下面写 promise.all

// myPromise.all = (list) => {
//     return new myPromise((resolve, reject) => {
//         let results = [];
//         let counts = 0;
//         for(let i = 0; i < list.length; i++) {
//             list[i].then((value) => {
//                 counts++;
//                 results[i] = value;
//                 if(counts === list.length) {
//                     resolve(results);
//                 }
//             }, (e) => {
//                 reject(e);
//             })
//         }
//     })
// }

// // 下面要写 promise.race

// myPromise.race = (list) => {
//     return new myPromise((resolve, reject) => {
//         for(let i = 0; i < list.length; i++) {
//             list[i].then(resolve, reject)
//         }
//     })
// }

// // 下面要写 promise.finally 默写一遍

// myPromise.prototype.finally = function(onFinished) {
//     return this.then((val) => {
//         onFinished();
//         return val;
//     }).catch((err) => {
//         onFinished();
//         return err;
//     })
// }


// // let promise1 = new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //         resolve('成功')
// //     }, 1000)
// // })

// // let promise2 = new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //         resolve('成功2')
// //     }, 5000)
// // })

// // myPromise.race([promise2, promise1]).then((res) => {
// //     console.log(res)
// // })

// // console.log(res, 'res')


// // 手写六种继承，并说出优缺点，并写出一个继承。

// // 1. 原型链继承

// function Person() {
//     this.age = 10;
//     this.height = 150;
//     this.arr = [];
// }

// function Child() {
//    //  this.age = 10;
//    //  this.height = 140;
// }

// Child.prototype = new Person();

// let instance1 = new Child();

// let instance2 = new Child();

// instance1.arr.push('1');

// // console.log(instance1.arr, instance2.arr)

// // 2. 构造函数继承

// function Person(num) {
//     this.age = num;
//     this.height = 150;
//     this.arr = [];
// }

// function Child() {
//     Person.call(this, 30)
// }

// let instance3 = new Child();

// // console.log(instance1.height)

// // 3. 组合构造函数继承

// function Person(num) {
//     this.age = num;
//     this.height = 150;
//     this.arr = [];
// }

// function Child() {
//     Person.call(this, 30)
// }

// Person.prototype.getValue = function() {
//     return this.age;
// }

// Child.prototype = new Person();

// Child.prototype.constructor = Child;

// let instance4 = new Child();

// instance4.age = 40;

// let instance5 = new Child();

// // console.log(instance1.height)
// // console.log(instance4.getValue());
// // console.log(instance5.getValue());

// // 4. 原生式继承

// let person = {
//     age: 30,
//     height: 150
// }

// let child = Object.create(person)

// // console.log(child.age, child.height)

// // 5. 寄生式继承

// function inherit(person) {
//     let child = Object.create(person);
//     child.getValue = function() {
//         return person.height;
//     }
//     return child;
// }

// let person2 = {
//     age: 30,
//     height: 150
// }

// let child2 = inherit(person2)

// // console.log(child2.getValue(), child2.height)

// // 6. 寄生组合继承

// function inherit5(Child, Person) {
//     let p = Object.create(Person.prototype);
//     Child.prototype = p;
//     p.constructor = Child; 
// }

// function Person5() {
//     this.age = 30;
//     this.height = 160;
// }

// function Child5() {
//     this.sex = 'sex'
// }

// inherit5(Child5, Person5)

// let instance6 = new Person5();

// instance6.age = 40;

// let instance7 = new Person5();

// // console.log(instance6.age, 'age age', instance7.age)


// // 你自己写一个继承函数

// function inherit6(Child, Person) {
//     let p = Object.create(Person.prototype);
//     Child.prototype = p;
//     p.constructor = Child; 
// }

// function Person6(num) {
//     this.xx = num;
//     this.age = 30;
//     this.height = 160;
// }

// function Child6() {
//     Person6.call(this, 60)
//     this.sex = 'sex'
// }


// inherit6(Child6, Person6);

// Person6.prototype.get = function() {
//     return this.age
// }


// let instance8 = new Child6()

// // console.log(instance8.xx, instance8.get())

// // 手写 new call bind apply

// // function myNew() {
// //     // 这里是content，content 里面又包含了第一个参数构造函数，后面就是普通参数
// //     // 取出构造函数
// //     const construct = [].shift.call(arguments);
    
// //     let obj = Object.create(construct.prototype);  // 访问方法

// //     let result = construct.apply(obj, arguments); // 让obj拥有 construct 中的属性

// //     return typeof result === 'object' ? result || obj : obj
// // }

// // // 首先想得到的是obj,  那么这个obj 少了什么，它需要方法，它也需要属性。
// // // 并且这个构造函数还有可能返回结果。

// // myNew(Person10, '参数')


// // 默写一遍

// function myNew() {
//     let construct = [].shift.call(arguments); // 取出构造函数
//     let obj = Object.create(construct.prototype); // 方法
//     let result = construct.apply(obj, arguments); // 属性
//     return typeof result === 'object' ? result || obj : obj;
// }

// // call bind apply

// // Function.prototype.myCall = function() {
// //     context.fn = this;
// //     // arguments
// //     // 要取出调用它的函数 即 func， 然后我们要把this 后面的参数给传进去。
// //     // 没有返回结果，直接就执行了
// //     context // 自带的就是
// // }

// // 思路

// // func.call(this, xx)

// // 首先要想清楚是如何使用的

// // Function.prototype.call2 = function(context) {

// //     context = context || window;

// //     context.fn = this;

// //     console.log(context, 'context')
    
// //     let args = [];

// //     for(let i = 1; i < arguments.length; i++) {
// //         args.push(arguments[i])
// //     }
    
// //     let result = context.fn(...args)

// //      delete context.fn
    
// //     return result;
// // }



// // 默写一遍myCall

// Function.prototype.myCall = function(context) {
//     context = context || window;
    
//     context.fn = this;

//     let args = [];

//     for(let i = 1; i < arguments.length; i++) {
//         args.push(arguments[i])
//     }
//     const result = context.fn(...args);

//     delete context.fn;

//     return result;
// }

// // bar.myCall(foo, 2)


// // 手写 apply 了

// // 所以我觉得是一样的，仅仅是后面的参数不一样。

// Function.prototype.myApply = function(context, arr) {
//     context = context || window;

//     context.fn = this;

//     let result;
//     if(!arr) {
//         result = context.fn();
//     } else {
//         result = context.fn(...arr);
//     }
//     delete context.fn
//     return result
// }

// // 默写一遍

// Function.prototype.myBind = function (context) {

//     if(typeof this !== 'function') {
//         throw new Error('error')
//     }

//     let args = Array.prototype.slice.call(arguments, 1);

//     let self = this;

//     function fBound() {
//         let bindArgs = Array.prototype.slice.call(arguments);

//         return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))        
//     }

//     var fNop = function() {}
//     fNop.prototype = this.prototype;
//     fBound.prototype = new fNop()

//     return fBound;
// }

// let foo = {
//     value : 1
// }

// function bar(num, num2) {
//     this.num = num;
//     console.log(num2);
//     console.log(this.value, num)
// }

// // bar.myApply(foo, [3])

// // 手写 bind

// // 那么bind 该如何写，先回想 bind的用法。
// // 首先返回的是一个函数，而且这个函数，还可以用来作为new构造函数。

// // let func = bar.myBind(foo, 2)

// // let obj = new func(3);

// // console.log(obj.num);


// // 手写防抖 节流函数并解释


// // 防抖

// function debounce(fn, wait) {
//     var timer;
//     return function() {
//         if(timer) {
//             clearTimeout(timer);
//         }
//         timer = setTimeout(() => {
//             fn.apply(this, arguments)
//         }, wait)
//     }
// }


// // 节流

// function throttle(fn, wait) {
//     var prev = +new Date();
//     return () => {
//         var now = +new Date();

//         if(now - prev >= wait) {
//             fn.apply(this, arguments);
//             prev = now;
//         }
//     }
// }


// // 手写冒泡，快排

// // 冒泡

// function bubbleSort(arr) {
//     for(let i = 0; i < arr.length; i++) {
//         for(let j = i; j < arr.length; j++) {
//             if(arr[i] > arr[j]) {
//                 let temp = arr[i];
//                 arr[i] = arr[j];
//                 arr[j] = temp;
//             }
//         }
//     }
//     return arr;
// }

// // 测试下




// // 快排

// // 取一个基准值，取一个中间值

// function quickSort(arr) {
//     if(arr.length <= 1) return arr;
//     let index = arr.length/2;

//     let middleV = arr.splice(index, 1)

//     let right = [];
//     let left = [];

//     for(let i = 0; i < arr.length; i++) {
//         if(arr[i] <= middleV) {
//             left.push(arr[i]);
//         } else {
//             right.push(arr[i]);
//         }
//     }
//     return quickSort(left).concat(middleV, quickSort(right))
// }

// // console.log(quickSort([1,0,4,4,3,2]));


// // 手写虚拟dom

// function vNode(tag, props, children) {
//     this.tag = tag;
//     this.props = props;
//     this.children = children;
// }

// function h(t, p, c) {
//     return new vNode(t, p, c);
// }

// // console.log(obj, 'obj')

// // 手写双向绑定

// // 双向绑定 过

// // 手写深拷贝，手写浅拷贝

// // 手写浅拷贝吧

// let arr_shadow = [1,2,3,4];

// arr_shadow.slice(1);

// arr_shadow.concat([5,6,7]);

// function shallowCopy(obj) {
//     if(typeof obj !== 'object') {
//         return obj;
//     }
//     let targetObj = obj instanceof Array ? [] : {};
//     for(let key in obj) {
//         targetObj[key] = obj[key]
//     }
//     return targetObj;
// }

// 写下深拷贝

// JSON.parse(JSON.stringify(obj))

// 不能循环引用
// 不能拷贝函数，
// 不能 其他类型的值
// 
// 获取类型

// 这个里面还有很多的类型

// symbol
let symbolType = '[object Symbol]';

// array;
let arrayType = '[object Array]';

// object;
let objectType = '[object Object]';

// set;
let setType = '[object Set]';

// map;
let mapType = '[object Map]';

// let objType = [symbolType, arrayType]



function getType(value) {
    return Object.prototype.toString.call(value)
}

function getInit(value) {
    var ctor = value.constructor;
    return new ctor();
}

function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}



function deepCopy(obj, map) {
    
    // 判断是否是原始类型
    
    if(typeof obj !== 'object') {
        return obj;
    }

    let type = getType(obj);

    // 初始化  // 这里的初始化是什么意思呢？ 是如何初始化的。

    let target = getInit(obj); // 这里是初始化

    // 为了循环引用
    
    if(map.get(obj)) {
        return map.get(obj);
    }

    map.set(obj, target); // 这里是如何存取值的呢

    // console.log(obj)

    // 开始分类了 symbol
    // 我觉得上面处理过了，所以这里就不再处理了
    // if(type === symbolType) {
        
    // }

    // if(type === symbolType) {
    //     return Object(String.prototype.valueOf.call(target))
    // }

    if(type === mapType) {
        obj.forEach((value, key) => {
            target.set(key, deepCopy(value, map))
        })
        return target
    }

    if(type === setType) {        
        obj.forEach((value) => {
            target.add(deepCopy(value, map))
        })
        return target;
    }

    // 数组类型 or 对象类型，我觉得是可以合到一块的
    // 但是基于类型不一样

    // target = type === arrayType ? [] : {}

        for(let key in obj) {
            
            target[key] = deepCopy(obj[key], map)
        }
    
    
    return target;
}


// const mapTag = '[object Map]';
// const setTag = '[object Set]';
// const arrayTag = '[object Array]';
// const objectTag = '[object Object]';
// const argsTag = '[object Arguments]';

// const boolTag = '[object Boolean]';
// const dateTag = '[object Date]';
// const numberTag = '[object Number]';
// const stringTag = '[object String]';
// const symbolTag = '[object Symbol]';
// const errorTag = '[object Error]';
// const regexpTag = '[object RegExp]';
// const funcTag = '[object Function]';

// const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


// function forEach(array, iteratee) {
//     let index = -1;
//     const length = array.length;
//     while (++index < length) {
//         iteratee(array[index], index);
//     }
//     return array;
// }

// function isObject(target) {
//     const type = typeof target;
//     return target !== null && (type === 'object' || type === 'function');
// }

// function getType(target) {
//     return Object.prototype.toString.call(target);
// }

// function getInit(target) {
//     const Ctor = target.constructor;
//     return new Ctor();
// }

// function cloneSymbol(targe) {
//     return Object(Symbol.prototype.valueOf.call(targe));
// }

// function cloneReg(targe) {
//     const reFlags = /\w*$/;
//     const result = new targe.constructor(targe.source, reFlags.exec(targe));
//     result.lastIndex = targe.lastIndex;
//     return result;
// }

// function cloneFunction(func) {
//     const bodyReg = /(?<={)(.|\n)+(?=})/m;
//     const paramReg = /(?<=\().+(?=\)\s+{)/;
//     const funcString = func.toString();
//     if (func.prototype) {
//         const param = paramReg.exec(funcString);
//         const body = bodyReg.exec(funcString);
//         if (body) {
//             if (param) {
//                 const paramArr = param[0].split(',');
//                 return new Function(...paramArr, body[0]);
//             } else {
//                 return new Function(body[0]);
//             }
//         } else {
//             return null;
//         }
//     } else {
//         return eval(funcString);
//     }
// }

// function cloneOtherType(targe, type) {
//     const Ctor = targe.constructor;
//     switch (type) {
//         case boolTag:
//         case numberTag:
//         case stringTag:
//         case errorTag:
//         case dateTag:
//             return new Ctor(targe);
//         case regexpTag:
//             return cloneReg(targe);
//         case symbolTag:
//             return cloneSymbol(targe);
//         case funcTag:
//             return cloneFunction(targe);
//         default:
//             return null;
//     }
// }

// function clone(target, map = new WeakMap()) {

//     // 克隆原始类型
//     if (!isObject(target)) {
//         return target;
//     }

//     // 初始化
//     const type = getType(target);
//     let cloneTarget;
//     if (deepTag.includes(type)) {
//         cloneTarget = getInit(target, type);
//     } else {
//         return cloneOtherType(target, type);
//     }

//     // 防止循环引用
//     if (map.get(target)) {
//         return map.get(target);
//     }
//     map.set(target, cloneTarget);

//     // // 克隆set
//     // if (type === setTag) {
//     //     target.forEach(value => {
//     //         cloneTarget.add(clone(value,map));
//     //     });
//     //     return cloneTarget;
//     // }

//     // // 克隆map
//     // if (type === mapTag) {
//     //     target.forEach((value, key) => {
//     //         cloneTarget.set(key, clone(value,map));
//     //     });
//     //     return cloneTarget;
//     // }

//     // 克隆对象和数组
//     const keys = type === arrayTag ? undefined : Object.keys(target);
//     forEach(keys || target, (value, key) => {
//         if (keys) {
//             key = value;
//         }
//         cloneTarget[key] = clone(target[key], map);
//     });

//     return cloneTarget;
// }

// 测试脚本

let map = new Map();
map.set(4, 5)

let set = new Set();
set.add({'a':1})

let symbol = Symbol(1);


let obj = {
    property1: 1,
    map: map,
    set: set,
    symbol: symbol,
    object: {a: 1},
    arr: [1,2,3,4]
}

obj.obj = obj;

// console.log(clone(obj, new WeakMap()));

// console.log(deepCopy(obj, new Map()));


function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

// console.log(isObject(symbol));


// 手写数组拍平 // 写带传参数的

function flatten(arr, n) {
    return n > 0 ?
    arr.reduce((prev, cur) => {
         cur instanceof Array ? prev = prev.concat(flatten(cur, n-1)) : prev.push(cur)
        // return prev;
        return prev;
    }, [])
    : arr.slice()
}

let arr = [1,2,3,4,5,[6,7,[8]]];


// console.log(flatten(arr, 2))

// 手写数组去重 写两种方式

// 第一个先写简单一点的。es6 方法。

// console.log(Array.from(new Set([1,2,2,3,3,4])))


// 第二种使用 filter

function myTrim(arr) {
    return arr.filter((item, i) => arr.indexOf(item) === i)
}

// console.log(myTrim([1,2,2,3,3,4]))


// 实现instanceof 方法

function myInstanceof(L, R) {
    // l， r 代表它的前面和后面
    let O = R.prototype
    L = L.__proto__
    while(true) {
        if(L === null) return false;
        if(L === O) return true;
        L = L.__proto__
    }
}

// arr instanceof Array

// func instanceof Function

function Func() {

}

func = new Func()

// console.log(func.__proto__ === Func.prototype)

// console.log(Func.prototype.__proto__ === Object.prototype)

// console.log(Object.prototype.__proto__ === null)

// 给定一个字符串数组，请输出先按字符串长度排序，如果长度相等按照ASCII码值排序

// 你曾经做到过的

let arr8 =  ['aaa', 'abc', 'cc', 'rrr', 'dd', 'df', 'da', 'aaa']

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

// console.log(sortLetter(arr8))


// 给定一个字符串，请统计字符串中出现最多的字母和次数，结果返回一个对象 {str: , num:}

// 举例说明 例如：`aaaabbaa`

// 还是用一一对应的关系
// 还是两个数组比较好一点

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


console.log(getRes('bababa'))

// 数字千分位，字符串，正则，全局，三种方式

// 数字千分位  字符串

// 举例说明
// 比如 1123456.78


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

// console.log(transformNum(0.78))

// 正则表达式实现

function transformNum1(value) {
    let arr = String(value).split('.');
    // 分为两块，后一块不需要动
    // 前块需要用替换 1,123,456
    arr[0] = arr[0].replace(/\B(?=(\d{3})+$)/g, ',')
    
    return arr.join('.')
}

console.log(transformNum1(123456.78))


// 全局我也不太常写呀

function formatNumber2(num) {
    const parts = String(num).split('.');
    parts[0] = Number(parts[0]).toLocaleString();
    return parts.join('.')
}

// 函数柯里化

// add(0)  ==> 函数 add(0)(1) // 直到全部的参数传递完毕，才得出结果，否则永远返回的都是函数

// let curried = curry(f)   // 然后这个curried和上面的

function curry(fn, arr = []) {
    return (...args) => {
        if([...arr, ...args].length === fn.length) {
            return fn(...arr, ...args)
        } else {
            return curry(fn, [...args, ...arr])  // 需要把参数全部传进去，然后再接受新的参数
        }
    }
}

// 洗牌算法：将数组中的数字，打乱顺序，保证每个位置的概率相等，然后得到一个被打乱了的数组

// 请问考察的知识点和思路是什么呢？

// 首先应该是交换，交换的下标是随机的，还有一个条件是这个随机下标的范围在 [0 原数组的长度]， 然后循环一遍交换

// 我觉得你可以默写一遍了

function flush(num = []) {
    for(let i = 0; i < num.length; i++) {
        let index = Math.floor(Math.random() * num.length);
        let temp = num[i]; // 想要交换的值
        num[i] = num[index];
        num[index] = temp;
    }
    return num;
}

console.log(flush([3,4,5,2,3]))


// 菲波那契数列

function fibonacci(num) {
    if(num < 2) {
        return num;
    }
    return fibonacci(num-2) + fibonacci(num-1)
}

// 算法部分

// 无重复字符的最长子串

// 举例说明 'abcdefgaaaef'

var lengthOfLongestSubstring = function (s) {
    let l = 0;
    let res = 0; 
    const map = new Map();
    for(let r = 0; r < s.length; r += 1) {
        if(map.has(s[r]) && map.get(s[r]) >= l) {
            l = map.get(s[r]) + 1;
        }
        res = Math.max(res, r - l + 1);
        map.set(s[r], r);
    }
    return res;
}

console.log(lengthOfLongestSubstring('abbcdea'))

// 重新默写一遍上面的这个答案
// 用的是双指针，移动
function getRes2(str) {
    let l = 0;
    let res = 0;
    let map = new Map();
    for(let i = 0; i < str.length; i++) {
        if(map.has(str[i]) && map.get(str[i]) >= l) {
            l = map.get(str[i]) + 1;
        }
        res = Math.max(res, i-l+1);
        map.set(str[i], i)
    }
    return res;
}

console.log(getRes2('abbcdea'))

// 验证回文字符串II
// 给定一个非空字符串 s, 最多删除一个字符，判断是否能成为回文字符串？？
// abcdcba  aaba abaabad  一定是旁边或者中间的某个元素吗？
// 比较愚笨的办法就是，每个位置的值，都删除一次了，然后看存不存在就好了


// 验证回文字符串   简单版

function getRes3(str) {
    str = str.replace(/[^0-9a-zA-Z]/g, '');
    return str.split('').reverse().join('') === str;
}

console.log(getRes3('aibcddcba'))

// 回文字符串II

function getRes4(str) {
    if(str.length < 2) return true;
    str = str.replace(/[^0-9a-zA-Z]/g, '');

    for(let i = 0; i < str.length; i++) {
        let newStr = str.slice(0, i) + str.slice(i+1);
        let new_str = newStr.split('').reverse().join('');

       if(new_str === newStr) {
            return true;
       }
    }
    return false;
}

// 还有其他的解法喽

// 上面

console.log(getRes4('abccb'))

// 12月11日
// 继续回文字符串II 
// 思路：遍历字符串的一半，如果这个值和其应该对应的回文位置的值不相等的话，那么尝试删除。
// 因此这样的话，就是加上判断条件，就能够省掉很多次位置的删除。
// 我已经看过答案了，默写一遍吧

function getRes5(str) {
    const len = str.length;
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

// 完整答案
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

console.log(getRes5('abc'), '哈哈哈')

// 路径总和  leetCode 12

// 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径。这条路径上所有节点值
// 相加等于目标和  因此这个仅仅是返回布尔值

function hasPathSum(root, sum) {
    if(!root) return false;
    let res = false;
    const dfs = (n, s) => {
        if(!n.left && !n.right && s === sum) {res = true}
        if(n.left) dfs(n.left, s + n.left.val);
        if(n.right) dfs(n.right, s + n.right.val);
    }
    dfs(root, root.val)
    return res;
}

// 二叉树找指定和的路径

// 其实这个思路是类似的。

function pathSum(root, sum) {
    if(!root) return [];
    let res = [];
    const dfs = (n, s, path) => {
        if(!n.left && !n.right && s === sum) {
            res.push(path);
        }
        if(n.left) dfs(n.left, s + n.left.val, path.concat(n.left.val));
        if(n.right) dfs(n.right, s + n.right.val, path.concat(n.right.val));
    }
    dfs(root, root.val, [root.val]);
    return res;
}

// x的平方根    leetCode69 

// 第一种方法  暴力递增
// 先来写这种

function mySqrt(x) {
    // 暴力递增
    let i = x;

    while(!(i * i <= x && (i +1) * (i+1) > x)) {
        i = i - 1;
    }
    return i;
}

// 既然想出了临界条件，为什么不能加个否，不就全部都解决了

console.log(mySqrt(4), '4444')



// 第二种方法  二分查找
// 刚看过一遍答案了，请重新默写一遍

function mySqrt2(x) {
    let l = 0;
    let r = x;
    let m = 0;
    let res = 0;
    while(l <= r) {
        m = Math.floor((l+r)/2);
        if(m * m <= x) {
            res = m;
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return res;
}

console.log(mySqrt2(16), '4444')


// 广度优先遍历，深度优先遍历

// 深度优先遍历比较简单

function dfs(root) {
    if(!root && !root.right && !root.left) return;
    if(root.left) dfs(root.left);
    if(root.right) dfs(root.right);
}

// 广度优先遍历比较难

// 默写一遍吧

function bfs(root) {
    let q = [root];
    while(q.length) {
        let n = q.shift();
        if(!n.left && !n.right) return;
        if(n.left) q.push(n.left);
        if(n.right) q.push(n.right);
    }
}


// 最长连续递增序列   leetCode 674

// 题目描述

// 给定一个未经排序的整数数组，找到最长且连续递增的子序列，并返回该序列的长度。

// 输入 nums = [1, 3, 5, 4, 7];

function getRes6(num) {
    let temp = 1;
    let res = 1;
    for(let i = 0; i < num.length-1; i++) {
        if(num[i+1] >= num[i]) {
            temp++;
        } else {
            res = Math.max(res, temp);
            temp = 1;
        }
    }
    return res;
}

console.log(getRes6([5,3,5,4,7]));


// 最长连续子序列

// 给定一个未排序的整数数组 nums，找出数字连续的最长序列 的长度

// 输入 nums = [100, 4, 200, 1, 3, 2]
// 比该值大1的是否存在，比该值小1的是否存在

// 其实这个也不是很难呀

function getRes7(nums) {
    let setNums = new Set(nums);
    let count = 0;
    let res = 0;
    nums.forEach(n => {
        let v = n;
        count = 0;
        while(setNums.has(v)) {
           count++;
           v++; 
        }
        res = Math.max(res, count);
    })
    return res;
}

// 二分查找    leetCode 74

// 题目描述

// 给定一个排序好的数组，用二分查找的办法找出目标元素，返回其下标


function search(nums, target) {
    let len = nums.length;
    let l = nums[0];
    let r = nums[len-1];
    let res = 0;
    for(let i = 0; i < len; i++) {
        if(nums[i] <= target) {
            res = i;
            l = nums[i+1];
        } else {
            r = nums[len-i]
        }
    }
    return res;
}

console.log(search([1,2,3], 3))


// 数组的全排列问题

// 题目描述
// 给定一个没有重复数字的序列，返回其所有可能的全排列

// 手动默写下如下值吧  9月15日 ～ 12月15日 我已经辞职3个月了

var permute = function(nums) {
// 自己再默写一遍吧
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
    backtrack([])
    return res;
}

// 分饼干问题 LeetCode 455
// 手抄一遍吧

// s 代表饼干，g 代表3个小孩的胃口值
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





















