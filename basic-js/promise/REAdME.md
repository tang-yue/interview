
promise 相关笔记

[45道 promise](https://juejin.im/post/6844904077537574919)

相关面试题

#### 如何将一个同步函数包装为异步函数

setTimeout

####  宏任务有哪些，微任务有哪些

微任务包括： MutationObserver、Promise.then() 或 catch()、Promise 为基础开发的其他技术，比如fetch API、V8的垃圾回收过程、Node独有的process.nextTick。

宏任务包括： script、setTimeout、setInterval、setImmediate、I/O、UI rendering （浏览器独有）、 requestAnimationFrame （浏览器独有）

MutationObserver: MO 是 HTML5 中的新API，是个用来监视DOM变动的接口。他能监听一个DOM对象上发生的子节点删除、属性修改、文本内容修改等等。调用过程很简单，但是有点不太寻常：你需要先给他绑回调：`var mo = new MutationObserver(callback)` 通过给MO的构造函数传入一个回调，能得到一个MO实例，这个回调就会在MO实例监听到变动时触发。

但是requestAnimationFrame究竟是微任务还是宏任务，还有待调查，告诉浏览器---你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数（即动画函数）作为参数，该回调函数会在浏览器下一次重绘之前执行。

#### Promise 实现

[promise 完整版参考](https://juejin.im/post/6844903763178684430)

[参考文章](https://juejin.im/post/6850037281206566919)

[参考文章](https://github.com/careteenL/blog/issues/1)

[手动 实现 promise.all](./api-promise-all.js)

[promise.all 参考文章](https://juejin.im/post/6844904182017687559)












