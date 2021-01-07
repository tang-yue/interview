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

### then 方法

要满足以下重点条件

+ 处理 executor 函数中代码异常的情况
+ 处理 executor 函数中代码为异步的情况
+ 处理 then 的多次调用
+ 处理 then 的链式调用


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

### 处理异步改装版

改装的点

+ 去掉了then 方法里，根据不同状态，执行不同的步骤，改成都是添加函数到成功处理数组，or 失败处理数组
+ 在resolve 方法里，多加 setTimeout 方法，主要是为了处理非异步的情况，让先执行then 里的函数先添加，然后resolve 这边再执行

但是改装版，不利于理解下面 then 的进一步完善

```js
    const PENDING = 'PENDING';

    const FULFILLED = 'FULFILLED';

    const REJECTED = 'REJECTED';

    class APromise {
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
                // 使用 macro-task 机制(setTimeout),确保onFulfilled 异步执行，且在then 方法被调用的那一轮事件循环之后的新执行栈中执行
                // 加上这个，主要是为了处理executor 函数中代码为非异步的情况
                setTimeout(() => {
                    if(this.status === PENDING) {
                        this.status = FULFILLED
                        this.value = value
                        this.onResolvedCallbacks.forEach((fn) => {   // 新增 触发时遍历所有
                            fn(value)
                        })
                    }
                })
            }
            // 调用此方法就是失败
            let reject = (reason) => {
                setTimeout(() => {
                    if(this.status === PENDING) {
                        this.status = REJECTED;
                        this.reason = reason;
                        this.onRejectedCallbacks.forEach((fn) => {    // 新增 触发时遍历所有
                            fn(reason)
                        })
                    }
                })
            }
            
            // 处理异常情况
            try {
                // 立即执行，将resolve 和 reject 函数，传给使用者
                executor(resolve, reject)
                // 其实就是在这里执行的
            } catch (error) {
                reject(error)  // 出错了 reason 就是错误
            }
        }

        // 包含一个 then 方法， 并接收两个参数函数 onFulfilled、onRejected
        then(onFulfilled, onRejected) {
            // 改造就变成如下：
            typeof onFulfilled === 'function' && this.onResolvedCallbacks.push(onFulfilled);
            typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected);
        }
    }
```

用下面的多次调用then脚本测试下：

```js


 const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('成功')
        }, 1000)
    })
    
    p.then(
        (data) => {
            console.log('p success', data)
        },
        (err) => {
            console.log('faild', err)
        }
    )

    p.then((data) => {
        console.log('p second success', data)
    }, (err) => {
        console.log(err)
    })

// 测试结果
'success' '成功'
```

### 处理链式调用简版

改动的点：

+ 在上述基础上，在then函数里，返回this
+ resolve 函数里，成功处理的数组，内部函数是要多次执行的，并且下一次then内部函数的参数值，是上一个then的返回值，因此改造成`this.value = fn(this.value)`，保留上一次值

```js
const PENDING = 'PENDING';

const FULFILLED = 'FULFILLED';

const REJECTED = 'REJECTED';

    class APromise {
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
                // 使用 macro-task 机制(setTimeout),确保onFulfilled 异步执行，且在then 方法被调用的那一轮事件循环之后的新执行栈中执行
                // 加上这个setTimeout，主要是为了处理executor 函数中代码为非异步的情况，因为会出现 resolve() 函数在 then() 函数之前被调用，这就意味着 resolve() 被调用的时候，callback 还是 []。
                setTimeout(() => {
                    if(this.status === PENDING) {
                        this.status = FULFILLED
                        this.value = value
                        this.onResolvedCallbacks.forEach((fn) => {   // 新增 触发时遍历所有
                            this.value = fn(this.value)
                        })
                    }
                })
            }
            // 调用此方法就是失败
            let reject = (reason) => {
                setTimeout(() => {
                    if(this.status === PENDING) {
                        this.status = REJECTED;
                        this.reason = reason;
                        this.onRejectedCallbacks.forEach((fn) => {    // 新增 触发时遍历所有
                            this.reason = fn(this.reason)
                        })
                    }
                })
            }
            
            // 处理异常情况
            try {
                // 立即执行，将resolve 和 reject 函数，传给使用者
                executor(resolve, reject)
                // 其实就是在这里执行的
            } catch (error) {
                reject(error)  // 出错了 reason 就是错误
            }
        }

        // 包含一个 then 方法， 并接收两个参数函数 onFulfilled、onRejected
        then(onFulfilled, onRejected) {
            // 改造就变成如下：
            typeof onFulfilled === 'function' && this.onResolvedCallbacks.push(onFulfilled);
            typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected);
            
            return this
        }
    }
```

用链式调用的脚本测试下
```js
const p = new APromise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000)
})
    .then(res => {
        console.log(res);
        return res + 1;
    })
    .then(res => {
        console.log(res)
    })

// 2
// 3
```

### 一步一步完善then方法

要求：
+ 1. then方法必须返回一个promise对象
+ 2. 如果onFulfilled 或者onRejected 返回一个值，则运行下面的Promise解决过程：
`[[Resolve]](promise2, x)`
+ 3. 如果 onFulfilled 或者onRejected抛出一个异常e，则promise2 必须拒绝执行，并返回拒因e
+ 4. 如果 onFulfilled 不是函且promise1 成功执行，promise2 必须成功执行并返回相同的值
+ 5. 如果 onRejected 不是函数且 promise1拒绝执行，promise2 必须拒绝执行并返回相同的拒因
+ 6. 不论 promise1 被 reject 还是被resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected

#### 步骤一

将前三个要求合在一起

```js
// 首先，then方法必须返回一个promise对象
then(onFulfilled, onRejected) {
    let newPromise;
    return (newPromise = new APromise((resolve, reject) => {
        // 2. 如果onFulfilled 或者 onRejected 返回一个值x，则运行下面的 Promise 解决过程：[[Resolve]]（promise2, x）
        this.onResolvedCallbacks.push(value => {
            // 3. 如果 onFulfilled 或者 onRejected 抛出一个异常e, 则 promise2 必须拒绝执行，并返回拒因 e
            try {
                let x = onFulfilled(value);
                resolvePromise(newPromise, x)
            } catch (e) {
                reject(e)
            }
        })

        this.onRejectedCallbacks.push(reason => {
            try {
                let x = onRejected(reason);
                resolvePromise(newPromise, x)
            } catch(e) {
                reject(e);
            } 
        })
    }))
}

// 解决过程
function resolvePromise() {

}
```

#### 步骤二

将四 五 步 要求合在一起

```js
// 首先，then方法必须返回一个promise对象
then(onFulfilled, onRejected) {
    let newPromise;
    // 4. 如果 onFulfilled 不是函数且 promise1 成功执行，promise2 必须成功执行并返回相同的值。
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // 5. 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的拒因。

    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    
        return (newPromise = new APromise((resolve, reject) => {
        // 2. 如果onFulfilled 或者 onRejected 返回一个值x，则运行下面的 Promise 解决过程：[[Resolve]]（promise2, x）
        this.onResolvedCallbacks.push(value => {
            // 3. 如果 onFulfilled 或者 onRejected 抛出一个异常e, 则 promise2 必须拒绝执行，并返回拒因 e
            try {
                let x = onFulfilled(value);
                resolvePromise(newPromise, x)
            } catch (e) {
                reject(e)
            }
        })

        this.onRejectedCallbacks.push(reason => {
            try {
                let x = onRejected(reason);
                resolvePromise(newPromise, x)
            } catch(e) {
                reject(e);
            } 
        })
    }))
}
```

#### 步骤三

上述中的要求6

```js
// 首先，then方法必须返回一个promise对象
then(onFulfilled, onRejected) {
    let newPromise;
    // 4. 如果 onFulfilled 不是函数且 promise1 成功执行，promise2 必须成功执行并返回相同的值。
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // 5. 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的拒因。

    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    // 6. 对于一个promise，它的then方法可以调用多次。
    // 当在其他程序中多次调用同一个promise的then 时，由于之前状态已经为FULFILLED / REJECTED 状态，则会走以下逻辑，
    // 所以要确保为FULFILLED / REJECTED 状态后，也要异步执行 onFulfilled / onRejected，这里使用setTimeout

    // 不论promise1 被reject 还是被resolve 时 promise2 都会被resolve，只有出现异常时才会被rejected。
    // 由于在接下来的解决过程中需要调用resolve, reject 进行处理，处理我们在调用处理过程时，传入参数

    // ```
    // then 里面的FULFILLED/REJECTED状态时，为什么要加setTimeout ?
    // 原因：
    // 其一 对于一个promise，它的then方法可以调用多次.(当在其他程序中多次调用同一个promise的then 时，由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑)，所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected
    // resolve or reject 函数和 then 里面加 setTimeout 的原因
    // 总之都是让 then 方法异步执行，***也就是确保onFulfilled/onRejected异步执行***
    // ```


    // 如下面这种情景 多次调用 p1.then
    // p1.then((value) => {   // 此时 p1.status 由 pending 状态  => fulfilled 状态
    //     console.log(value);
    //     console.log(p1.status); // fulfilled
    //     p1.then(value => { // 再次p1.then 这时 已经为fulfilled状态， 走的是 fulfilled 状态判断里的逻辑 所以我们也要确保判断里面 onFulfilled 异步执行
    //         console.log(value); // 'resolve'
    //     })
    //     console.log('当前执行栈中同步代码')
    // })
    // console.log('全局执行栈中同步代码')

    if(this.status === FULFILLED) {
        return (newPromise = new APromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e)
                }
            })
        }))
    }

    if(this.status === REJECTED) {
        return (newPromise = new APromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e)
                }
            })
        }))
    }

    if(this.status === PENDING) {
        return (newPromise = new APromise((resolve, reject) => {
            // 2. 如果onFulfilled 或者 onRejected 返回一个值x，则运行下面的 Promise 解决过程：[[Resolve]]（promise2, x）
            this.onResolvedCallbacks.push(value => {
                // 3. 如果 onFulfilled 或者 onRejected 抛出一个异常e, 则 promise2 必须拒绝执行，并返回拒因 e
                try {
                    let x = onFulfilled(value);
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })

            this.onRejectedCallbacks.push(reason => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject)
                } catch(e) {
                    reject(e);
                } 
            })
        }))
    }
}

// 解决过程
function resolvePromise() {

}
```

### 完善promise的解决过程，即resolvePromise 函数

+ 1. x 与 promise 相等

+ 2. x 为 Promise

+ 3. x 为 对象或函数


#### x 与 promise 相等

```js
function resolvePromise(promise2, x, resolve, reject) {
    // x 与 promise 相等
    // 如果从 onFulfilled 中 返回的 x 就是 promise2 就会导致 循环引用报错

    // 如果 promise 和 x 指向同一对象，以 TypeError 为拒因 拒绝执行 promise

    if (x === promise2) {
        reject(new TypeError('循环引用'));
    }
}
```

#### x 为 Promise

```js
function resolvePromise(promise2, x, resolve, reject) {
    if ( x === promise2) {
        reject(new TypeError('循环引用'))
    }
    // x 为 Promise
    else if ( x instanceof APromise) {
        // 如果 x 为 Promise, 则使 promise 接受 x 的状态
        // 如果 x 处于等待态， promise 需保持为等待态 直至 x 被执行或拒绝
        if(x.status === PENDING) {
            x.then(
              y => {
                resolvePromise(promise2, y, resolve, reject);
              },
              reason => {
                reject(reason);
              }
            )
        } else {
            // 如果 x 处于 执行态，用相同的值执行 promise
            // 如果 x 处于 拒绝态，用相同的拒因 promise
            x.then(resolve, reject)
        }
    }
}
```

#### x 为 对象或函数

看不懂了

```js
function resolvePromise(promise2, x, resolve, reject) {
    if ( x === promise2) {
        reject(new TypeError('循环引用'))
    }

    if ( x instanceof APromise) {
        if (x.status === PENDING) {
            x.then(
                y => {
                    resolvePromise(promise2, y, resolve, reject)
                },
                reason => {
                    reject(reason)
                }
            );
        } else {
            x.then(resolve, reject)
        }
    } else if ( x && (typeof x === 'function' || typeof x === 'object')) {
        // 避免多次调用
        let called = false;
        try {
            // 把 x.then 赋值给 then
            let then = x.then; 
            // 即使x不是promise，但如果x.then是promise，那么和promise也一样是走同样的流程。
            if (typeof then === 'function') {
                // 如果 then 是函数，将 x 作为 函数的作用域 this 调用之。
                // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise，第二个参数叫做 rejectPromise
                // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一个参数调用了多次，则优先采用首次调用并忽略剩下的调用
                then.call(
                    x,
                    // 如果 resolvePromise 以值y 为参数被调用，则运行 [[Resolve]](promise, y)
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    // 如果 rejectPromise 以拒因 r 为参数 被调用， 则以 拒因 r 拒绝 promsie
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } else {
                // 如果 then 不是函数， 以 x 为参数执行promise
                resolve(x)
            }
        } catch (e) {
            // 如果x.then 的值时抛出错误 e, 则以 e 为 拒因 拒绝promise
            // 如果调用 then 方法 抛出了异常e;
            // 如果 resolvePromise或 rejectPromise 已经被调用，则忽略之
            // 否则以 e 为 拒因拒绝 promise
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        // 如果 x 不为 对象或者函数，以 x 为参数执行 promise
        resolve(x);
    }
}
```

### 整合成最后的完整代码

```js
const PENDING = 'PENDING';

const FULFILLED = 'FULFILLED';

const REJECTED = 'REJECTED';

    class APromise {
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
                // 使用 macro-task 机制(setTimeout),确保onFulfilled 异步执行，且在then 方法被调用的那一轮事件循环之后的新执行栈中执行
                // 加上这个，主要是为了处理executor 函数中代码为非异步的情况
                setTimeout(() => {
                    if(this.status === PENDING) {
                        this.status = FULFILLED
                        this.value = value
                        this.onResolvedCallbacks.forEach((fn) => {   // 新增 触发时遍历所有
                            fn = fn(this.value)
                        })
                    }
                })
            }
            // 调用此方法就是失败
            let reject = (reason) => {
                setTimeout(() => {
                    if(this.status === PENDING) {
                        this.status = REJECTED;
                        this.reason = reason;
                        this.onRejectedCallbacks.forEach((fn) => {    // 新增 触发时遍历所有
                            fn = fn(this.reason)
                        })
                    }
                })
            }
            
            // 处理异常情况
            try {
                // 立即执行，将resolve 和 reject 函数，传给使用者
                executor(resolve, reject)
                // 其实就是在这里执行的
            } catch (error) {
                reject(error)  // 出错了 reason 就是错误
            }
        }

        // 包含一个 then 方法， 并接收两个参数函数 onFulfilled、onRejected
        then(onFulfilled, onRejected) {
            let newPromise;
            // 4. 如果 onFulfilled 不是函数且 promise1 成功执行，promise2 必须成功执行并返回相同的值。
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
            // 5. 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的拒因。
        
            onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        
            // 6. 对于一个promise，它的then方法可以调用多次。
            // 当在其他程序中多次调用同一个promise的then 时，由于之前状态已经为FULFILLED / REJECTED 状态，则会走以下逻辑，
            // 所以要确保为FULFILLED / REJECTED 状态后，也要异步执行 onFulfilled / onRejected，这里使用setTimeout
        
            // 不论promise1 被reject 还是被resolve 时 promise2 都会被resolve，只有出现异常时才会被rejected。
            // 由于在接下来的解决过程中需要调用resolve, reject 进行处理，处理我们在调用处理过程时，传入参数
        
            
            if(this.status === FULFILLED) {
                return (newPromise = new APromise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(newPromise, x, resolve, reject);
                        } catch(e) {
                            reject(e)
                        }
                    })
                }))
            }
        
            if(this.status === REJECTED) {
                return (newPromise = new APromise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(newPromise, x, resolve, reject);
                        } catch(e) {
                            reject(e)
                        }
                    })
                }))
            }
        
            if(this.status === PENDING) {
                return (newPromise = new APromise((resolve, reject) => {
                    // 2. 如果onFulfilled 或者 onRejected 返回一个值x，则运行下面的 Promise 解决过程：[[Resolve]]（promise2, x）
                    this.onResolvedCallbacks.push(value => {
                        // 3. 如果 onFulfilled 或者 onRejected 抛出一个异常e, 则 promise2 必须拒绝执行，并返回拒因 e
                        try {
                            let x = onFulfilled(value);
                            resolvePromise(newPromise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
        
                    this.onRejectedCallbacks.push(reason => {
                        try {
                            let x = onRejected(reason);
                            resolvePromise(newPromise, x, resolve, reject)
                        } catch(e) {
                            reject(e);
                        } 
                    })
                }))
            }
        }
        catch(onRejected) {
            return this.then(null, onRejected);
        }
    }

    function resolvePromise(promise2, x, resolve, reject) {
        if ( x === promise2) {
            reject(new TypeError('循环引用'))
        }
    
        if ( x instanceof APromise) {
            if (x.status === PENDING) {
                x.then(
                    y => {
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    reason => {
                        reject(reason)
                    }
                );
            } else {
                x.then(resolve, reject)
            }
        } else if ( x && (typeof x === 'function' || typeof x === 'object')) {
            // 避免多次调用
            let called = false;
            // 这里为什么要加上 try catch？？？？
            // 理由是如果执行x.then的值，会抛出错误，如果抛出错误，那么就拒绝执行promise。
            try {
                // 把 x.then 赋值给 then
                let then = x.then;
                // 如果x为函数，且x.then也为函数，那么就是和x是promise相同逻辑。
                if (typeof then === 'function') {
                    // 如果 then 是函数，将 x 作为 函数的作用域 this 调用之。
                    // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise，第二个参数叫做 rejectPromise
                    // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一个参数调用了多次，则优先采用首次调用并忽略剩下的调用
                    then.call(
                        x,
                        // 如果 resolvePromise 以值y 为参数被调用，则运行 [[Resolve]](promise, y)
                        y => {
                            if (called) return;
                            called = true;
                            resolvePromise(promise2, y, resolve, reject);
                        },
                        // 如果 rejectPromise 以拒因 r 为参数 被调用， 则以 拒因 r 拒绝 promsie
                        r => {
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    )
                } else {
                    // 如果 then 不是函数， 以 x 为参数执行promise
                    resolve(x)
                }
            } catch (e) {
                // 如果x.then 的值时抛出错误 e, 则以 e 为 拒因 拒绝promise
                // 如果调用 then 方法 抛出了异常e;
                // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
                // 否则以 e 为 拒因拒绝 promise
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            // 如果 x 不为 对象或者函数，以 x 为参数执行 promise
            resolve(x);
        }
    }

    APromise.all = function(promises) {
        return new APromise((resolve, reject) => {
          let done = gen(promises.length, resolve);
          promises.forEach((promise, index) => {
            promise.then(value => {
              done(index, value);
            }, reject);
          });
        });
      };
      
      function gen(length, resolve) {
        let count = 0;
        let values = [];
        return function(i, value) {
          values[i] = value;
          if (++count === length) {
            resolve(values);
          }
        };
      }
      
      APromise.race = function(promises) {
        return new APromise((resolve, reject) => {
          for (var i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject);
          }
        });
      };

      APromise.resolve = function(value) {
        return new APromise((resolve, reject) => resolve(value));
      };
      APromise.reject = function(reason) {
        return new APromise((resolve, reject) => reject(reason));
      };
    // 下面的 deferred 方法是为了测试
    APromise.deferred = function() {
        let defer = {};
        defer.promise = new APromise((resolve, reject) => {
          defer.resolve = resolve;
          defer.reject = reject;
        });
        return defer;
      };

    module.exports = APromise;
```

### 补充实现 单独实现 catch all race resolve reject finally

```js
// all
// 1.传入的是一个promise数组
// 2.输出也是一个promise
APromise.all = function(list) {
    return new APromise((resolve, reject) => {
        let resValues = [];
        let counts = 0;
        for(let i = 0; i < list.length; i++) {
            list[i].then(res => {
                counts++;
                resValues[i] = res;
                if(counts === list.length) {
                    resolve(resValues)
                }
            }, err => {
                reject(err)
            })
        }
    })
}
// race
APromise.race = function(promises) {
    return new APromise((resolve, reject) => {
        for(var i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}

// finally
// 思路：无论成功还是失败都会执行finally
// 注意：1. finally 的回调没有参数，2. promise 如果成功，则将成功的值正常传递下去，不会因finally而断掉 3. promise 如果失败，同上

APromise.prototype.finally = function(onFinished) {
    return this.then(val => {
      onFinished()
      return val
    }).catch((err) => {
      onFinished()
      return err
    })
}

APromise.resolve = function(value) {
    return new APromise((resolve, reject) => resolve(value))
}

APromise.reject = function(value) {
    return new APromise((resolve, reject) => reject(value))
}

APromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
}
```

### 自动测试

安装命令

```js
npm install promises-aplus-tests -g
```

执行命令

```js
promises-aplus-tests yourPromise.js
```
 
手动测试


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

测试 promise.all 脚本测试

```js
let p1 = new AjPromise(resolve => { resolve('p1') })
let p2 = new AjPromise(resolve => { setTimeout(() => { resolve('p2') }, 3000) })
let p3 = new AjPromise(resolve => { resolve('p3') })
let p4 = new AjPromise(resolve => { setTimeout(() => { resolve('p4') }, 1500) })
let p5 = new AjPromise(resolve => { resolve('p5') })

AjPromise.all([p1, p2, p3, p4, p5]).then((res) => {
  console.log(res)
}).catch(err => {
  console.error(err)
})

// 测试结果如下：
// ['p1', 'p2', 'p3', 'p4', 'p5']
```

[参考文章](https://github.com/careteenL/blog/issues/1)

[参考文章](https://github.com/xieranmaya/blog/issues/3)

[promise/A+规范](https://www.ituring.com.cn/article/66566)

[参考文章](https://juejin.im/post/6844903763178684430)

[参考文章](https://www.jianshu.com/p/459a856c476f)

[promise 所有方法实现](https://zhuanlan.zhihu.com/p/232805664)


