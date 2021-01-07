该书籍 思维导图

![webpack](https://tang-yue.github.io/interview/webpack/webpack.png)

常见的相关面试题

### webpack打包原理

1、读取入口文件里面的内容。

2、分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树

3、根据AST语法树，生成浏览器能够运行的代码

[参考文章](https://zhuanlan.zhihu.com/p/163665789)

### 利用webpack来优化前端性能

1、压缩代码。删除多余的代码、注释，简化代码的写法等待方式

2、利用CDN加速，在构建过程中，将引用的静态资源路径修改为CDN上对应的路径

3、删除死代码。将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数

4、提取公共代码

[参考文章](https://zhuanlan.zhihu.com/p/44438844)

### 构建流程

初始化参数 ---> 开始编译 ---> 确定入口 ---> 编译模块 ---> 完成模块编译 ---> 输出资源 ---> 输出完成

### 常见的loader 和 plugin有哪些

常见的loader：

css-loader, url-loader, raw-loader, vue-loader

常见的plugin：

mini-css-extract-plugin: 从js 文件中提取css

html-webpack-plugin: 经过配置，可以不用手写html文件，自动打包出html

uglifyjs-webpack-plugin: 压缩js 代码

optimize-css-assets-webpack-plugin: 压缩 css 代码

### webpack 的 热更新原理

- 首先启动本地服务，当浏览器访问资源时对此做响应
- 服务端和客户端使用websocket实现长链接
- webpack 监听 源文件的变化，即当开发者保存文件时，触发webpack 的重新编译。
   + 每次编译都会生成hash值和已改动模块的json文件和已改动模块代码的js文件
   + 编译完成后通过socket 向客户端推送当前编译的 hash 戳
- 客户的 websocket 监听到有文件改动推送过来的hash戳，会和上一次对比
   + 一致则走缓存
   + 不一致则通过ajax 和 jsonp 向服务端获取最新资源
- 使用 内存 文件系统去替换有修改的内容实现局部刷新

[参考文章](https://juejin.im/post/6844903933157048333)

#### websocket

Websocket 是一个持久化的网络通信协议，可以在单个TCP连接上进行全双工通讯，没有了Request 和 Response 的概念，两者地位完全平等，连接一旦建立，客户端和服务端之间实时可以进行双向数据传输。

WebSocket 可以做弹幕、消息订阅、多玩家游戏、协同编辑、股票基金实时报价、视频会议、在线教育、聊天室等应用实时监听服务端变化。

[参考文章](https://juejin.im/post/6876301731966713869)

### 长效缓存

目标是 仅当该文件内容变动才改变该文件名字的hash值

1、提取一些不常更新的第三库。 设置 optimization 的 splitChunks的 cacheGroups。splitChunks 提取模块， 
cacheGroups

2、配置推荐 chunkHash，只有相关代码变化了，才打包出新的hash 文件

3、按需加载js；code split

[参考文章](https://zhuanlan.zhihu.com/p/85997402)

### Tree Shaking 原理

删除 js 中 用不上的死代码，找出使用的代码。

基于 ES6 的静态引用，tree shaking 通过扫描 ES6 的 export，找出被 import 的内容并添加到最终代码中。

webpack 的实现是把所有 import 标记为有使用/无使用两种，在后续压缩时进行区别处理，把没用的都删除。

[参考文章](https://juejin.im/post/6844903774192926728)

### babel 原理

Babel 是一个工具链，主要用于在旧的浏览器或环境中将ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码。

Babel 是一个编译器：

工作流程分为三部分

1、Parse（解析）：将源代码转换成更加抽象的表示方法 （例如抽象语法树）
2、Transform (转换)：对（抽象语法树）做一些特殊处理，让它符合编译器的期望
3、Generate (代码生成)：将第二步经过转换过的（抽象语法树）生成新的代码

### 具体说下 splitChunksPlugin

比如举个列子，有个入口文件：index.js 文件，三个用于异步加载的文件：test1.js、test2.js、test3.js

test1.js、test2.js 引用了React.js，test3.js 引用了Vue.js， 这个时候，我通过配置一些打包分割的规则，react 和 vue 打包后的代码会分别提取到公共代码里。

### happyPack

Webpack 是单线程模型的，所以Webpack需要处理的事情需要一件一件的做，不能多件事一起做。我们需要Webpack能同一时间处理多个任务，发挥多核CPU电脑的威力，HappyPack 就能让Webpack做到这点，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

