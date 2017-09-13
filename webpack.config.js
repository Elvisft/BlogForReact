/**
 * Created by chinacscs on 2017/9/13.
 */
var webpack = require('webpack');
var path = require('path');
console.log(123);
// module.exports = {
//     //页面入口文件配置
//     entry: {
//         index: [
//             'webpack-dev-server/client?http://localhost:5000',
//             'webpack/hot/only-dev-server',
//             './client/main.js'
//         ]
//     },
//     //入口文件输出配置
//     output: {
//         path: __dirname + '/assets/',
//         filename: 'bundle.js'
//     },
//     module: {
//         //加载器配置
//         loaders: [
//             {
//                 test: /\.css$/,
//                 loader: 'style-loader!css-loader'
//             },
//
//             {
//                 test: /\.js$/,
//                 loader: 'jsx-loader?harmony'
//             },
//             {
//                 test: /\.(png|jpg)$/,
//                 loader: 'url-loader?limit=8192'
//             },
//             {
//                 test: /\.js|jsx$/,
//                 loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0'],
//                 include: path.join(__dirname, 'js')
//             }
//         ]
//     },
//     //其它解决方案配置
//     resolve: {
//         extensions: ['', '.js', '.json', '.scss']
//     },
//     //插件项
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoErrorsPlugin()
//     ]
// };
module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './assets/main.js')],
    output: {
        path: path.resolve(__dirname, './assets/'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            //loader: 'babel?presets[]=es2015&presets[]=react'
            loader: 'babel-loader',
            query: {
                presets: [["es2015", { "loose": true }],'react','stage-0'],
                // plugins: ["transform-es5-property-mutators","transform-jscript","transform-es3-property-literals","transform-es3-member-expression-literals",]
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: "style!css",
            //loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: "style!css!less",
            //loader: ExtractTextPlugin.extract('style', 'css!less')
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            loader: 'url?limit=10000&name=img/[name].[hash].[ext]'
        }, {
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            exclude: /node_modules/,
            loader: 'url?prefix=font/&limit=10000&name=font/[name].[ext]'
        }],
    }
};