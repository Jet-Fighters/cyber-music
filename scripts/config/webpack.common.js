

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PROJECT_PATH, isDev } = require('../constant')
const { resolve } = require('path')


/**
 * @description 抽离样式的公共配置
 * @param importLoaders 指定在 CSS loader 处理前使用的 laoder 数量
 */
const getCssLoaders = (importLoaders) => [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders
    }
  },
  {
    loader: 'postcss-loader',
  }
]




/**
 * @description 公共的webpack配置
 */
module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx'),                 // 入口文件
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[contenthash:8]'}.js`,         // 开发环境不需要配哈希值  
    path: path.resolve(PROJECT_PATH, './dist')                          // 出口文件夹
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],                        // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
    // 更改文件路径映射，避免多层级 ../
    alias: {
      'Src': resolve(PROJECT_PATH, './src'),
      'Components': resolve(PROJECT_PATH, './src/components'),
      'Utils': resolve(PROJECT_PATH, './src/utils'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [...getCssLoaders(1)]
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false,    // 特别重要：防止使用v6版本 copy-webpack-plugin 时代码修改刷新页面为空问题
      minify: isDev ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        useShortDoctype: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name]${isDev ? '' : '.[contenthash:8]'}.css`,  
    }),
  ]
}