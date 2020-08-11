promise


微任务包括：Object.observe、MutationObserver、Promise.then() 或 catch()、Promise 为基础开发的其他技术，比如fetch API、V8的垃圾回收过程、Node独有的process.nextTick。

宏任务包括： script、setTimeout、setInterval、setImmediate、I/O、UI rendering （浏览器独有）、 requestAnimationFrame （浏览器独有）


promise 相关笔记



[参考文章](https://juejin.im/post/6844904077537574919w)



js 是 单线程的， 有了Event Loop 的加持， JS 才能非阻塞地运行。


同步任务指的是：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
异步任务指的是：不进入主线程，而是进入任务队列，通过Event Loop 机制等待合适的时间调用


相关面试题


####  宏任务有哪些，微任务有哪些


#### 简单 Promise












