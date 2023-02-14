/*
 * @Autor        : Pat
 * @Description  : Rules JS
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-06-24 10:16:10
 * @LastEditors  : Pat
 * @LastEditTime : 2021-10-08 17:22:12
 */
var path = require('path')

function assetsPath(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ? "build" : "dev"
    return path.posix.join(assetsSubDirectory, _path)
}

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
    },
    {
        test: /\.(tsx|ts)?$/,
        // exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],

    },
    {
        test: /\.js$/,
        // exclude: /node_modules/,
        include: [resolve('src'), resolve('test'), /gl/],
        use: {
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', { targets: { chrome: 62 } }]]
            }
        }
    },
    {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        // loader: 'url-loader',
        // options: {
        //     limit: 1000,
        //     name: assetsPath('img/[name].[hash:7].[ext]')
        // },
        parser: {
            dataUrlCondition: {
                maxSize: 100 * 1024
            }
        },
        generator: {
            filename: assetsPath('img/[name].[hash:7].[ext]')
        },
        exclude: /node_modules/
    },
    {
        test: /\.html$/,
        loader: 'html-loader'
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'happypack/loader',
        options: {
            maxSize: 10000,
            name: assetsPath('media/[name].[hash:7].[ext]')
        },
        exclude: /node_modules/
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'happypack/loader',
        options: {
            limit: 10000,
            name: assetsPath('fonts/[name].[hash:7].[ext]')
        },
        exclude: /node_modules/
    }
]