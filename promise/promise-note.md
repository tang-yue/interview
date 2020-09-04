## 手写一个 promise

可以根据[promise/A+ 规范](https://promisesaplus.com/)，按照标准一步一步来。

需要三个状态：

```js
const PENDING = 'pending' // 等待态
const FULFILLED = 'fulfilled' // 成功态
const REJECTED = 'rejected' // 失败态
```
+ 当状态为 pending 时
   - 可能转换为fulfilled或rejected
+ 当状态为 fulfilled 或 rejected 时
   - 不能转换为其他状态
   - 必须有一个value 或 reason 且不能改变

```js
// 基础版 promise
// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    // 默认状态为 PENDING
    this.status = PENDING;
    // 存放成功状态的值，默认为 undefined
    this.value = undefined;
    // 存放失败状态的值，默认为 undefined
    this.reason = undefined;

    // 调用此方法就是成功
    let resolve = (value) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    } 

    // 调用此方法就是失败
    let reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    }

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者  
      executor(resolve,reject)
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error)
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}
```

用下面脚本测试下：


```js
    const promise = new Promise((resolve, reject) => {
        resolve('成功')
    }).then((data) => {
        console.log('success', data)
    }, (err) => {
        console.log('faild', err)
    })

    // 测试结果
    'success' '成功'
```

### 处理异步

如果在 executor() 中传入一个异步操作的话呢，执行脚本后发现，promise 没有任何返回。

思路：因为promise 调用then 方法时，当前的promise 并没有成功，一直处于pending状态。所以如果当调用then方法时，当前状态是pending，我们需要先将

成功和失败的回调分别存放起来，在executor() 的异步任务被执行时，触发resolve 或 reject，依次调用成功或失败的回调。

```js
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
            // 处理异步
            this.onResolvedCallbacks = [];  // 新增  一个数组存放成功处理
            this.onRejectedCallbacks = [];  // 新增  一个数组存放失败处理

            // 调用此方法就是成功
            let resolve = (value) => {
                // 状态为 PENDING 时 才可以更新状态
                if(this.status === PENDING) {
                    this.status = FULFILLED
                    this.value = value
                    this.onResolvedCallbacks.forEach((fn) => {   // 新增 触发时遍历所有
                        fn()
                    })
                }
            }
            // 调用此方法就是失败
            let reject = (reason) => {
                if(this.status === PENDING) {
                    this.status = REJECTED;
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach((fn) => {    // 新增 触发时遍历所有
                        fn()
                    })
                }
            }
            
            // 处理异常情况
            try {
                // 立即执行，将resolve 和 reject 函数，传给使用者
                executor(resolve, reject)
            } catch (error) {
                reject(error)  // 出错了 reason 就是错误
            }
        }

        // 包含一个 then 方法， 并接收两个参数函数 onFulfilled、onRejected
        then(onFulfilled, onRejected) {
            if(this.status === FULFILLED) {
                onFulfilled(this.value)
            }

            if(this.status === REJECTED) {
                onRejected(this.reason)
            }

            if(this.status === PENDING) {  // 新增 处理异步
                // 默认当前 new Promise  executor 中是有异步的
                // 如果promise 的状态是 pending, 需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
                this.onResolvedCallbacks.push(() => {
                    onFulfilled(this.value)
                });
                this.onRejectedCallbacks.push(() => {
                    onRejected(this.reason)
                })
            }
        }
    }
```

用下面的脚本测试下：

```js
 const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('成功')
        }, 1000)
    }).then(
    (data) => {
        console.log('success', data)
    },
    (err) => {
        console.log('faild', err)
    }
)

// 测试结果
'success' '成功'
```

### 处理then的链式调用

在这儿需要返回一个新的promise 而不是当前，因为成功态和失败态是不能转为其他状态的

```js
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
    // 内部核心方法，处理 成功或者失败执行的返回值， 和promise2的关系
    _resolvePromise(promise2, x, resolve, reject) {
        resolve(x)
    }
}
```

用下面的脚本进行测试：

```js
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('xxx')
        }, 1000)
    })

    promise.then((data) => {
        console.log('p success', data)
        return 1
    }, (err) => {
        console.log(err)
    }).then((data) => {
        console.log('success then', data)
    }, (err) => {
        console.log(err)
    })
// 测试结果如下：
// 'p success' 'xxx'
// 'success' 'then' 1
```

### 完善_resolvePromise

需要考虑以下几种情况

`_resolvePromise(promise2, x, resolve, reject)`

+ x 为一个普通值
+ x 为promise2时会导致循环调用
+ x 为一个对象或者函数
   - x 为一个 promise

```js
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
```

执行如下代码测试：

```js
// 普通返回值
let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})
p.then((data) => {
  console.log(`p success ${data}`)
  return 'first result'
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log(`p success then ${data}`)
}, (err) => {
  console.log(`p error ${err}`)
})

// 测试结果：
// p success xxx
// p success then first result

// 抛错
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2 xxx')
    }, 1000)
})

p2.then((data) => {
    throw new Error('just happy')
}, (err) => {
    console.log(err)
}).then((data) => {
  console.log(`p2 success then ${data}`)
}, (err) => {
  console.log(`p2 error ${err}`)
})

// 测试结果：
// p2 error Error: just happy
```
以上所有代码实现在 [promise1.1.js](./promise1.1.js)

promise 的更多功能

+ catch 方法
+ 静态方法
+ finally 方法
+ all 方法
+ race 方法

[代码地址](./promise1.2.js)

以上就是简版的promise


