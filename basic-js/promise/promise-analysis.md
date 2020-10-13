### 第一道

```js
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('resolve3');
        console.log('timer1')
    }, 0)
    resolve('resovle1');
    resolve('resolve2');
}).then(res => {
    console.log(res)
    setTimeout(() => {
        console.log(p1)
    }, 1000)
}).finally(res => {
  console.log('finally', res)
})
```

分析上述逻辑

这两个宏任务，谁先在前，谁先在后。

finally 不管 Promise的状态是 resolved 还是 rejected 都会执行，且它的回调函数是接收不到 Promise 的结果的。

```js
'resovle1'  // 已经有一个resovle1
'finally' undefined //
'timer1'
Promise{<fulfilled>: undefined}   // 坑
```

### 第二道

```js
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
} 
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)
```

分析上述逻辑

注意的知识点：
+ async 函数中await 的new Promise 要是没有返回值的话，则不执行后面的内容
+ .then 函数中的参数期待的是函数，如果不是函数的话会发生透传
+ 注意定时器的延迟时间

我一直在想，执行输出的是 'promise1'  还是 'async1 success'
```js
'script start'
'async1'
'promise1'   
'script end'
1
'timer2'
'timer1'
```

### 第三道题

```js
  const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {   // 宏任务
            console.log(5);
            resolve(6);
            console.log(p)
        }, 0)
        resolve(1);      // 微任务 挂起 先挂起
    });
    resolve(2);        // 微任务挂起
    p.then((arg) => {            
        console.log(arg);
    });
}));
first().then((arg) => {
    console.log(arg);
});
console.log(4);
```
分析上述逻辑

```js
// first 里的同步的
3
7
4
1
2
5
Promise <fulfilled:1>
```

### 第四道题   这个比较坑

```js
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('script start')
async1().then(res => console.log(res))
console.log('script end')
```

分析逻辑

async1 中 await 后面的Promise 是没有返回值的，也就是它的状态始终是pending状态，因此相当于一直在 await, await, await 却始终没有响应....

**所以在 await 之后的内容是不会执行的，也包括async1后面的 .then**。

```js
'script start'
'async1 start'
'promise1'
'script end'
// 'async1 end'   // 这句不会执行
```

### 第五道题

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {   // 这不是 new Promise 所以即使没有resolve，也会继续向下执行。
  console.log("async2");
}
async1();
console.log('start')
```

分析逻辑
```js
'async1 start'
'async2'
'start'
'async1 end'
```

### 第六道题

```js
function runAsync(x) {
    const p = new Promise(r =>
      setTimeout(() => r(x, console.log(x)), 1000)
    );
    return p;
  }
  function runReject(x) {
    const p = new Promise((res, rej) =>
      setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
    );
    return p;
  }
  Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
    .then(res => console.log("result: ", res))
    .catch(err => console.log(err));
```

跳过

### 第七道题

```js
async function asyncFn1 () {
      console.log('asyncFn1 start')
      await asyncFn2()
      console.log('async1 end')   // 被放进微任务
  }

  async function asyncFn2 () {
      console.log('asyncFn2')
  }

  console.log('script start') 

  setTimeout(function () {
      console.log('setTimeout')      // 被放进宏任务
  }, 0)

  asyncFn1()    // 从这开始执行，并且执行完毕

  new Promise((resolve) => {
      console.log('Promise')
      resolve()
  }).then(() => {
      console.log('Promise.then')   // 被放进微任务
  })

  console.log('script end')
```

执行结果
```js
'script start'
'asyncFn1 start'
'asyncFn2'
'promise'
'script end'
'async1 end'
'Promise.then'
'setTimeout'
```

### 第八道题

```js
console.log('script start')
  async function async1() {
      await async2()
      console.log('async1 end')  // 跳出循环了，被放进了微任务
  }

  async function async2() {
      console.log('async2 end')
  }

  async1()

  setTimeout(function() {
      console.log('setTimeout')     // 被放进了宏任务
  }, 0)

  new Promise(resolve => {
      console.log('Promise')
      resolve()
  }).then(function() {
      console.log('promise1') // 微任务
  }).then(function() {
      console.log('promise2') // 微任务，疑惑的点，promise的状态一经改变就不会被第二次改变了吧，针对的是多个resolve
  })

  console.log('script end')
```

执行结果
```js
// 新版Chrome 的执行结果， 将’async1 end‘的打印结果提前了，它优化了await 的执行速度，await变得更早执行了
'script start'
'async2 end'
'promise'
'script end'
'async1 end' 
'promise1'
'promise2'
'setTimeout'
```

### 第九道题

题目八的变形

```js
console.log('script start')
  async function async1() {
      await async2()
      console.log('async1 end')
  }

  async function async2() {
      console.log('async2 end')
      return Promise.resolve().then(() => {    // 这里被当作是一个微任务
          console.log('async2 end1')
      })
  }

  async1()

  setTimeout(function() {
      console.log('setTimeout')
  }, 0)

  new Promise(resolve => {
      console.log('Promise')
      resolve()
  }).then(function() {
      console.log('promise1') // 微任务
  }).then(function() {
      console.log('promise2')  // 微任务
  })

  console.log('script end')
```

执行结果
```js
'script start'
'async2 end'
'Promise'
'script end'
'async2 end1'
'promise1'
'promise2'
'async1 end'
'setTimeout'
```

分析逻辑如下
```js
1. 执行代码，输出 script start
2. 执行async1()，调用了async2()，然后输出 async2 end，并且将 await 后面的异步调用添加微任务队列，保留 async1 的上下文，然后跳出async1
3. 遇到setTimeout，产生一个宏任务
4. 执行 Promise，输出 Promise，遇到 then，产生微任务，并添加到微任务队列，继续执行代码，输出 script end
5. 当前主任务执行完毕，开始执行当前宏任务产生的微任务，即先异步调用的，然后输出 async2 end，执行第二微任务，输出 promise1，又遇到then，产生新的微任务
6. 执行微任务，输出 promise2，此时微任务队列已清空，执行权交给 async1
7. 执行 await 语句下一行的代码，输出 async1 end
8. 所有微任务队列均已执行完毕，开始执行一个宏任务，打印 setTimeout
```



