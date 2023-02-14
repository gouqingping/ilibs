/*
 * @Autor        : Pat
 * @Description  : Plugins JS
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-06-24 10:18:08
 * @LastEditors  : Pat
 * @LastEditTime : 2022-03-02 13:51:26
 */
const HappyPack = require('happypack');
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
const ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
const cru = dir => path.join(__dirname, '../../', dir)

const plugins = [
    new ModuleConcatPlugin(), //开启scope Hoisting
    new HappyPack({
        id: "bable",
        loaders: ['babel-loader', {
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }),
    new HappyPack({
        id: 'url',
        loaders: ['url-loader']
    }),
    new HappyPack({
        id: 'ts',
        loaders: ['ts-loader']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
        filename: 'assets/css/[name].css',
        chunkFilename: 'assets/css/[id].css',
        ignoreOrder: false,
    }),
    new htmlWebpackPlugin({
        template: cru('html/index.html'),
        filename: "index.html", //"test-[hash].html",
        inject: "head",
        title: "map",
        publicPath: "./",
        minify: {}
    })
]
module.exports = plugins