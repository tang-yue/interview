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
公式 **元素宽度/UE图宽度 x 100** `这个就是设计稿上的宽度对应的rem`*

为什么要这么计算？？ 具体我也不知道为什么这么计算，只是从下面的过程推导出来。

下面的表格是 UE图等比缩放，对应的元素宽度

| UE图宽度 | UE图中元素宽度 |
| 640px | 100px |
| 480px | 75px |
| 320px | 50px |

```js
比例关系：
640/480 === 100/75
480/320 === 75/50
```
假设UE图尺寸是640px，UE图中的一个元素宽度是100px， 根据公式 100/640 * 100 = 15.625

下面的表格是通过我们的元素在不同屏幕宽度下的计算值。

| 页面宽度 | html 字体大小 | 页面上的p元素宽度 |
|:-----: |:----:|:---:|:----:|
| 640px   | 640/100 = 6.4px | 15.625 * 6.4 = 100px |
| 480px | 480/100 = 4.8px | 15.625 * 4.8 = 75px | 
| 320px | 320/100 = 3.2px | 15.625 * 3.2 = 50px |

其实将这里的页面宽度的值和UE图宽度值，进行类比，就会发现公式是正确的。


设计稿为什么通常都是 750px 的呢。

看下面的表格

| 设备            | 屏幕尺寸	   | 分辨率(pt)    | Reader   | 分辨率(px)     | 渲染后   | PPI(DPI)   |
| :--------------: |:-----------:|:------------:|:--------:|:-------------:|:-------:| :--:|
| iPhone 3GS     | 3.5寸      | 320*480      | @1x     | 320*480         | 空      | 163         |
| iphone 4/4S    | 3.5寸      | 320*480      | @2x     | 640*960         | 空      | 326         |
| iphone 5/5S/5C | 4.0寸      | 320*568      | @2x     | 640*1136        | 空      | 326         |
| iPhone 6/6s    | 4.7寸      | 375*667      | @2x     | 750*1334        | 空      | 326         |
| iPhone 6/6s    | 5.5寸      |  414*736     | @3x     | 1242*2208       | 空      | 401         |


pt: 逻辑像素或逻辑分辨率
px: 物理像素或物理分辨率，又被称为设备像素

结论：pt 和 px 的关系就是 —————— 1pt 里面有几个像素点，（比如 1pt 里面有1个px，也可以有2个，3个，分别对应上图的@1x,@2x,@3x）

所以设计稿 640px 和 750px 要除以2，就是因为设计师给的640px 和 750px 是物理像素，而在我们在浏览器模拟调试移动端看到的是逻辑像素。

1pt 里面像素点越多肯定越清晰，那为什么没有看到设计师给1242的设计稿呢？据说人用肉眼眼睛能分辨出的最大分辨率就是@2x即750*1334，而@3x已经超过人肉眼分辨的极限了。

所以会发现 iPhone6/6sPlus (@3x) 并没有比 iphone6/6s (@2x) 更清晰，相当于是一样的。

既然知道了公式 和 设计稿通常是750px的，那么在实际应用中，应该怎么写。应该要满足容易计算出 rem 值。

如果容易计算，我们期望 1rem 对应设计稿上 100px， 1rem ----- 100px

100/750 * ( 分为多少份) x =====> 1rem   =====> 推倒出 x 为 7.5

因此设置html 字体大小就有了 如下代码

```js
(function() {
  var docEl = doc.documentElement;
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',  // 设备在纵横方向改变时触发, 设备缩放时
  // 执行函数
  recalc = function() {
    var width = docEl.clientWidth || doc.body.clientWidth   // 获取屏幕宽度
    docEl.style.fontSize = width/7.5 + 'px'
    // 以防在iPad 上字体过大，可以设置宽度大于某值时， 设置固定的px
  }
  // 监听事件执行函数
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false); // HTML 文档被完全加载和解析完成，第一次加载页面的时候，没有切换设备
})()
```
自动转rem，可以安装插件 `postcss-pxtorem`，添加postcss.config.js 文件，代码如下：

```js
module.exports = {
  plugins: {
    "autoprefixer": {},
    "postcss-pxtorem": {
      "rootValue": 100, // 这个值设置看下文档就知道了
      "propList": ["*"],
      "selectorBlackList": ["van"]
    }
  }
}
```


[参考rem 布局原理](https://zhuanlan.zhihu.com/p/30413803)
[参考设计稿尺寸](https://blog.csdn.net/chelen_jak/article/details/84632804?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase)



