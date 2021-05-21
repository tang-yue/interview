9月24日 --- 复习

水平垂直居中

position 部分，不定宽高， translate, 百分号，是否带负号 ？

bfc 解决问题的第三个答案 ？

三栏 5种

float
absolute
flex
table
grid

http1.x 和 http2.x 的区别 少回答了第一个

https 和 http 的区别

https 原理 不知道该怎么回答

ssl 证书 ---->  生成第三个随机数，这个地方有点问题

4xx 和 5xx 有点问题

align-content

flex 回答的有点少，作用在项目上的

order align-self flex

vue 自定义指令不太熟

vue diff 说不清楚，当xxxxxx,,,,,第一个 xxxxx 判断条件说不清楚

为什么data是方法返回一个对象，实例说不清楚，关键词说不清楚

生命周期顺序说不清

父beforeCeated 父Created 子 beforeCreated 子 Created 子BeforeMounted 子Mouted

应该有两种情况

子BeforeUpdate Updated 父 BeforeUpdate Updated

hash 模式和 history模式 说不清，优缺点也说不清

onHashChange 方法

pushState 和， 

proxy 和 Object.defineProperty() 的区别

3种

```html
<body>
    <div>
        <input id="input" />
        <span id="text"></span>
    </div>
    <script>
        var data = {}
        let input = document.getElementById('input')
        Object.defineProperty(data, 'text', {
            get: () => {
                return document.getElementById('input').value
            },
            set: (newValue) => {
                document.getElementById('input').value = newValue
                 document.getElementById('text').innerHTML = newValue
            }
        })

        input.addEventListener('keyup', (e) => {
            data.text = e.target.value
        }, false)
    </script>
</body>
```

自定义指令，后面的两个周期函数，没有说清楚。

popstate

vuex 简述  头部没有说清楚

手动创建虚拟dom

```js
class vNode {
    constructor(props, text, type) {
        this.props = props;
        this.text = text;
        this.type = type;
    }
}

function node(props, text, type) {
    return new vNode(props, text, type)
}
```
// 需要检测下对不对， 下次把列子给带上

1. 组件渲染的时候

父 beforeCreated  父 Created  父 beforeMount 子 beforeCreated  子 Created 子 beforeMount  子 Mounted 父 mounted

2. 父组件更新

父beforeCreated 父 Created

3. 子组件更新

父beforeUpdate 子 beforeUpdate 子updated 父 updated

4. 父组件销毁过程

检查 父更新和子更新是否颠倒了 ****

node.js 和浏览器的EventLoop的区别。 需要细究，每一次回忆的过程都是痛苦的，但是只有这样才会成长。

简单的步骤

DNS 解析
TCP 连接
发送http请求
服务器返回请求报文
浏览器解析，并渲染页面
断开 TCP 连接

last-modified
另外一个字段 --- 字段

if-match-since
last-modified

etag
if-none-match

还是说不清楚

同源策略，除了说了三个相同，之后就没了。

名称说不清，危害也说不清，阻止也说不清。都只答出一点点。

浏览器的回流和重绘 ------》 卡壳

reload document.relaod unload  忘记了，完全记不得。

回忆的过程是痛苦的过程

10月7日

webpack 部分 需要重新复习一遍

可枚举的，不可枚举的，以及原型上的

for  of 是可枚举类型的， 包括原型上的

Object.keys().forEach((item) => {

})

可枚举的，不包括原型上的

Object.getOwnProperty()  是 所有类型，但是不包括原型上的

