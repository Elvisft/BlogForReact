const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
    app: './client/main.js',
    vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux']
    // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors

    },
    output: {
        publicPath: '/build/',
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        chunkFilename: '[id].js',
        pathinfo: false
    },
    // devtool: 'eval-source-map',
    devtool:  'source-map',
    bail: true,
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','react','stage-0'],
                    plugins: [
                        'syntax-dynamic-import',
                        'transform-async-to-generator',
                        'transform-regenerator',
                        'transform-runtime'
                    ]
                }
            }, {
                test: /\.less|css$/,
                loader: 'style-loader!css-loader!less-loader',
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new htmlWebpackPlugin({
            template: './client/public/index.html',
            title:'123',
            inject:true,
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
        })
    ]
}