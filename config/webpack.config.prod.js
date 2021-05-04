const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

const TerserPlugin = require('terser-webpack-plugin')

const webpackConfig = webpackMerge.merge(baseWebpackConfig,{
    mode:'production',
    stats:{children:false,warnings:false},
    optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: false,
                drop_debugger: false,
              },
            },
          }),
        ],
        splitChunks: {
            cacheGroups: {
              commons: {
                name: 'commons',
                chunks: 'initial',
                minChunks: 3,
                enforce:true
              },
            },
          }
      }
})

module.exports = webpackConfig