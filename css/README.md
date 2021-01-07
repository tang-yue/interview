
## CSS 盒模型详解

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

## 块状元素和行内元素

1. 块状元素：div、 p、 h1 ~ h6、ul、ol、dl、li、dd、table、hr、blockquote、address、table、menu、pre，HTML5新增的header、section、aside、footer 等

2. 行内元素：span、img、a、lable、input、abbr （缩写）、em（强调）、big、cite （引用）、i (斜体)、q （短引用）、textarea、select、small、

sub、sup、strong、button

## css 选择器

!important > 行内样式 > id 选择器样式 > 类选择器/伪类选择器 > 元素名/伪元素

## 理解BFC原理

BFC 即Block Formatting Contexts （块级格式化上下文）。它是一个独立的渲染区域，里面的元素和外部的元素相互不影响。

#### 触发BFC

1、body 根元素

2、浮动元素：float: left；float: right

3、定位元素：position为absolute或fixed

4、display：inline-block；table-cell；table-caption；flex；inline-flex

5、overflow：hidden；scroll；auto

#### 利用BFC 能解决哪些问题

1、解决同一BFC容器中的相邻块级元素垂直方向的外边距重叠问题
2、BFC 可以包含浮动元素，(即内部是个浮动元素，高度塌陷，父级利用bfc，清除浮动)
3、BFC可以阻止元素被浮动元素覆盖

[参考1](https://www.zhihu.com/search?type=content&q=BFC)

[参考2](https://muyiy.cn/question/css/39.html)

[参考3](https://juejin.im/entry/59478ce8a0bb9f006bda9756)

## 垂直居中：

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
// vertical-align 起作用的前提元素为inline水平元素或table-cell元素，
// 包括span，img，input，button，td 以及通过display改变了显示水平为inline水平或者table-cell的元素。
// 但是 display: inline，无法设置宽高，所以这里用table-cell.
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
  // transform 下的 translate 做的是移动变换，相对于的是自身的宽和高
  transform: translate(-50%, -50%)  
}
</style>
<div class="wp">
    <div class="box">123123</div>
</div>
```

```html
<div style=” position: absolute; width: 100%; height: 100%;”>
<div style=”width: 2rem; height:2rem; background-color: red; position: absolute; left: calc(50% - 1rem); top: calc(50% - 1rem)”/>
</div>
```

## 手写flex常用的属性，并且讲出作用

### 设置在容器上的属性

**flex-direction** 属性决定主轴的方向（即项目的排列方向）

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```
+ row (默认值)：主轴为水平方向，起点在左端。
+ row-reverse：主轴为水平方向，起点在右端。
+ column：主轴为垂直方向，起点在上沿。
+ column-reverse：主轴为垂直方向，起点在下沿。

**flex-wrap** 默认情况下，项目都排在一条线（又称“轴线”）上。flex-wrap 属性定义，如果一条轴线排不下，如何换行。

```css
.box {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

+ nowrap（默认）：不换行。
+ wrap：换行，第一行在上方。
+ wrap-reverse：换行，第一行在下方。

**flex-flow** 属性是flex-direction 属性和flex-wrap 属性的简写形式，默认为 row nowrap.

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>
}
```

**justify-content** 属性定义项目在主轴上的对齐方式。

```css
  .box {
    justify-content: flex-start | flex-end | center | space-between | space-around;
  }
```
+ flex-start（默认值）：左对齐
+ flex-end：右对齐
+ center：居中
+ space-between：两端对齐，项目之间的间隔都相等。
+ space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

**align-items** 属性定义项目在交叉轴上如何对齐

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

+ flex-start：交叉轴的起点对齐。
+ flex-end：交叉轴的终点对齐。
+ cener：交叉轴的中点对齐。
+ baseline：`项目的第一行文字的基线对齐`。
+ stretch（默认值）：如果项目未设置高度或设为auto，将沾满整个容器的高度。

**align-content** 属性定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

+ flex-start：与交叉轴的起点对齐。 
+ flex-end： 与交叉轴的终点对齐。
+ center：与交叉轴的中点对齐。
+ space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
+ space-around：每根轴线两侧的间隔都相等。
+ stretch（默认值）：轴线沾满整个交叉轴。

### 作用在项目上的属性

+ order：属性定义项目的排列顺序。数值越小，排列越靠前，默认为0.
+ flex-grow： 属性定义项目的放大比例。
+ flex-shrink：属性定义了项目的缩小比例。
+ flex-basis：属性定义了在分配多余空间之前，项目占据的主轴空间。
+ flex：属性是`flex-grow`,`flex-shrink` 和 `flex-basis` 的简写。
+ align-self：属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

## animation

### 属性详解

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


### keyframes: 定义动画规则，关键帧

1、animationname  必需的。定义animation的名称
2、keyframes-selector  必需的，动画持续时间的百分比
3、css-styles  必需的，一个或多个合法的css样式属性

举列：

```css
@keyframes myAnim {
  from { background: #f00; }
  50% { background: #0f0; }
  to { background: yellowgreen; }
}
```
```css
@keyframes myAnim{
  0% { background: #f00; }
  50% { background: #0f0; }
  100% { background: yellowgreen; }
}
```
[效果地址](./animation.html)

### 相关的transition属性

`transition: property duration timing-function delay;`

1. transition-property: 规定设置过渡效果的CSS属性的名称
2. transition-duration: 规定完成过渡效果需要多少秒或毫秒
3. transition-timing-function: 规定速度效果的速度曲线
4. transition-delay: 定义过渡效果何时开始

## 布局

### 两栏布局

+ 左边固定右边自适应

[代码参考](./left-fixed-right.html)

1. 第一种实现方式 利用浮动，然后利用bfc 清除覆盖元素 达到目的， 再在父级上清除浮动
2. 第二种实现方式，左浮动固定，右边利用margin-left， 再在父级上清除浮动
3. 第三种方式，父级元素，`display:table` 属性，子级元素都为`display: table-cell`
4. 第四种方式，父级table，子级都为`table-cell`
5. 第五种方式，父级`display: flex`，右边 `flex-grow: 1` 占据剩余的空间
6. 第六种方式，父级采用`display: grid`的网格布局，然后左边占据第一个位置，右边占据第二个位置

[参考地址](https://blog.csdn.net/caicai1171523597/article/details/86642535)

### 三栏布局 （左右固定，中间不固定）

[代码参考](./three-column.html)

1. 第一种方式：通过左边向左浮动，右边向右浮动，中间部分创建bfc
2. 第二种方式：左，中，右，设置绝对定位，左边left,0，右边right:0, 中间 left right, 等于左右的宽， 缺点脱离文档流
3. 第三种方式：通过 display: flex，中间（center）部分flex-grow 占据剩余部分 
4. 第四种方式： 左，中，右 table-cell 父级 table

[参考文章](https://juejin.im/post/6844903826885967880)

## position 的几个属性，以及解释

定位元素：位置属性为除static 以外的任务东西

+ static：该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时top，right，bottom，left 和 z-index 属性都无效。

+ relative：元素先放置在未添加定位时的位置，再不改变页面布局的前提下调整元素位置。

+ absolute：元素会被移出正常文档流，并不为元素预留空间，通过指定元素**相对于最近的非static 定位祖先元素的偏移**，来确定元素位置。

+ fixed：生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定

+ inherit：规定应该从父元素继承 position 属性的值。

+ sticky：粘性定位

[参考文章](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

## svg 和 canvas 的区别

相同点：都是有效的图形工具；都使用javascript和html；都遵守万维网联合会（W3C）标准。

svg： 矢量图，不依赖于像素，无限放大后不会失真；以dom的形式表示，事件绑定由浏览器直接分发到节点上；dom形式，涉及到动画时候需要更新dom, 性能较低。

canvas：定制型更强，可以绘制自己想要的东西；非dom结构形式，用JavaScript进行绘制，涉及到动画性能较高；事件分发由canvas处理，绘制的内容的事件需要自己做处理；依赖于像素，无法高效保真，画布较大时候性能较低。

[参考文章](https://juejin.im/post/6844903715669999629#heading-10)

