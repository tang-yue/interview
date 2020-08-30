## vue 3.0 的新特性

1. 压缩包体积更小

2. Virtual DOM 重构

3. 更好的支持TypeScript

## vue 中，为什么data是一个方法返回一个对象，而不是直接赋给一个对象

怕重复创建实例造成多实例共享一个数据对象。

## vue 父子组件生命周期的顺序

## computed 和 watch 的区别

1. watch 就是单纯的是监听某个数据的变化，支持深度监听
2. computed 是计算属性，是依赖于某个或者某些属性值，只有当依赖的数据发生变化时，才会发生变化

## vue 双向绑定实现原理

将ViewModel 进行 “变异操作”，即使用Proxy或者getter/setter方式将普通属性变为”可监听“的属性，从而实现正向绑定。反向绑定是针对input的，监听change事件以自动更新对应的ViewModel属性。

## 手写一个简易的Virtual DOM

```html
<div>
  <span className="item">item</span>
  <input disabled={true} />
</div>
```

会被 babel 编译为如下的JavaScript对象：

```js
{
  type: 'div',
  props: null,
  children: [
    {
      type: 'span',
      props: {
        class: 'item'
      },
      children: ['item']
    },
    {
      type: 'input',
      props: {
        disabled: true,
      },
      children: []
    }
  ]
}
```

vdom 函数创建简易Virtual DOM

```js
function vdom(type, props, ...children) {
  return {
    type,
    props,
    children
  }
}
```

```js
const vNode = vdom('div', null, 
  vdom('span', { class: 'item' }, 'item'),
  vdom('input', { disabled: true })
)
```

将上面代码都复制到控制台，console.log(vNode) 即可看到 JavaScript 对象表示的Virtual DOM 树。

[手写一个简易的Virtual DOM](https://zhuanlan.zhihu.com/p/68491595)


## 依赖收集相关


Data、Observer、Dep 和 Watcher 之间的关系，如下图

[流程图](https://tang-yue.github.io/interview/vue/yilaishouji.png)


Data 通过 Observer 转换成了 getter/setter 的形式来追踪变化。

当外界通过 Watcher 读取数据时，会触发getter 从而将Watcher 添加到依赖中。

当数据发生了变化时，会触发setter，从而向 Dep 中依赖 (Watcher) 发送通知。

Watcher 接受到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，从而可能触发用户的某个回调函数等。

参考： 深入浅出 vue.js 书籍

## vue 怎么自定义过滤器

组件的选项中定义本地的过滤器

```js
filters: {
  capitalize: function (value) {
    if(!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```
全局定义过滤器

```js
Vue.filter('capitalize', function(value, arg1, arg2) {
  if(!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```
在双花括号中使用方式

`{{ message | capitalize('arg1', arg2) }}`

## vue 怎么自定义指令

全局自定义指令

```js
Vue.directive('focus', {
  // 当被绑定的元素插入到DOM 中时
  inserted: function (el) {
    el.focus()
  }
})
```
局部指令

```js
directives: {
  focus: {
    // 指令定义
    inserted: function(el) {
      el.focus()
    }
  }
}
```
使用方式

`<input v-focus>`

```js
Vue.directive('name', {
  bind: function(el, binding, vnode) {
    // 只调用一次，指令第一次绑定到元素时调用
  },
  inserted: function(el, binding, vnode) {
    // 被绑定元素插入父节点时调用
  },
  update:  function(el, binding, vnode, oldVnode) {
    // 组件的VNode 更新时调用，但是可能发生在其子VNode 更新之前
  },
  componentUpdated: function(el, binding, vnode, oldVnode) {
    // 指令所在组件的VNode 及其 VNode 全部更新后调用。
  },
  unbind: function(el, binding, vnode) {
    // 只调用一次，指令与元素解绑时调用
  }
})
```

## vue 的 diff 算法

### 什么是虚拟dom

virtual DOM 是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。

### diff 过程

vue diff 的过程就是调用patch 函数的过程，不是暴力的覆盖原有DOM，而是比对新旧两个vnode之间有什么不同，然后根据对比的结果找出需要更新的节点进行更新。

当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用
path 给真实的DOM打补丁。

1. 首先 oldVnode 和 Vnode 对比的时候， 判断oldVnode 是否存在，如果不存在，那么时使用vNode 创建节点并更新视图。 即创建节点的过程。

2. 如果oldVnode 存在，判读oldVnode 是否是同一节点，如果是同一节点，使用patchVnode进行更详细的对比与更新操作。 即 更新节点的过程。

3. 如果不是同一节点，那么使用vnode创建真实节点并插入到视图中旧节点的旁边，然后将视图中的旧节点删除。


更详细的更新操作可以参考  深入浅出 vue.js  书籍








