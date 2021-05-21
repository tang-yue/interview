// 写完并解释
// 1. then 内部为什么要加 try catch
// 不论 promise1 被 reject 还是 被 resolve 时， promise2 都会被 resolve，只有出现异常时才会被 rejected
// 2. then 内部状态为 pending 部分，是要加 try catch， 不用加setTimeout 因为 resolve 和 reject 部分已经加了
// 3. resolvePromise 函数，当 x 为 promise 的时候，等待态则为等待态，非等待态，则为非等待态
// 4. x 的判断条件， 为函数或者对象，以及内部整个是要加 try catch
// 5. 避免多次调用的时机，try 部分 then 为函数 时， 以及 catch 部分
// 6. callbacks 数组 push 进去 时候 里面带 try catch
// 7. cb(this.value) cb(this.reason) 加上this

let FULFILLED = 'fulfilled';

let PENDING = 'pending';

let REJECTED = 'rejected';

class APromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        
        let resolve = (value) => {
            setTimeout(() => {
                if(this.status === PENDING) {
                    this.status = FULFILLED;
                    this.value = value
                    this.onResolvedCallbacks.map((cb) => {
                        cb(this.value)
                    })
                }
            })
        }

        let reject = (reason) => {
            setTimeout(() => {
                if(this.status === PENDING) {
                    this.status = REJECTED;
                    this.reason = reason;
                    this.onRejectedCallbacks.map((cb) => {
                        cb(this.reason)
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


    then(onFulfilled, onRejected) {
        let promise2;

        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value

        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        if(this.status === FULFILLED) {
            return promise2 = new APromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e)
                    }
                })
            })
        }


        if(this.status === REJECTED) {
            return promise2 = new APromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e)
                    }
                })
                
            })
        }

        if(this.status === PENDING) {
            return promise2 = new APromise((resolve, reject) => {
               
                    this.onResolvedCallbacks.push((value) => {
                        try {
                            let x = onFulfilled(value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch(e) {
                            reject(e)
                        }
                    })
                

                
                    this.onRejectedCallbacks.push((reason) => {
                        try {
                            let x = onRejected(reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch(e) {
                            reject(e)
                        }
                    })
               
            })
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if(x === promise2) {
        return reject(new TypeError('循环引用'))
    }

    if (x instanceof APromise) {
        if( x.status === PENDING) {
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, e => {
                reject(e)
            })
        } else {
            x.then(resolve, reject)
        }
    } else if( x && (typeof x === 'function' || typeof x === 'object')) {
        let called = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                    then.call(x, y => {
                        if(called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject)
                    }, r => {
                        if(called) return;
                        called = true;
                        reject(r)
                    })
            } else {
                resolve(x)
            }
        } catch(e) {
            if(called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x)
    }
}


// promise.all

APromise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let resValues = []
        let counts = 0;
        for(let i = 0; i < promises.length; i++) {
            promises[i].then((res) => {
                resValues[i] = res;
                counts++;
                if(counts === promises.length) {
                    resolve(resValues)
                }
            }, (e) => {
                reject(e)
            })
        }
    })
}

// promise.race

APromise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}
// promise.finally

APromise.prototype.finally = function(onFinished) {
    return this.then(res => {
        onFinished()
        return res;
    }).catch(err => {
        onFinished()
        return err;
    })
}


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


