/**
 * @description 存放webpack配置的公用变量
 */

const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../')         // 用于存放项目根路径常量
const PROJECT_NAME = path.parse(PROJECT_PATH).name          // 用于存放项目名称cyber-music的常量

// NODE_ENV是自定义的属性,需要配合cross-env（用于统一window和mac上配置环境变量的方式）在package.json中配置使用
const isDev = process.env.NODE_ENV !== 'production'         // 用于判断项目启动的是开发环境还是生产环境

const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 3001

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  isDev,
  SERVER_HOST,
  SERVER_PORT,
}
