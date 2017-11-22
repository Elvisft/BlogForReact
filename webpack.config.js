const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// module.exports = {
//     entry: {
//     app: './client/main.js',
//     base: ['react', 'react-dom', 'react-router', 'redux', 'react-redux','antd'],
//     // about: './client/about/about.jsx'
//     },
//     output: {
//         path: path.resolve(__dirname, './build'),
//         publicPath: "/",
//         filename: '[name].[chunkhash:8].bundle.js', // 推荐使用 ，但是--hot会报错，
//         // filename: '[name].[hash:8].bundle.js',       // --hot时使用，不推荐
//         chunkFilename: '[name]-[id].[chunkhash:8].bundle.js', // 代码分割
//     },
//
//     bail: true,
//     performance: {
//         hints: false
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js|.jsx$/,
//                 loader: 'babel-loader',
//                 exclude: /node_modules/,
//                 query: {
//                     presets: ['es2015','react','stage-0'],
//                     plugins: [
//                         'syntax-dynamic-import',
//                         'transform-async-to-generator',
//                         'transform-regenerator',
//                         'transform-runtime'
//                     ]
//                 }
//             }, {
//                 test : /\.(less|css)$/,
//                 loader: ExtractTextPlugin.extract({
//                     fallback: "style-loader",
//                     use: ['css-loader', 'less-loader']
//                 })
//             }, {
//                 test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
//                 loader: 'file-loader'
//             }, {
//                 test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
//                 loader: 'file-loader',
//                 query: {
//                     name: '[name].[ext]?[hash]'
//                 }
//             }
//         ]
//     },
//
//     plugins: [
//         new webpack.optimize.CommonsChunkPlugin({
//             names: ['base']
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             compress:{
//                 warnings: true
//             }
//         }),
//         new webpack.DefinePlugin({
//             'process.env':{
//                 'NODE_ENV': JSON.stringify('production')
//             }
//         }),
//         new ExtractTextPlugin("styles.css"),
//         new OptimizeCssAssetsPlugin({
//             assetNameRegExp: /\.css$/g,
//             cssProcessor: require('cssnano'),
//             cssProcessorOptions: { discardComments: {removeAll: true } },
//             canPrint: true
//         }),
//         new htmlWebpackPlugin({
//             template: './client/public/index.html',
//             title:'Geek Edge REG',
//             inject:true,
//             minify:{
//                 removeComments:true,
//                 collapseWhitespace:true
//             }
//         })
//     ]
// }




module.exports = {
    entry: [
        'webpack/hot/dev-server', path.resolve(__dirname, './admin/client/main.js')
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: "/",
        // filename: '[name].[chunkhash:8].bundle.js', // 推荐使用 ，但是--hot会报错，
        filename: '[name].[hash:8].bundle.js',       // --hot时使用，不推荐
        chunkFilename: '[name]-[id].[chunkhash:8].bundle.js', // 代码分割
    },
    // devtool: 'eval-source-map',

    devServer: {
        inline: true,//inline模式
        historyApiFallback: true, //不跳转
        // host:'172.19.10.253',
        port: 3000
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
                test : /\.(less|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader']
                })
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
        new ExtractTextPlugin("styles.css"),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        new htmlWebpackPlugin({
            template: './admin/client/public/index.html',
            title:'123',
            inject:true,
            minify:{
                removeComments:false,
                collapseWhitespace:false
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};