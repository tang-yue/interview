## React 生命周期 react 16 版本

1. 初始化阶段
+ constructor
2. 挂载阶段
+ getDerivedStateFromProps
+ render
+ componentDidMount
3. 更新阶段
+ getDerivedStateFromProps(props, state)
+ shouldComponentUpdate
+ render
+ getSnapshotBeforeUpdate(prevProps, prevState)
+ componentDidUpdate
4. 卸载阶段
+ componentWillUnmount
5. 错误处理
+ componentDidCatch

## React Fiber 原理以及为什么componentWillRecievedProps会废弃

异步渲染UI的解决方案。让js可以中止渲染从而去做更高优先级的事情，比如IO操作，从而让用户更不容易感觉到卡顿，提升用户体验；
借助requestIdleCallback接口，将一个大的渲染计算工作切分成小块（每个组件都是一个小块)；
每次利用帧的间隙执行几个小块任务，分多帧完成一次大的渲染任务，从而杜绝卡顿的发生。

componentWillReceiveProps 可以进行异步setState的操作，不利于频繁setState的合并处理。而其替代方法 getDerivedStateFromProps由于是静态方法，无法操作到实例状态，只能通过返回新状态对实例状态进行修改，
因此杜绝了异步setState的问题，杜绝了频繁异步setState到导致的性能问题。

## React setState 更新机制

### setState 什么时候是同步的什么时候是异步的

1、setState 只在合成事件和钩子函数中是"异步"的，在原生事件和setTimeout中都是同步的。
2、setState 的"异步" 并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，
只是在合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”。
3、setState的批量更新优化也是建立在"异步" (合成事件，钩子函数)之上的，在原生事件和setTimeout中不会批量更新，在"异步"中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState 多个不同的值，在更新时会对其进行合并批量更新。

详细点更新过程： 

每次调用函数 setState，（异步） react都会将要更新的状态添加到更新队列中，并产生一个调度任务。调度任务在执行的过程中，做两个事情：
- 遍历更新队列，计算出全新的状态，更新到组件实例中；
- 根据标识shouldUpdate 来决定是否对组件实例进行重新渲染。

[参考文章](https://zhuanlan.zhihu.com/p/39512941)
[参考文章](https://juejin.im/post/6844904015524790279)

## Redux 原理


