/*
 * @Autor        : Pat
 * @Description  : Webpack Resolev
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-07-02 09:39:35
 * @LastEditors  : Pat
 * @LastEditTime : 2022-03-04 09:43:20
 */
const path = require('path')

function cru(dir) {
    return path.join(__dirname, '../../', dir)
}

module.exports = {
    //用于配置程序可以自行补全哪些文件后缀
    extensions: ['.js', '.vue', '.json', '.es6', '.ts'],

    // 如果确认不需要node polyfill，设置resolve.alias设置为false
    alias: {
        '@': cru("src"),
        "@iu-utils/request": cru("packages"),
        crypto: false,
        stream: false,
        assert: false,
        http: false,
        https: false
    },
    // https://github.com/babel/babel/issues/8462
    // https://blog.csdn.net/qq_39807732/article/details/110089893
    // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
    fallback: {
        "util": false
    },
    modules: [
        path.join(__dirname),
        "node_modules"
    ]
}