该书籍 思维导图

![webpack](https://tang-yue.github.io/fe-interview/webpack/webpack.png)


常见的相关面试题

#### webpack打包原理

1、读取入口文件里面的内容。
2、分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树
3、根据AST语法树，生成浏览器能够运行的代码

[参考文章](https://zhuanlan.zhihu.com/p/163665789)

#### 构建流程

初始化参数 ---> 开始编译 ---> 确定入口 ---> 编译模块 ---> 完成模块编译 ---> 输出资源 ---> 输出完成

#### webpack 的 热更新原理

- 首先启动本地服务，当浏览器访问资源时对此做响应
- 服务端和客户端使用websocket实现长链接
- webpack 监听 源文件的变化，即当开发者保存文件时，触发webpack 的重新编译。
- webpack 监听源文件的变化，即当开发者保存文件时触发 webpack 的重新编译
      - 每次编译都会生成hash值， 已改动模块的json文件，已改动模块代码的js文件
        + 编译完成后通过socket 向客户端推送当前编译的 hash 戳
- 客户的 websocket 监听到又文件改动推送过来的hash戳，会和上一次对比
      + 一致则走缓存
      + 不一致则通过ajax 和 jsonp 向服务端获取最新资源
- 使用 内存 文件系统去替换有修改的内容实现局部刷新

[参考文章](https://juejin.im/post/6844903933157048333)

### 长效缓存

目标是 仅当该文件内容变动才改变该文件名字的hash值

1、提取一些不常更新的第三库。 设置 optimization 的 splitChunks的 cacheGroups。splitChunks 提取模块， 
cacheGroups。

2、配置推荐 chunkHash，只有相关代码变化了，才打包出新的hash 文件

3、按需加载js；code split

[参考文章](https://zhuanlan.zhihu.com/p/85997402)

### Three Sharking 原理

删除 js 中 用不上的死代码


