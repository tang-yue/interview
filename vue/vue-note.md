## vue 的生命周期

1、beforeCreate 在实列初始化前被触发

2、created 会在实列初始化之后，被添加到DOM之前触发

3、beforeMount 会在元素已经准备好被添加到DOM，但还没有添加的时候触发

4、mounted 会在元素创建后触发，但不确定被添加到了DOM。可以用nextTick 来保证这一点。

5、beforeUpdate 会在由于数据更新将要对DOM做一些更改时触发

6、updated 会在DOM 的更改已经完成后触发

7、beforeDestroy 会在组件即将被销毁并且从DOM上移除时触发

8、destoryed 会在组件被销毁后触发

## vue 3.0 的新特性

1. 更好的支持TypeScript
2. Vue3 中 响应式数据原理改成proxy
3. 新的 Composition API
4. Virtual DOM 重构

## vue的内部机制

首先vue会调用_init函数进行初始化，然后调用$mount挂载组件，编译，之后得到render Function，

当render function 被渲染的时候，读取data 值 触发getter 函数，将观察者watch对象存放起来

当修改data的值，触发setter函数， 通知watcher，然后调用update 函数，然后更新视图。


## Proxy 与 Object.defineProperty() 对比

1. proxy 可以直接监听对象而非属性，并返回一个新对象，而 Object.defineProperty() 只能劫持对象的属性，我们需要对对象进行深度遍历去对属性进行操作。
2. proxy 是 es6提供的新特性，兼容性不好，而 Object.defineProperty() 兼容性好，支持 IE9，IE9 以下的版本不兼容。
3. proxy 可以直接监听数组的变化，而 Object.defineProperty() 只提供了8种检测数组的变化。
4. Proxy 有多达13种拦截方法，不限于apply，ownKeys，deletePropery、has 等等是 Object.defineProperty不具备的。

### Vue 的父组件和子组件生命周期钩子执行顺序

归类为以下 四种情况

1. 加载渲染过程：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

2. 子组件更新过程：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

3. 父组件更新过程：父 beforeUpdate -> 父 updated

4. 父组件销毁过程：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

[参考文章](https://www.cnblogs.com/wtsx-2019/p/12411987.html)

[参考文章](https://juejin.im/post/6876002080235274247)

## vue 中，为什么data是一个方法返回一个对象，而不是直接赋给一个对象

怕重复创建实例造成多实例共享一个数据对象。

## computed 和 watch 的区别

1. watch 就是单纯的是监听某个数据的变化，支持深度监听
2. computed 是计算属性，是依赖于某个或者某些属性值，只有当依赖的数据发生变化时，才会发生变化

## vue 双向绑定实现原理

将ViewModel 进行 “变异操作”，即使用Proxy或者getter/setter方式将普通属性变为”可监听“的属性，从而实现正向绑定。反向绑定是针对input的，监听change事件以自动更新对应的ViewModel属性。

### 手写一个数据绑定

```js
<input id="input" type="text" />
<div id="text"></div>

let input = document.getElementById('input');

let text = document.getElementById('text');

let data = { value: '' };

Object.defineProperty(data, 'value', {
  set: function(val) {
    text.innerHTML = val;
    input.value = val;
  },
  get: function() {
    return input.value;
  }
});

input.onkeyup = function(e) {
  data.value = e.target.value;
}
```

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
// 第一种方式
function vdom(type, props, ...children) {
  return {
    type,
    props,
    children
  }
}
```

```js
// 第二种方式
class VNode {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }
}

const h = function (t, p, c) {
  return new VNode(t, p, c)
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

![流程图](https://tang-yue.github.io/interview/vue/yilaishouji.png)


Data 通过 Observer 转换成了 getter/setter 的形式来追踪变化。

当外界通过 Watcher 读取数据时，会触发getter 从而将Watcher 添加到依赖中。

当数据发生了变化时，会触发setter，从而向 Dep 中依赖 (Watcher) 发送通知。

Watcher 接受到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，从而可能触发用户的某个回调函数等。

参考： 深入浅出 vue.js 书籍

和解释vue响应式系统，一样的答案。

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

## 什么是虚拟dom

virtual DOM 是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。

## vue diff 过程

vue diff 的过程就是调用patch 函数的过程，不是暴力的覆盖原有DOM，而是比对新旧两个vnode之间有什么不同，然后根据对比的结果找出需要更新的节点进行更新。

当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用
path 给真实的DOM打补丁。

1. 首先 oldVnode 和 Vnode 对比的时候， 判断oldVnode 是否存在，如果不存在，那么时使用vNode 创建节点并更新视图。 即创建节点的过程。

2. 如果oldVnode 存在，判读oldVnode 是否是同一节点，如果是同一节点，使用patchVnode进行更详细的对比与更新操作。 即 更新节点的过程。

3. 如果不是同一节点，那么使用vnode创建真实节点并插入到视图中旧节点的旁边，然后将视图中的旧节点删除。


更详细的更新操作可以参考  深入浅出 vue.js  书籍

## 列表diff中key的作用

默认列表diff中使用索引进行变更前后的对比，此时若某项数据被移除或新增，可能会导致后续所有项均被认为需要移除重建，效率极低。
因此需要一个key替代索引作为对比依据，当发现相同key的项在不同索引，则会使用移动替代移除重建。


## 剖析前端路由管理

先定义一个父类 BaseRouter，用于实现Hash 路由和 History 路由的一些共有方法；

基本的前端路由提供以下功能

1. 前端Router 可以控制浏览器的history，使得浏览器不会在URL发生改变时刷新整个页面。
2. 前端Router 需要维护一个 URL 历史栈，通过这个栈可以返回之前的页面，进入下一个页面。

hash 模式

hash 值变化，不会刷新页面，也就是浏览器不会向服务器发送请求，但会触发hashchange 事件，通过监听这个事件，可以根据不同hash渲染不同视图。

history 模式

在H5中新增了history.pushState() 和 history.replaceState()，分别可以添加和修改历史记录，同时，不会刷新页面，浏览器历史记录的变更会触发

window 的 onpopstate 事件，可以根据这个事件来监听URL的变化。

[参考文章](https://zhuanlan.zhihu.com/p/116023681)

[参考文章](https://juejin.im/post/6844903906024095751)

[vue routre 原理](https://www.zhihu.com/search?type=content&q=vue%20router%20%E5%8E%9F%E7%90%86)

## vuex 简述

Vuex 是一个专门为Vue.js 应用程序开发的状态管理模式。每一个Vuex应用的核心就是store (仓库)。”store“基本上就是一个容器，它包含着你的应用中
大部分的状态 （state）。

1. Vuex 的状态存储是响应式的。当Vue 组件从store 中读取状态的时候，若store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

2. 改变 store 中的状态的唯一途径就是显式地提交(commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

主要包括以下几个模块

1. State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
2. Getter：允许组件从Store 中获取数据，mapGetters 辅助函数仅仅是将store 中的getter 映射到局部计算属性。
3. Mutatio：是唯一更改store中状态的方法，且必须是同步函数。
4. Action：用于提交mutation，而不是直接变更状态，可以包含任意异步操作。
5. Module：允许将单一的Store 拆分为多个store且同时保存在单一的状态树中。

## vue 和 react 的区别

1. 相同点：
- 数据驱动页面，提供响应式的视图组件
- 都有virtual DOM，组件化的开发，通过props参数进行父子之间组件传递数据，都实现了webComponents规范
- 数据流动单向，都支持服务器的渲染SSR
- 都有支持native的方法，react 有React native，vue 有wexx

2. 不同点：
- 数据绑定：Vue 实现了双向的数据绑定，react数据流动单向的
- 数据渲染：大规模的数据渲染，react更快
- 使用场景：React配合Redux架构适合大规模多人协作复杂项目，Vue适合小块的项目
- 开发风格：React 推荐做法 jsx + inline style 把html 和css 都写在js了；vue 是采用webpack + vue-loader 单文件组件格式，html,js,css 同一个文件

[参考文章](https://juejin.im/post/6876002080235274247#heading-7)
          











