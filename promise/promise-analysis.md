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
