const webpack = require('webpack')

const webpackConfig = require('./webpack.config.js')

const { merge } = require('webpack-merge')

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../public', // 告诉服务器从哪里提供内容
    host: '0.0.0.0', // 默认是 localhost
    port: 8080, // 端口号, 默认是8080
    open: true, // 是否自动打开浏览器
    // hot: true, // 启用 webpack 的模块热替换特性 // 开启之后需要手动刷新浏览器。
    // hotOnly: true // 当编译失败之后不进行热更新
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ]
})