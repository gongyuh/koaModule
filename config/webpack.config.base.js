const path = require('path')
const util = require('./util')
const webpack = require('webpack')
const nodeExcternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
    target:'node',
    mode:'development',
    entry:{
        server:path.join(util.APP_PATH,'index.js')
    },
	resolve: {
	    ...utils.getWebpackResolveConfig(),
	},
    output:{
        filename:'[name].bundle.js',
        path:util.DIST_PATH
    },
    devtool:'eval-source-map',
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:{
                    loader:'babel-loader'
                },
                exclude:[path.join(__dirname,'/node_modules')]
            }
        ]
    },
    externals:[nodeExcternals()],
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:(process.env.NODE_ENV === 'production' ||
                process.env.NODE_ENV ==='prod') ? "'production'" : "'development'"
            }
        })
    ]
    // node:{
    //     console:true,
    //     global:true,
    //     process:true,
    //     Buffer:true,
    //     __filename:true,
    //     __dirname:true,
    //     setImmediate:true,
    //     path:true
    // }
}

module.exports=webpackConfig