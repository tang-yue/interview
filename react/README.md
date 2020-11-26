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
<!-- 借助requestIdleCallback接口，将一个大的渲染计算工作切分成小块（每个组件都是一个小块)； -->
每次利用帧的间隙执行几个小块任务，分多帧完成一次大的渲染任务，从而杜绝卡顿的发生。

通过Fiber架构，让自己的Reconciliation过程可被中断，适时地让出CPU执行权，在这个空间阶段`requestIdleCallback`，浏览器作为领导者。分配执行时间片（即requestIdleCallback）给程序去选择调用，程序需要按照约定在这个时间内执行完毕，并将控制权交还浏览器。

componentWillReceiveProps 可以进行异步setState的操作，不利于频繁setState的合并处理。而其替代方法 getDerivedStateFromProps由于是静态方法，无法操作到实例状态，只能通过返回新状态对实例状态进行修改，
因此杜绝了异步setState的问题，杜绝了频繁异步setState到导致的性能问题。

[参考文章](https://github.com/careteenL/react/tree/master/packages/fiber)

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

## React diff的原理

针对某一个节点进行diff时：
+ 若发现是原生HTML节点，且只有props有变化，则调用原生API更新attributes；
+ 若发现是原生HTML节点，且type有变化了，则需要移除重建；
+ 若发现子对象数组元素有key属性，则使用key进行子对象diff的依据，否则使用index；
+ 递归子对象，组件render结果。

针对多个节点
+ 第一轮遍历：处理更新的节点
+ 第二轮遍历：处理剩余的不属于更新的节点
+ 对于第一轮遍历的结果。分别讨论，分别执行相应的逻辑。
    - `newChildren` 与 `oldFiber` 同时遍历完
    > 这是最理想的情况：只需在第一轮遍历进行组件更新，此时`Diff`结束
    - `newChildren` 没遍历完，`oldFiber` 遍历完
    > 已有DOM节点都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的newChildren 为生成 workInProgress fiber 依次标记 placement。
    - `newChildren` 遍历完，`oldFiber` 没遍历完
    > 意味着本次更新比之前的节点数量少，有节点被删除了。所以需要遍历剩下的oldFiber，依次标记为 `Deletion`
    - `newChildren`与`oldFiber` 都没遍历完
    > 这意味着有节点在这次更新中改变了位置。

[参考文章](https://react.iamkasong.com/diff/multi.html#%E6%A6%82%E8%A7%88)


