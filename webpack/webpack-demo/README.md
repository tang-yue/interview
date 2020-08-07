
webpack 为了让浏览器端代码也采用 common.js 的方法， 能够像 Node.js 一样进行模块化开发。

特点之一： 任何类型的模块（资源文件），理论上都可以通过被转化为 Javascript 代码实现与其他模块的合并与加载。

#### 区分环境

webpack.dev.js 开发环境配置文件

开发环境主要实现的是 热更新，不要压缩代码，完整的 sourceMap

webpack.prod.js  生产环境配置文件

生产环境主要实现的是压缩代码，提取css 文件， 合理的 sourceMap、分割代码

需要安装一些模块
webpack-merge  合并配置
copy-webpack-plugin  拷贝静态资源
optimize-css-assets-webpack-plugin 压缩css
uglifyjs-webpack-plugin  压缩js

#### 优化

1、加上 happypack 好像也没起什么作用

2、使用 webpack-parallel-uglify-plugin  增强压缩， 可以明显看到打包被压缩了很多。

3、抽离第三方模块

4、使用webpack内置的DllPlugin DllReferencePlugin进行抽离， 发现第二次打包速度明显加快。

5、配置缓存

npm i -D cache-loader

在一些性能开销较大的 loader 之前添加此 loader即可

6、引入webpack-bundle-analyzer分析打包后的文件

windows请安装npm i -D cross-env

7、externals  [官网]

Externals的方式，我们将这些不需要打包的静态资源从构建逻辑中剔除出去，而使用 CDN
的方式，去引用它们。

如用CDN的方式引入的jquery，我们在使用时，依旧用require的方式来使用，但是却不希望webpack将它又编译进文件中。

8、Tree-shaking  

webpack4 设置 mode 为 production 的时候已经自动开启了 tree-shaking。 但是要想使其生效，生成的代码必须是 ES6 模块，不能使用 其他类型的模块  如 CommonJS 之流

因为 Babel 的预案 (preset)  默认会将任何模块类型都转译成CommmonJS 类型，  修改如下代码：

```js
// webpack.config.js
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', { modules: false }]
                }
            }，
            exclude: /(node_modules)/
        }
    ]
}
```

