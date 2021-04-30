const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const common = require('./webpack.common')

/**
 * @description 生产环境配置
 */
module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',					// 开一个本地服务查看报告
      analyzerHost: '127.0.0.1',			// host 设置
      analyzerPort: 8888,							// 端口号设置
    }),
  ],
  optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: { pure_funcs: ['console.log'] },
          }
        }),
        new OptimizeCssAssetsPlugin()
      ]
  },
  
})
