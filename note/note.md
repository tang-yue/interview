
1、浏览器缓存， 浏览器是如何判断一个文件，从本地拿，还是从服务器请求。

2、移动端 1px 问题

3、服务器端是如何种植cookie值的

4、高阶函数

5、1px 问题，移除微信字体影响的问题。

6、如何将同步函数改为异步函数。

我们知道js的单线程的，那它是怎么执行异步的呢。

1、react 16 新增了哪些特性，某个属性的，应用场景， 有什么好处

4、可以谈下 vue， 是如何做前端路由，如果让你实现一个，你怎么实现

5、vue 的双向绑定 实现原理

6、 有配过webpack, babel 吗？

7、同源策略，什么是同源策略 浏览器端限制，还是服务端限制的

8、有用过react hooks 吗？

9、有用过 proxy 吗？

1、输入一个url, 到页面加载，浏览器执行了哪些事件。

2、说下 vue 中 nextTick 的原理， 我们应该什么时候用this.nextTick()

svg 和 canves 的区别

await 和 async 的底层原理

## js 基础

#### react 是如何解决问题虚拟DOM更新频繁，影响性能的。

#### 移动端是如何做适配的，有哪些方法？

#### 小程序的渲染机制是什么？

## 移动端篇

#### 移动端rem 

## vue 篇

### vue 双向绑定原理

[vue 双向绑定原理1](https://www.zhihu.com/search?type=content&q=vue%20%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E5%8E%9F%E7%90%86)
[vue 双向绑定原理2](https://zhuanlan.zhihu.com/p/78276361)

[手写双向数据绑定](https://juejin.im/post/5acc17cb51882555745a03f8)


#### 极简版的双向绑定




### 2、react 的生命周期  react 16 版本

1、初始化阶段

constructor

2、挂载阶段

getDerivedStateFromProps

render

componentDidMount

3、更新阶段

getDerivedStateFromProps(props, state)

shouldComponentUpdate

render

getSnapshotBeforeUpdate(prevProps, prevState)

componentDidUpdate

4、卸载阶段

componentWillUnmount

5、错误处理

componentDidCatch

### 3、从输入URL 到页面加载完成的过程中都发生了什么

https://zhuanlan.zhihu.com/p/23155051

https://segmentfault.com/a/1190000006879700


### 5、vue 的响应式原理

[vue 面试题](https://www.zhihu.com/search?type=content&q=vue)


[前端路由简介以及vue-router 实现原理](https://zhuanlan.zhihu.com/p/37730038)
[前端路由参考文章](https://github.com/webfansplz/article/issues/1)

hash 模式

前端路由实现起来其实也很简单，就是匹配不同的 url 路径，进行解析，然后动态的渲染出区域 html 内容。但是这样存在一个问题，就是 url 每次变化的时候，都会造成页面的刷新。那解决问题的思路便是在改变 url 的情况下，保证页面的不刷新。


`#` 后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。
。另外每次 hash 值的变化，还会触发hashchange 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。然后我们便可以监听hashchange来实现更新页面部分内容的

```
function matchAndUpdate () {
   // todo 匹配 hash 做 dom 更新操作
}

window.addEventListener('hashchange', matchAndUpdate)
```

history 模式

HTML5 多两个 API pushState 和 replaceState ,,, 改变url 地址 且不会发送请求 popstate


首页白屏优化实践。

ssr ------- 服务端渲染

预渲染 

骨架图

骨架屏

浏览器缓存

文章参考
https://segmentfault.com/a/1190000008377508
