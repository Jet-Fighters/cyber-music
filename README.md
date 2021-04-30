## cyber-music

### 参考

**配置项目**

- [从零开始配置 react-typescript 项目](https://juejin.cn/post/6860129883398668296)







----

### 项目问题

**包版本**

- `webpack-cli`  和 `webpack-dev-server` 会有版本兼容问题导致打包报错 ` Cannot find module 'webpack/bin/config-yargs'`，本项目统一使用 `3.X` 版本
- `webpack` 和 `html-webpack-plugin` 需要统一版本，即如果 `webpack` 为5版本但是 `html-webpack-plugin` 为4版本在使用生产环境时会有问题，本项目统一使用 `4.X` 版本

- 使用 `less-loader`  时，如果 `less-loader` 版本过高，会报错 `TypeError: this.getOptions is not a function`，本次项目统一使用 `5.X` 版本，`sass-loader` 同理，本次项目统一使用 `10.X` 版本
- `node-sass` 国内下载可能会遇到各种问题，如果下载包因为node-sass卡住，则在package.json中将node-sass的引用去掉，并且使用 `cnpm `去下
- `terser-webpack-plugin` 版本需要和 webpack 版本一致