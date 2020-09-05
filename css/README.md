
### 相关面试题

### CSS 盒模型详解
起源于 回答错误

盒模型 分为IE盒模型和W3C 标准盒模型

1. W3C 标准盒模型：

熟悉 width，height 只包含内容 content，不包含border和padding。

2. IE 盒模型：

属性width，height包含border 和padding, 指的是 content + padding + border。

在 ie8+ 浏览器中使用哪个盒模型可以由box-sizing （css 新增的属性）控制，默认值为content-box, 即标准盒模型；

如果将box-sizing 设为border-box 则用的是 IE盒模型。如果在ie6,7,8中DOCTYPE缺失会触发IE模式。在当前W3C标准中盒模型是可以通过box-sizing

自由的进行切换的。

因为若不声明DOCTYPE类型，IE浏览器会将盒子模型解释为IE盒子模型，FireFox 等会将其解释为W3C 盒子模型；若在页面中声明了DOCTYPE类型，所有的

浏览器都会把盒模型解释为 W3C 盒模型。

[参考文章](https://juejin.im/post/6844903505983963143)

### 理解BFC原理

BFC 即Block Formatting Contexts （块级格式化上下文）。它是一个独立的渲染区域，里面的元素和外部的元素相互不影响。

#### 触发BFC

1、body 根元素
2、浮动元素：float: left；float: right
3、定位元素：position为absolute或fixed
4、display：inline-block；table-cell；table-caption；flex；inline-flex
5、overflow：hidden；scroll；auto

#### 利用BFC 能解决哪些问题

1、解决同一BFC容器中的相邻块级元素垂直方向的外边距重叠问题
2、清除浮动
3、BFC可以阻止元素被浮动元素覆盖

[参考1](https://www.zhihu.com/search?type=content&q=BFC)
[参考2](https://muyiy.cn/question/css/39.html)
[参考3](https://juejin.im/entry/59478ce8a0bb9f006bda9756)

### 垂直居中：

1、PC端有兼容性要求，宽高固定

```js
<div class="parent">
  <div class="child">

  </div>
</div>
<style>
.parent {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid #eee;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  border: 1px solid #aaa;
  width: 100px;
  height: 100px;
}
</style>
```

2、pc 端无兼容性要求，宽高不固定，推荐css-table
```js
<div class="parent">
  <div class="child">

  </div>
</div>
<style>
.parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #aaa;
    width: 200px;
    height: 200px;
  }
.child {
  display: inline-block;
  border: 1px solid #aaa;
}
</style>
```

3、pc端无兼容性要求，宽高不固定，推荐flex, （这个比较好）
```js
<div class="parent">
  <div class="child">
  </div>
</div>
<style>
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #aaa;
    width: 200px;
    height: 200px;
}
.child {
    
}
</style>
```

4、pc端无兼容性要求，宽高不固定，用绝对定位怎么实现。

```js
<style>
.wp {
  position: relative;
  border: 1px solid red;
  width: 300px;
  height: 300px;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;  
  background: green;
  transform: translate(-50%, -50%)  
}
</style>
<div class="wp">
    <div class="box">123123</div>
</div>
```

#### 手写flex常用的属性，并且讲出作用

设置在容器上的属性

flex-direction flex-wrap flex-flow justify-content align-items align-content

设置在项目上的属性

order flex-grow (放大) flex-shrink (缩小)  flex-basis  flex align-self


#### animation

##### 属性详解

1、animation-name：指定要绑定到选择器的关键帧的名称
2、animation-duration: 定义动画完成一个周期需要多少秒或毫秒
3、animation-timing-function: 指定动画将如何完成一个周期   ===》 相应的属性如下

- linear 动画从头到尾的速度是相同的
- ease 默认，动画以低速开始，然后加快，在结束前变慢
- ease-in 动画以低速开始
- ease-out 动画以低速结束
- ease-in-out 动画以低速开始和结束
- cubic-bezier
- step-start
- step-end
- steps()

4、animation-delay: 定义动画什么时候开始
5、animation-iteration-count: 定义动画应该播放多少次
6、animation-direction: 定义是否循环交替反向播放动画     ===》相应的属性如下

- normal 动画按正常播放
- reverse 动画反向播放
- alternate 动画在奇数次，正向播放，在偶数次反向播放
- alternate-reverse 动画在奇数次，反向播放，在偶数次正向播放
- initial 设置该属性为它的默认值
- inherit 从父元素继承该属性

7、animation-fill-mode: 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
8、animation-play-state: 指定动画是否正在运行或已暂停


##### keyframes: 定义动画规则，关键帧

1、animationname  必需的。定义animation的名称
2、keyframes-selector  必需的，动画持续时间的百分比
3、css-styles  必需的，一个或多个合法的css样式属性


#### 布局

左边固定右边自适应

[参考地址](https://blog.csdn.net/caicai1171523597/article/details/86642535)

```html
<div class="container">
  <div class="left">固定</div>
  <div class="right"></div>
<div>
```

第一种 float

```css
  .left {
    float: left;
    width: 100px;
  }
  .right {
    margin-left: 100px;
  }
  /* 请除浮动  */
  .container {
    content: '';
    clear: both;
    display: block;
  }
```



