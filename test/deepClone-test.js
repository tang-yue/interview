// 浅拷贝

// function clone(target) {
//     let cloneTarget = {};
//     for(const key in target) {
//         cloneTarget[key] = target[key];
//     }
//     return cloneTarget;
// }


// 深拷贝

// function clone(target) {
//     if(typeof target === 'object') {
//         let cloneTarget = {};
//         for(const key in target) {
//             cloneTarget[key] = clone(target[key]);
//         }
//         return cloneTarget;
//     } else {
//         return target;
//     }
// }

// const target = {
//     field1: 1,
//     field2: undefined,
//     field3: 'ConardLi',
//     field4: {
//         child: 'child',
//         child2: {
//             child2: 'child2'
//         }
//     }
// }

// console.log(clone(target))



// 默写一遍深拷贝

// function deepClone(target) {
//     if(typeof target === 'Object') {
//         let cloneTarget = {}
//         for(key of target) {
//             cloneTarget[key] = target[key]
//         }
//         return cloneTarget
//     } else {
//         return target
//     }
// }



// const target = {
//     field1: 1,
//     field2: undefined,
//     field3: 'ConardLi',
//     field4: {
//         child: 'child',
//         child2: {
//             child2: 'child2'
//         }
//     }
// }




// 兼容数组

// function deepClone(target) {
//     if(typeof target === 'object') {
//         let cloneTarget = Array.isArray(target) ? [] : {};
//         for(const key in target) {
//             cloneTarget[key] = deepClone(target[key])
//         }
//         return cloneTarget;
//     } else {
//         return target;
//     }
// }

// const target = {
//     field1: 1,
//     field2: undefined,
//     field3: {
//         child: 'child'
//     },
//     field4: [2, 4, 8]
// };

// target.target = target;

// console.log(deepClone(target))


// 知识就是循环往复的过程

// function clone(target, map = new Map()) {
//     if(typeof target === 'object') {
//         let cloneTarget = Array.isArray(target) ? [] : {};
//         if(map.get(target)) {
//             return map.get(target)
//         }
//         map.set(target, cloneTarget);
//         for (const key in target) {
//             cloneTarget[key] = clone(target[key], map)
//         }
//         return cloneTarget
//     } else {
//         return target;
//     }
// }


// 重新默写一遍

// function deepClone(target, map = new Map()) {
//     if(typeof target === 'object') {
//         let cloneTarget = Array.isArray(target) ? [] : {}

//         if(map.get(target)) {
//             return map.get(target)
//         }
//         map.set(target, cloneTarget)
        
//         for (const key in target) {
//             cloneTarget[key] = deepClone(target[key], map)
//         }
//         return cloneTarget
//     } else {
//         return target;
//     }
// }


// const target = {
//     field1: 1,
//     field2: undefined,
//     field3: {
//         child: 'child'
//     },
//     field4: [2, 4, 8]
// };

// target.target = target;

// console.log(deepClone(target))


// 再一次重新默写下

// function clone(target, map = new WeakMap()) {
//     if(typeof target === 'object') {
//         let cloneTarget = Array.isArray(target) ? [] : {}
//         if(map.get(target)) {
//             return map.get(target)
//         }
//         map.set(target, cloneTarget);
//         for(const key in target) {
//             cloneTarget[key] = clone(target[key], map)
//         }
//         return cloneTarget
//     } else {
//         return target;
//     }
// }


// const target = {
//     field1: 1,
//     field2: undefined,
//     field3: {
//         child: 'child'
//     },
//     field4: [2, 4, 8]
// };


// function isObject(target) {
//     const type = typeof target;
//     return target !== null && (type === 'object' || type === 'function');
// }

// console.log(isObject(target), 'target11 target11')

// target.target = target;

// console.log(clone(target))

// let clone = [1,2,3,4,5];


// forEach(clone, (key, value) => {
//     console.log(key, value)
// })

// 再重新写一遍

// const mapTag = '[object Map]';
// const setTag = '[object Set]';
// const arrayTag = '[object Array]';
// const objectTag = '[object Object]';

// // symbol

// const symbolTag = '[object Symbol]'

// const deepTag = [mapTag, setTag, arrayTag, objectTag]


// function isObject(target) {
//     const type = typeof target
//     return type !== null &&(type === 'object' || type === 'function')
// }

// function getType(target) {
//     return Object.prototype.toString.call(target)
// }

// function getInit(target) {
//     const Ctor = target.constructor;
//     return new Ctor()
// }


// function clone(target, map = new Map()) {

//     // 克隆原始类型
//     if(!isObject(target)) {
//         return target;
//     }

//     // 初始化
//     const type = getType(target);
//     let cloneTarget;

//     if(deepTag.includes(type)) {
//         cloneTarget = getInit(target, type)
//     }

//     // 防止循环引用
//     if(map.get(target)) {
//         return map.get(target);
//     }

//     map.set(target, cloneTarget);

//     // 克隆Set
    
//     if(type === setTag) {
//         target.forEach(value => {
//             cloneTarget.add(clone(value, map))
//         });
//         return cloneTarget;
//     }

//     // 克隆map
//     if(type === mapTag) {
//         target.forEach((value, key) => {
//             cloneTarget.set(key, clone(value, map))
//         })
//         return cloneTarget;
//     }

//     // 克隆 Symbol
//     if(type === symbolTag) {
//         return Object(Symbol.prototype.valueOf.call(target));
//     }

//     // 克隆对象和数组

    // cloneTarget = type === arrayTag ? [] : {}

//     for(const key in target) {
//         cloneTarget[key] = clone(target[key], map)
//     }

//     return cloneTarget;
// }


// // 测试用列

// const map = new Map();
// map.set('1', '1111')
// map.set('2', '2222')
// const set = new Set([1,2,{'3':'4'}])

// const target = {
//     field1: 1,
//     field2: undefined,
//     field3: {
//         child: 'child'
//     },
//     field4: [2, 4, 8],
//     empty: null,
//     map,
//     set,
//     symbol: Symbol(42)
// };

// const symbol1 = Symbol(42)

// console.log(symbol1)

// 再重新默写一遍

// 比较考验人的短期记忆力


// const mapTag = '[object Map]'

// const setTag = '[object Set]'

// const objTag = '[object Object]'

// const arrTag = '[object Array]'


// const deepTag = [mapTag, setTag, objTag, arrTag]

// // const deepTag = []

// function getObject(target) {
//     const type = typeof target
//     return (type !== null && (type === 'function' || type === 'object'))
// }

// function getType(target) {
//     return Object.prototype.toString.call(target)
// }

// function getInit(target) {
//     const ctor = target.constructor;
//     return new ctor()
// }

// function clone(target, map = new WeakMap()) {

//     // 原始类型
//     if(!getObject(target)) {
//         return target
//     }

//     // 初始化了下
//     let cloneTarget;
//     let type = getType(target)

//     if(deepTag.includes(type)) {
//         cloneTarget = getInit(target)
//     }

//     // 防止循环引用

//     if(map.get(target)) {
//         return map.get(target)
//     }
//     map.set(target, cloneTarget)

//     // 克隆map

//     if(type === mapTag) {
//         target.forEach((value, key) => {
//             cloneTarget.set(key, clone(value, map))
//         })
//         return cloneTarget
//     }

//     // 克隆set
    
//     if(type === setTag) {
//         target.forEach((value) => {
//             cloneTarget.add(clone(value, map))
//         })
//         return cloneTarget
//     }

//     // 克隆数组和对象

//     for(const key in target) {
//         cloneTarget[key] = clone(target[key], map)
//     }
    
//     return cloneTarget 
// }


// 测试用列


// const map = new Map();
// map.set('1', '1111')
// map.set('2', '2222')
// const set = new Set([1,2,{'3':'4'}])

// const target = {
//     field1: 1,
//     field2: undefined,
//     field3: {
//         child: 'child'
//     },
//     field4: [2, 4, 8],
//     empty: null,
//     map,
//     set,
//     symbol: Symbol(42)
// };

// target.target = target

// console.log(target)

// 再手写一遍promise，简版

// 先定义三种状态

// const PENDING = 'PENDING';

// const FULFILLED = 'FULFILLED';

// const REJECTED = 'REJECTED';


// class Promise {
//     constructor(executor) {
//         this.status = PENDING;
//         this.value = undefined;
//         this.reason = undefined;

//         this.onResolvedCallbacks = []    // 用于存放成功状态的回调
//         this.onRejectedCallbacks = []    // 用于存放失败状态的回调

//         const resolve = (value) => {
//             if(this.status === PENDING) {
//                 this.status = FULFILLED;
//                 this.value = value;
//                 this.onResolvedCallbacks.forEach((fn) => {
//                     fn()
//                 })
//             }
//         }

//         const reject = (reason) => {
//             if(this.status === PENDING) {
//                 this.status = REJECTED;
//                 this.reason = reason;
//                 this.onRejectedCallbacks.forEach((fn) => {
//                     fn()
//                 })
//             }
//         }

//         try {
//             executor(resolve, reject)
//         } catch(err) {
//             reject(err)
//         }
//     }

//     then(onFulFilled, onRejected) {
//         if(this.status === FULFILLED) {
//             onFulFilled(this.value)
//         }

//         if(this.status === REJECTED) {
//             onRejected(this.reason)
//         }

//         if(this.status === PENDING) {
//             this.onResolvedCallbacks.push(() => onFulFilled(this.value))
//             this.onRejectedCallbacks.push(() => onRejected(this.reason))
//         }
//     }
// }

// // 写完测试下

// new Promise((resolve, reject) => {
//    setTimeout(function() {
//        resolve('success')
//    }, 2000)
// }).then((data) => {
//     console.log('success', data)
// })

// 下面再处理下 异步调用的问题。

// 实现一个简版koa, 默写

// 思路：

const http = require('http')

function compose (middlewares) {
    return ctx => {
        const dispatch = (i) => {
            const middleware = middlewares[i]
            if(i === middlewares.length) {
                return
            }
            return middleware(ctx, () => dispatch(i+1))
        }
        return dispatch(0)
    }
}

// 要定义一个应用，要定义个上下文

class Application {
    constructor() {
        this.middlewares = []
    }

    use (middleware) {
        this.middlewares.push(middleware)
    } 

    listen (...args) {
        const server = http.createServer((req, res) => {
            // 构造Context 对象
            const ctx = new Context(req, res)

            try {
                const fn = compose(this.middlewares)
                fn(ctx)
            } catch (e) {
                console.error(e)
                ctx.res.statusCode = 500
                ctx.res.write('Internel Server Error')
            }

            // ctx.body 为响应内容

            ctx.res.send(ctx.body)
        })

        server.listen(...args)
    }
}


// 构造一个 Context 的类

class Context {
    constructor (req, res) {
        this.req = req;
        this.res = res;
    }
}


const app = new Application()


app.use(async(ctx, next) => {
    ctx.body = 'hello, one'
    await next()
})

app.use(async(ctx, next) => {
    ctx.body = 'hello, ----'
    await next()
})

app.listen(7000)







