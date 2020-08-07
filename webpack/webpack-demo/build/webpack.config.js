const path = require('path');

const webpack = require('webpack');

// happypack 优化
const os = require('os');

const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })


require('@babel/polyfill')

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractCssChunksPlugin = require("mini-css-extract-plugin"); // 从 js 文件中提取出 css 代码

const devMode = process.argv.indexOf('--mode=production') === -1

// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')  // 可以做到拆分多个css，还需要相关配置


const vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // 入口文件名称
  entry: ["@babel/polyfill", path.resolve(__dirname,'../src/main.js')],
    // main: './src/main.js',
    // print: './src/print.js'
  
  // mode: 'development',
  devtool: 'inline-source-map',
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  devServer: {
    contentBase: '../dist', // 告诉服务器从哪里提供内容
    host: '0.0.0.0', // 默认是 localhost
    port: 8080, // 端口号, 默认是8080
    open: true, // 是否自动打开浏览器
    // hot: true, // 启用 webpack 的模块热替换特性 // 开启之后需要手动刷新浏览器。
    // hotOnly: true // 当编译失败之后不进行热更新
  },
  // 输出文件名称
  output: {
      // chunkFilename: 'js/[name].[hash:8].js',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../dist')
  },
  externals: {    // 不希望 webpack 将它又编译进文件中
    jquery: 'jQuery'
  },
  module: {
    noParse: /jquery/, //  不去解析 jquery 中的依赖库
    rules: [
      { 
        test: /\.css$/,
        // use: [{ loader: devMode ? 'vue-style-loader' : ExtractCssChunksPlugin.loader }] // 开发环境这样写，导致css 失效
        // options 里 配置 css 输出配置 outputPath 好像不起作用
        use: [ { loader: ExtractCssChunksPlugin.loader, options: { hmr: devMode }},
        { loader: 'css-loader' }, { loader: 'postcss-loader', options: {
          plugins:[require('autoprefixer')] } }]   // 因为 压缩 css 故将 style-loader 替换， postcss-loader 为 css 添加 浏览器 前缀
      },
      {
        test:/\.(jep?g|png|gif)$/,
        use:{
          loader:'url-loader',
          options:{
            limit:10240,
            fallback:{
              loader:'file-loader',
              options:{
                name:'img/[name].[hash:8].[ext]'
              }
            },
            // include: [path.resolve(__dirname, 'src/assets/icons')],
            exclude: /node_modules/
          },
        }
      },
      {
        test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use:{
          loader:'url-loader',
          options:{
            limit:10240,
            fallback:{
              loader:'file-loader',
              options:{
                name:'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
      {
        test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use:{
          loader:'url-loader',
          options:{
            limit:10240,
            fallback:{
              loader:'file-loader',
              options:{
                name:'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      // 加载 .txt 个是文件
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.vue$/,
        use: ['cache-loader', 'thread-loader', {
          loader: 'vue-loader', options: {
            compilerOptions:{
              preserveWhitespace:false
            },
          },
        }],
        include: [path.resolve(__dirname, '../src')],
        exclude: /node_modules/
      },
      { test: /\.js$/,
        loader: 'happypack/loader?id=happyBabel', exclude: /node_modules/ }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, '../src'),
      // 'assets': resolve('src/asserts'),
      // 'components': resolve('src/components')
    },
    extensions:['*','.js','.json','.vue']
  },
  plugins: [
    new HappyPack({
      id: 'happyBabel',
      loaders: [
        {
          loader: 'babel-loader',
          options:{
            babelrc: true,
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyThreadPool // 共享进程池
    }),
    // 不用手写 html, 打包出来的会自动打包出 html
    new HtmlWebpackPlugin({
      title: 'Test App',    // html <title>{title}</title>
      template: path.resolve(__dirname, '../public/index.html'), //  如果不是后加了vue, 那么这个 public/index.html 可以完全去除
      filename: 'index.html'
    }),
    new ExtractCssChunksPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      // filename: '[name]_[contenthash:8].css', // 为输出的 css 文件名称 加上 Hash 的值
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new vueLoaderPlugin()
    // 内置插件， 可以修改process.env.NODE_ENV 的值，优先级高于命令行修改
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ],
}