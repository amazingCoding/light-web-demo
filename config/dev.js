const path = require('path')
const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.dev.config')
const app = express()
const compiler = webpack(webpackConfig)
// 服务器配置
app.use(WebpackDevMiddleware(compiler, {
  publicPath: `http://localhost:8888`,
  stats: { colors: true, chunks: false },
  progress: true,
  inline: true,
  hot: true
}))
app.use(WebpackHotMiddleware(compiler))

// 服务器路由配置
app.get('/:pagename?', function (req, res, next) {
  if (req.params.pagename === 'favicon.ico') return
  const pagename = req.params.pagename + '.html' || 'index.html'
  const filepath = path.join(compiler.outputPath, pagename)
  compiler.outputFileSystem.readFile(filepath, function (err, result) {
    if (err) return next('没有找到相关的路径')
    // 发送获取到的页面
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})
module.exports = app.listen(8888, function (err, next) {
  if (err) { return next('服务器启动错误') }
})