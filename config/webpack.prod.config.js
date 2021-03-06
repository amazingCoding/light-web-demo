const getCommonConfig = require('./webpack.common.config')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const process = require('process')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const outputPath = path.resolve(process.cwd(), 'build')
const assestPathName = 'assets'
const config = webpackMerge(getCommonConfig(false), {
  mode: 'production',
  output: {
    path: outputPath,
    chunkFilename: `${assestPathName}/[name].[chunkhash:5].js`,
    publicPath: '',
    filename: `${assestPathName}/[name].[chunkhash:5].js`
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          // compress: { drop_console: true },
          output: { comments: false }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    // runtimeChunk: { name: 'runtime' },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        vendors: {
          name: 'vendors',
          test: /[\/]node_modules[\/]/,
          priority: -10
        },
        default: {
          name: 'default',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: assestPathName + `/[name].[chunkhash:5].css`
    })
  ],
  module: {
    rules: [
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: [MiniCssExtractPlugin.loader, 'css-loader?modules', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: new RegExp(`^(.*\\.common).*\\.css`),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2500,
            outputPath: assestPathName,
            publicPath: ``
          },
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      }
    ]
  }
})
module.exports = config