### 移动端

#### 移动端适配之rem总结

REM (Font size of the root element) 是指相对于根元素的字体大小的单位。

如果子元素设置rem单位的属性，通过更改html元素的字体大小，就可以让子元素实际大小发生变化。

rem 布局原理
其实 rem 布局的本质是等比缩放,一般是基于宽度。 解决的问题就是 能够实现UE图的等比缩放。

假设我们将屏幕宽度平均分成100份，每一份的宽度用x表示。

如果让html元素字体的大小, 恒等于屏幕宽度的1/100，那么1rem  和 1x 就等价了。

```css
html {font-size: width/100}
p {width: 50rem}
/*  50rem = 50x = 屏幕宽度的50% */
```

如何让html 字体大小一直等于屏幕宽度的百分之一？通过如下js设置
```js
document.documentElement.style.fontSize = document.documentElement.clientWidth/100 + px
```

*最为关键的地方：那么如何把UE 图中获取的像素单位的值，转换为以rem 为单位的值呢？
公式 **元素宽度/UE图宽度 x 100** 这个就是设计稿上的宽度对应的rem*

[参考rem 布局原理](https://zhuanlan.zhihu.com/p/30413803)



