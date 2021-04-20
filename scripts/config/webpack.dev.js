const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { SERVER_HOST, SERVER_PORT } = require('../constant')
const path = require('path')

/**
 * @description 开发环境配置
 */
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    stats: 'errors-only',         // 终端仅打印error信息
    clientLogLevel: 'silent',     // 日志等级
    compress: true,               // 是否启用gzip压缩
    open: true,                   // 打开默认浏览器
    hot: true,                    // 启用热更新
  }
})
