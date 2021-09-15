const path = require('path')

const webpackConfig = require('./webpack.config.js')

const { merge } = require('webpack-merge')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');   // 压缩 js

const { CleanWebpackPlugin } = require("clean-webpack-plugin");  // 打包输出前清空文件夹

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css 代码

// 使用 webpack-parallel-uglify-plugin 增强代码压缩

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

// 分析打包文件

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = merge(webpackConfig, {
  mode:  'production',
  plugins: [
    new CopyWebpackPlugin({ patterns: [{
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist')
    }]}),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}),
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }),
      // new BundleAnalyzerPlugin({
      //   analyzerHost: '127.0.0.1',
      //   analyzerPort: 8889
      // })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  }
})