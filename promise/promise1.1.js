const PENDING = 'pending' // 等待态
const FULFILLED = 'fulfilled' // 成功态
const REJECTED = 'rejected' // 失败态

class Promise {
constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
        if(this.status === PENDING) {
            this.value = value
            this.status = FULFILLED
            this.onResolvedCallbacks.forEach((fn) => {
                fn()
            })
        }
    }

    const reject = (reason) => {
        if(this.status === PENDING) {
            this.reason = reason
            this.status = REJECTED
            this.onRejectedCallbacks.forEach((fn) => {
                fn()
            })
        }
    }

    try {
        executor(resolve, reject) // 如果执行这个executor 执行时候抛出异常，应该走下一个then的失败
    } catch (e) {
        reject(e) // 出错了， reason就是错误
    }
}


then(onFulfilled, onRejected) {
    let promise2

    promise2 = new Promise((resolve, reject) => {
        if(this.status === FULFILLED) {
            setTimeout(() => {
                try {
                    // 这个返回值是成功函数的执行结果
                    let x = onFulfilled(this.value)
                    // 判断promise2 和 x 也是then 函数返回的结果和promise2的关系， 如果x 是普通值，那就让promise2成功，如果是一个失败的promise
                    // 那就让promise2 失败
                    self._resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            }, 0)
        }

        if(this.status === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason)
                    this._resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            }, 0)
        }
        
        if(this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        this._resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            });
            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        this._resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            })
        }
    })
    return promise2
}
// 内部核心方法 处理， 成功或者失败执行的返回值 和 promise2的关系
_resolvePromise(promise2, x, resolve, reject) {
// 有可能这个x 是一个promise 但是 这个 promise 并不是我自己的
if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
}
// 不单单需要考虑自己 还有考虑 有可能是别人的promise

let called;  // 文档要求，一旦成功了，不能调用失败
if((x !== null && typeof x === 'object') || typeof x === 'function') {
    // 这样只能说 x 可能是一个 promise
    try {
        let then = x.then  // 取 then 方法
        if(typeof then === 'function') {
            then.call(x, y => {      // resolve(new Promise)
                if(called) return
                called = true
                resolvePromise(promise2, y, resolve, reject)  // 递归检查promise
            }, reason => {
                if(called) return
                called = true
                reject(reason)
            })
        } else {
            resolve(x);  // 普通值
        }
    } catch (e) { // 如果取 then 方法 出错了，就走失败
        if(called) return
        called = true
        reject(e)
    }
} else { // 普通值
    resolve(x)
}
}

// 基于Promise实现Deferred 也提供给`promises-aplus-tests`做检查
    static deferred () {
        let dfd = {}
        dfd.promise = new Promise((resolve, reject) => {
            dfd.resolve = resolve
            dfd.reject = reject
        })
        return dfd    
    }
}

module.exports = Promise