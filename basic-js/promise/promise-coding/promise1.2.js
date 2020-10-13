// const Promise = require("./promise1.1")

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
   
    // 下面是catch, finally, all race 方法的实现
    // 用于promise 方法链时，捕获前面onFulfilled/onRejected抛出的异常
    catch(onRejected) {
        return this.then(null, onRejected)
    }

    // 静态方法 resolve 和 reject
    static resolve(value) {
        return new Promise(resolve => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
    
    // finally 也是then 的一个简写

    finally(cb) {
        return this.then(data => {
            cb()
            return data
        }, err => {
            cb()
            throw err
        })
    }

    static all (promises) {
        return new Promise((resolve, reject) => {
            let resValues = [];
            let counts = 0;
            for(let i = 0; i < promises.length; i++) {
                promises[i].then((res) => {
                    counts++;
                    resValues[i] = res;
                    if(counts === promises.length) {
                        resolve(resValues)
                    }
                }, err => {
                    reject(err)
                })
            }
        })
    }

    /**
     * @desc 只要有一个promise对象进入FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
     * @param {Array<Promise>} promises 接收promise对象组成的数组作为参数
     * @return 返回一个Promise实例
     */

     static race (promises) {
         return new Promise((resolve, reject) => {
             promises.forEach((promise, index) => {
                promise.then(resolve, reject)
             })
         })
     }

     // 追加deferred方法以供检查
     static deferred() {
        let dfd = {}
        dfd.promise = new Promise((resolve, reject) => {
            dfd.resolve = resolve
            dfd.reject = reject
        })
        return dfd
     }
}

// 下面是测试用例

// let p1 = new Promise(resolve => { resolve('p1') })
// let p2 = new Promise(resolve => { setTimeout(() => { resolve('p2') }, 3000) })
// let p3 = new Promise(resolve => { resolve('p3') })
// let p4 = new Promise(resolve => { setTimeout(() => { resolve('p4') }, 1500) })
// let p5 = new Promise(resolve => { resolve('p5') })

// Promise.race([p1, p2, p3, p4, p5]).then((res) => {
//   console.log(res)
// }).catch(err => {
//   console.error(err)
// })

// catch
// let p = new Promise((resolve,reject) => {
//     setTimeout(() => {
//       resolve('xxx')
//     }, 1000)
//   })
//   p.then((data) => {
//     console.log(`p success then ${data}`)
//   }).then((data) => {
//     throw new Error('just happy')
//   }).catch(err => {
//     console.log(`p ${err}`)
//   })


// let p2 = Promise.resolve(100)
// p2.then(data => {
//   console.log(`p2 ${data}`)
// })
// let p3 = Promise.reject(999)
// p3.then(data => {
//   console.log(`p3 ${data}`)
// }).catch(err => {
//   console.log(`p3 err ${err}`)
// })


// let p4 = Promise.resolve(100)
// p4.then(data => {
//   throw new Error('error p4')
// }).finally(data => {
//   console.log(`p4 ahhh finally`)
// }).catch(err => {
//   console.log(`p4 err ${err}`)
// })

module.exports = Promise