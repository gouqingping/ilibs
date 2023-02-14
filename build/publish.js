/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-27 10:10:55
 * @LastEditors  : Pat
 * @LastEditTime : 2022-03-23 15:43:48
 */
const { writeFileSync, existsSync, unlinkSync, copyFileSync } = require('fs')
const { resolve } = require('path')
const package = require('../package.json');
const needSave = []
const newDependencies = {} // 新开发依赖
package.name = `${package.name}`
package.main = "./index.js";
package.types = "./index.d.ts";
package.style = "";
package.description = "前端基础工具方法";
// 添加需要的依赖
Object.entries(package.dependencies).forEach(([key, value]) => {
	needSave.includes(key) && (newDependencies[key] = value)
})
package.dependencies = newDependencies
package.devDependencies = {} // 清理多余的依赖
package.scripts = {}
let filename = '' // 文件名
// 单独处理逻辑

// filename = 'request/axios-github'
// package.publishConfig = { registry: 'https://github.com/gouqingping/request.git' }

const prePackagePath = resolve(__dirname, `../lib/package.json`) // 新路径
existsSync(prePackagePath) && unlinkSync(prePackagePath) // 删除旧的
writeFileSync(prePackagePath, JSON.stringify(package, null, 2)) // 写入最新的
copyFileSync(resolve(__dirname, '../README.md'), resolve(__dirname, `../lib/README.md`));
