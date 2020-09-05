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
        let promise2 // 这个promise2 就是我们每次调用then后返回的新的promise
        // 实现链式调用主要的靠的就是这个promise
        promise2 = new Promise((resolve, reject) => {
          if(this.status === FULFILLED) {
            setTimeout(() => {
              try {
                // 这个返回值是成功函数的执行结果
                let x = onFulfilled(this.value)
                // 判断promise2 和 x 也是then函数返回的结果和promise2的关系，如果x 是普通值，那就让promise2成功，如果是一个失败的promise那就让promise2 失败
                this._resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            }, 0)
          }
          
          if(this.status === REJECTED) {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason)
                this._resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
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

    _resolvePromise(promise2, x, resolve, reject) {
      resolve(x)
    }
}

// 下面是测试用例

new Promise((resolve, reject) => {
  resolve('haha')
}).then((data) => {
  console.log(data, '1')
  return 'success'
}).then((result) => {
  console.log(result, '2')
})
