// 记录所有手写

```js
Object.prototype.myCall = function (context, ...params) {
    if(typeof this !== 'function') {
        throw TypeError('holp caller is function')
    }

    let fn = Symbol('fn')

    let obj = context || window

    obj[fn] = this
    
    let res = obj[fn](...params)

    delete obj[fn]
    return res;
}
```


```js
// 默写一遍 bind

Object.prototype.myBind = function(context, ...arg) {
    if(typeof this !== 'function') {
        // 抛错
    }

    let obj = context || window

    return (...arg2) {
        this.call(obj, ...arg, ...arg2)
    }
}
```

实现 instanceof

```js
function instance(L, R) {
    let l = L.__proto__
    let r = R.prototype
    while(true) {
        if(l === null) return false
        if(l === r) return true
        l = l.__proto__
    }
}
```

// 手写 promise
```js
// 三个状态： PENDING、FULFILLED、REJECTED

const PENDING = 'PENDING';

const FULFILLED = 'FULFILLED';

const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {

        this.status = PENDING;
        // 存放成功状态的值
        this.value = undefined;
        // 存放失败状态的值
        this.reason = undefined;

        // 调用此方法就是成功
        let resolve = (value) => {
            // 状态为 PENDING 时 才可以更新状态
            if(this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value
            }
        }
        // 调用此方法就是失败
        let reject = (reason) => {
            if(this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
            }
        }

        try {
            // 立即执行，将resolve 和 reject 函数，传给使用者
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    // 包含一个 then 方法， 并接收两个参数 onFulfilled、onRejected
    then(onFulfilled, onRejected) {
        if(this.status === FULFILLED) {
            onFulfilled(this.value)
        }

        if(this.status === REJECTED) {
            onRejected(this.reason)
        }
    }
}
```

