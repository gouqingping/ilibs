/*
 * @Autor        : Pat
 * @Description  : dev
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-06-29 17:10:58
 * @LastEditors  : Pat
 * @LastEditTime : 2022-03-02 13:51:51
 */
const path = require('path')
const plugins = require("./utils/plugins.js")
const rules = require("./utils/rules.js")
const resolve = require("./utils/resolve.js")
const cru = dir => path.join(__dirname, '..', dir)
const PKG = require(cru("package.json"))
module.exports = {
    mode: "development",
    devtool: 'eval-source-map',
    target: ['web', 'es2018'],
    entry: {
        index: cru('src/index.ts')
    },
    output: {
        filename: PKG.name + '.js',
        path: cru('html')
    },
    resolve,
    module: { rules },
    plugins,
    devServer: {
        clientLogLevel: 'warning',
        contentBase: cru('html'),
        historyApiFallback: {
            rewrites: [{
                from: /..*/,
                to: path.posix.join("./", 'index.html')
            },],
        },
        host: "0.0.0.0",
        hot: true,
        inline: true, //实时刷新
        compress: true, //Enable gzip compression for everything served
        overlay: true, //Shows a full-screen overlay in the browser
        //stats: "errors-only",//To show only errors in your bundle
        open: false, //When open is enabled, the dev server will open the browser.
        //重定向
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
}