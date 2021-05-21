// 手写 promise

let PENDING = 'PENDING';
let FULFILLED = 'FULFILLED';
let REJECTED = 'REJECTED';

class myPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        
        const resolve = (value) => {
            setTimeout(() => {
                if(this.status === PENDING) {
                    this.value = value;
                    this.status = FULFILLED;
                    this.onResolvedCallbacks.forEach((cb) => {
                        cb(value)
                    })
                }
            })
        }

        const reject = (reason) => {
            setTimeout(() => {
                if(this.status === PENDING) {
                    this.reason = reason;
                    this.status = REJECTED;
                    this.onRejectedCallbacks.forEach((cb) => {
                        cb(reason)
                    })
                }
            })
        }

        try {
            executor(resolve, reject)
        } catch(e) {
            reject(e)
        }
    }

    then(onResolved, onRejected) {
        let promise2;
        
        onResolved = typeof onResolved === 'function' ? onResolved : (value) => { return value }
        onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err }

        if(this.status === FULFILLED) {
            return (promise2 = new myPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onResolved(this.value);
                        // 第一个参数 promise2是哪里来的？？
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e)
                    }
                })
            }))
        }

        if(this.status === REJECTED) {
            return (promise2 = new myPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        // 第一个参数 promise2是哪里来的？？
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e)
                    }
                })
            }))
        }

        if(this.status === PENDING) {
            return (promise2 = new myPromise((resolve, reject) => {
                this.onResolvedCallbacks.push((value) => {
                    try {
                        let x = onResolved(value);
                        // 第一个参数 promise2是哪里来的？？
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e);
                    }
                })

                this.onRejectedCallbacks.push((reason) => {
                    try {
                        let x = onRejected(reason);
                        // 第一个参数 promise2是哪里来的？？
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e);
                    }
                })
            }))
        }
    }
}

// function resolvePromise(promise, x, resolve, reject) {
//     // 这里有个报错提醒
//     // 忘记了
//     if(x === promise) {
//         // throw TypeError('循环引用')
//         reject(new TypeError('循环引用'))
//     } else if(x instanceof myPromise) {    // x 是一个promise
//         if(x.status === PENDING) {
//             x.then((y) => {
//                 resolvePromise(promise, y, resolve, reject)
//             }, (e) => {
//                 reject(e);
//             })
//         } else {
//             x.then(resolve, reject)
//         }
//     } else if( x && (typeof x === 'function' || typeof x === 'object')) {
//         let called = false;
//         let then = x.then;
//         if(typeof then === 'function') {
//             try {
//                 if(called) return;
//                 called = true;
//                 then.call(x, y => {
//                     resolvePromise(promise, y, resolve, reject)
//                 }, e => {
//                     reject(e)
//                 })
//             } catch(err) {
//                 if(called) return;
//                 called = true;
//                 reject(err);
//             }
//         } else {
//             if(called) return;
//             called = true;
//             resolve(x);
//         }
//     } else {
//         resolve(x);
//     }
// }


function resolvePromise(promise, x, resolve, reject) {
    if(x === promise) {
        reject(new TypeError('循环引用'))
    }

    if ( x instanceof myPromise) {
        if(x.status === PENDING) {
            x.then(
                y => {
                    resolvePromise(promise, y, resolve, reject)
                },
                reason => {
                    reject(reason)
                }
            )
        } else {
            x.then(resolve, reject)
        }
    } else if(x && (typeof x === 'function' || typeof x === 'object')) {
        let called = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
              then.call(
                x,
                y => {
                  if (called) return;
                  called = true;
                  resolvePromise(promise, y, resolve, reject);
                },
                r => {
                  if (called) return;
                  called = true;
                  reject(r);
                }
              );
            } else {
              resolve(x);
            }
          } catch (e) {
            if (called) return;
            called = true;
            reject(e);
          }
    } else {
        resolve(x)
    }
}


myPromise.deferred = function() {
    let defer = {};
    defer.promise = new myPromise((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
    });
    return defer;
  };


module.exports = myPromise;

// 记录写的过程中，所犯的错误
// 第一点 then 返回的是 promise， 所以要加上 new myPromise
// 当x 是function或者object的时候，是先 try catch 然后内部if else 条件判断
// 当x 是promise的时候，要注意链式调用，因为是可能.then.then然后一直点下去的
// resolve，reject 函数内部，是要加 if 判断的，只有当为 pending的时候。

// 默写 promise.finally

myPromise.all = (lists) => {
    return new myPromise((resolve, reject) => {
        let count = 0;
        let res = [];
        for(let i = 0; i < lists.length; i++) {
            lists[i].then((value) => {
                res.push(value)
                count++;
                if(count === lists.length) {
                    resolve(res);
                }
            }, (e) => {
                reject(e)
            })
        }
    })
}

// 默写 promise.race

myPromise.race = (lists) => {
    return new myPromise((resolve, reject) => {
        for(let i = 0; i < lists.length; i++) {
            lists[i].then((value) => {
                resolve(value)
            }, (e) => {
                reject(e)
            })
        }
    })
}

// 默写 promise.finally
// 问题是 返回的是 promise ??
// 无论是成功还是失败都会执行
// 那么我用什么去区分呢？？
myPromise.prototype.finally = function(onFulfill) {
    return this.then((val) => {
        onFulfill()
        return val;
    }, (err) => {
        onFulfill()
        return val;
    })
}

myPromise.prototype.catch = function(onReject) {
    return this.then(null, onReject)
}