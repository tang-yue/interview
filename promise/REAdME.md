promise


微任务包括：Object.observe、MutationObserver、Promise.then() 或 catch()、Promise 为基础开发的其他技术，比如fetch API、V8的垃圾回收过程、Node独有的process.nextTick。

宏任务包括： script、setTimeout、setInterval、setImmediate、I/O、UI rendering （浏览器独有）、 requestAnimationFrame （浏览器独有）


但是requestAnimationFrame究竟是微任务还是宏任务，还有待调查，告诉浏览器---你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数（即动画函数）作为参数，该
回调函数会在浏览器下一次重绘之前执行。


promise 相关笔记




[参考文章](https://juejin.im/post/6844904077537574919w)


相关面试题


####  宏任务有哪些，微任务有哪些


#### Promise 实现

[手动 实现 promise](./api-promise.js)

[参考文章](https://juejin.im/post/6850037281206566919)

[手动 实现 promise.all](./api-promise-all.js)

[参考文章](https://juejin.im/post/6844904182017687559)












