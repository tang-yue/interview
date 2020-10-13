记录 promise  相关


微任务包括：MutationObserver、Promise.then() 或 catch()、Promise 为基础开发的其他技术，比如fetch API、V8的垃圾回收过程、Node独有的process.nextTick。

宏任务包括： script、setTimeout、setInterval、setImmediate、I/O、UI rendering。


标星号的需要重做一遍

想要抛出一个错误的话，可以用下面两的任意一种：

return Promise.reject(new Error('error!!!!'))

// or

throw new Error('error!!!')