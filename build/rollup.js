/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-26 17:26:37
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-15 17:42:05
 */
import nodeResolve from '@rollup/plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { readdirSync } from 'fs' // 写文件
import { resolve } from 'path'

const input = resolve(__dirname, '../packages') // 入口文件
const output = resolve(__dirname, '../lib') // 输出文件
const configs = [];
const readFields = (url) => {
	readdirSync(`${input}/${url}`).filter(cname => !["dist"].includes(cname)).map(iname => {
		if (iname.indexOf('.ts') > -1) {
			(iname.indexOf('.d.ts') == -1 && iname !== 'types.ts') && configs.push({
				input: `${input}/${url}/${iname}`,
				plugins: [
					nodeResolve(),
					commonjs({
						include: 'node_modules/**',
						ignoreGlobal: true,
						sourceMap: false,
						namedExports: {},
					}),
					typescript({
						tsconfigOverride: {
							compilerOptions: {
								declaration: false
							},
							exclude: ['node_modules', 'dist', 'lib']
						},
						abortOnError: false,
						clean: true
					})
				],
				output: {
					name: 'index',
					file: `${output}/${url}/${iname.replace('.ts', '.js')}`,
					format: 'es', //"amd", "cjs", "system", "es", "iife" or "umd"
				}
			})
		} else {
			readFields(`${url}/${iname}`)
		}
	})
};
readdirSync(input).filter(name => !['index.ts', 'types.ts', "dist"].includes(name)).map(name => {
	readFields(name);
});
export default configs;
