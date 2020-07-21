const path = require('path')
const fs = require('fs')
const process = require('process')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appDir = path.resolve(process.cwd(), 'app')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
// todo ： 自动获取指定目录
const routers = ['index', 'about', 'detail']
const __DEV__ = JSON.stringify(JSON.parse(process.env.NODE_ENV == 'dev' ? 'true' : 'false'))
const webpackConfig = {
  entry: {},
  plugins: [new webpack.DefinePlugin({ __DEV__ })],
  resolve: { extensions: [".ts", ".tsx", '.js'] },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      use: ['ts-loader'],
      include: [appDir],
      exclude: [nodeModuleDir]
    }]
  }
}
routers.map((item) => {
  // 每个页面使用一个entry配置
  const routerScript = __DEV__ ? [
    'webpack-hot-middleware/client?reload=true',
    path.join(appDir, `router/${item}/index.tsx`)
  ] : [path.join(appDir, `router/${item}/index.tsx`)]
  // 如果是 JS 渲染的，可以选择一个 temp.html 即可
  const tempSrc = path.join(appDir, `router/${item}/index.html`)
  const plugin = new HtmlWebpackPlugin({
    filename: `${item}.html`,
    title: item,
    template: tempSrc,
    inject: true,
    chunks: [item]
  })
  webpackConfig.entry[item] = routerScript
  webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig