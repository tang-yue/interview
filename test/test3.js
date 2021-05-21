// function* testG() {
//     const data 
// }

// function asyncToGenerator(genFunc) {
//     return function() {
//         const gen = genFunc.apply(this, arguments);
//         return new Promise((resolve, reject) => {
//             function step(key, arg) {
//                 let generatorResult;
//                 try {
//                     generatorResult = gen[key](arg)
//                 } catch(err) {
//                     return reject(err);
//                 }
//                 const { value, done } = generatorResult;
//                 if(done) {
//                     return resolve(value);
//                 } else {
//                     return Promise.resolve(value).then(val => {
//                         step('next', val);
//                     }, err => {
//                         step('throw', err);
//                     })
//                 }
//             }
//             step('next');
//         })
//     }
// }


// const getData = () => new Promise(resolve => setTimeout(() => { resolve('data') }, 1000))

// function* testG () {
//   const data = yield getData();
//   console.log('data: ', data);
//   const data2 = yield getData();
//   console.log('data2: ', data2);
//   return 'success';
// }

// let gen = asyncToGenerator(testG);

// gen().then(res => console.log(res));

// var gen = testG();
// var dataPromise = gen.next();
// dataPromise.value.then((value1) => {
//   var dataPromise2 = gen.next(value1);
//   dataPromise2.value.then((value2) => {
//     var dataPromise3 = gen.next(value2)
//     console.log(dataPromise3.value)
//   })
// })

// if([] == false) { console.log(1) };

// if({} == false) { console.log(2)};

// if([]) { console.log(3)};

// if([1] == [1]) { console.log(4)};

class A {
    constructor(message) {
        this.hi = message;
    }
   ///  hi = 'hello world'
}

class B extends A {
    constructor() {
        super('hello world')
    }
}

let instance = new B();

console.log(instance.hi, 'instance.hi')

// console.log(B.__proto__ === A)
// console.log(B.prototype.__proto__ === A.prototype);

// console.log(A.hi)s

// let promise = new Promise((resolve, reject) => {
//     resolve(1);
//     console.log(2, '2222');
//     return 1;
// })


// .then(5)


// Promise.resolve(1).then(res => {
//     console.log(res, 'res')
// }).then(3)


const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class AjPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = value;
          this.onFulfilledCallbacks.map(cb => {
            cb(this.value);
          });
        }
      });
    };
    const reject = reason => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.reason = reason;
          this.onRejectedCallbacks.map(cb => {
            cb(this.reason);
          });
        }
      });
    };
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    let newPromise;

    // onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason;
          };
    if (this.state === FULFILLED) {
      return (newPromise = new AjPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }));
    }
    if (this.state === REJECTED) {
      return (newPromise = new AjPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }));
    }
    if (this.state === PENDING) {
      return (newPromise = new AjPromise((resolve, reject) => {
        this.onFulfilledCallbacks.push(value => {
          try {
            let x = onFulfilled(value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(reason => {
          try {
            let x = onRejected(reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }));
    }
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    reject(new TypeError('循环引用'));
  }
  if (x instanceof AjPromise) {
    if (x.state === PENDING) {
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject);
        },
        reason => {
          reject(reason);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else if (x && (typeof x === 'function' || typeof x === 'object')) {
    let called = false; // 避免多次调用，？？
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
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
  } else {   // 说明是一个普通对象/函数
    resolve(x);
  }
}

let promise1 = new AjPromise((resolve, reject) => {
    resolve(1);
    console.log(3);
    return 1;
})

let promise2 = promise1.then((res) => {
    console.log(res);
})

promise2.then(3).then((res) => {
    console.log(res)
})
