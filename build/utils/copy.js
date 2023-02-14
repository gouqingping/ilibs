/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-06-29 14:07:15
 * @LastEditors  : Pat
 * @LastEditTime : 2020-06-29 14:10:30
 */
const fs = require("fs");
const path = require("path");
module.exports = copyFolder = function (srcDir, tarDir, cb) {
    const copyFile = function (srcPath, tarPath, cb) {
        const rs = fs.createReadStream(srcPath)
        rs.on('error', function (err) {
            if (err) {
                console.log('read error', srcPath)
            }
            cb && cb(err)
        })

        const ws = fs.createWriteStream(tarPath)
        ws.on('error', function (err) {
            if (err) {
                console.log('write error', tarPath)
            }
            cb && cb(err)
        })
        ws.on('close', function (ex) {
            cb && cb(ex)
        })

        rs.pipe(ws)
    }
    fs.readdir(srcDir, function (err, files) {
        let count = 0
        const checkEnd = function () {
            ++count == files.length && cb && cb()
        }
        if (err) {
            checkEnd()
            return
        }
        files.forEach(function (file) {
            const srcPath = path.join(srcDir, file)
            const tarPath = path.join(tarDir, file)
            fs.stat(srcPath, function (err, stats) {
                if (stats.isDirectory()) {
                    fs.mkdir(tarPath, function (err) {
                        if (err) {
                            console.log(err)
                            return
                        }

                        copyFolder(srcPath, tarPath, checkEnd)
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })

        //为空时直接回调
        files.length === 0 && cb && cb()
    })
};