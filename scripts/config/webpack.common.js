

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')


const webpack = require('webpack')
const { PROJECT_PATH, isDev } = require('../constant')



/**
 * @description 抽离样式的公共配置
 * @param importLoaders 指定在 CSS loader 处理前使用的 laoder 数量
 */
const getCssLoaders = (importLoaders) => [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: isDev,
      importLoaders,
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
    filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,                // 开发环境不需要配哈希值  
    path: path.resolve(PROJECT_PATH, './dist')                          // 出口文件夹
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],                        // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
    // 更改文件路径映射，避免多层级 ../
    alias: {
      'Src': path.resolve(PROJECT_PATH, './src'),
      'Components': path.resolve(PROJECT_PATH, './src/components'),
      'Utils': path.resolve(PROJECT_PATH, './src/utils'),
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
    },
    
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
        use: [...getCssLoaders(1)], 
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
      template: path.resolve(PROJECT_PATH, './public/index.html'),
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
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
    new CopyPlugin([
      {
        from: path.resolve(PROJECT_PATH, './public'),    
        to: path.resolve(PROJECT_PATH, './dist/public')        
      }   
    ]),
    new WebpackBar({
      name: '正在尝试与Rhodes Island™取得神经连接...',
      color: '#fa8c16',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
    new HardSourceWebpackPlugin(),
  ]
}