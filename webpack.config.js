const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
  const devMode = env.NODE_ENV !== 'production'
  return {
    mode: env.NODE_ENV,
    stats: {
      entrypoints: false,
      children: false
    },
    entry: {
      main: './scss/main.scss'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      }),
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map[query]'
      }),
      {
        apply (compiler) {
          compiler.hooks.shouldEmit.tap('Remove styles from output', (compilation) => {
            delete compilation.assets['main.js']
            delete compilation.assets['main.js.map']
            return true
          })
        }
      }
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: [
            path.resolve(__dirname, '/node_modules/')
          ],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                reloadAll: true,
                publicPath: '../',
                sourceMap: true
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    devtool: false
  }
}
