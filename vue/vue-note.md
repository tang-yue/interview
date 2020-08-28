
html 最外层  font-size: 100px

414 * 3

设计稿  为 1242px   1px 



<!-- clientWidth 为 375 -->

375  / (1242/100)

375/ x = 100px


1rem  ----> 根部元素 50px

375/10       37.5px font-size

100/640 * 10 rem

100/10 * 640 

// 37.5 * 1.5625

------------------------------------


1、vue 中，为什么data是一个方法返回一个对象，而不是直接赋给一个对象

怕重复创建实例造成多实例共享一个数据对象。


2、vue 双向绑定实现原理

将ViewModel 进行 “变异操作”，即使用Proxy或者getter/setter方式将普通属性变为”可监听“的属性，从而实现正向绑定。反向绑定是针对input的，监听change事件以自动更新对应的ViewModel属性。

3、手写一个简易的Virtual DOM

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

4、vdom 函数创建简易Virtual DOM

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


5、依赖收集相关

Data、Observer、Dep 和 Watcher 之间的关系，如下图

[流程图](https://tang-yue.github.io/interview/vue/yilaishouji.png)


Data 通过 Observer 转换成了 getter/setter 的形式来追踪变化。

当外界通过 Watcher 读取数据时，会触发getter 从而将Watcher 添加到依赖中。

当数据发生了变化时，会触发setter，从而向 Dep 中依赖 (Watcher) 发送通知。

Watcher 接受到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，从而可能触发用户的某个回调函数等。






