### 相关面试题

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

第一钟 float

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



