/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-26 17:26:37
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-15 17:42:59
 */
import nodeResolve from '@rollup/plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2'
import { resolve } from 'path'

const input = resolve(__dirname, '../packages') // 入口文件
const output = resolve(__dirname, '../lib') // 输出文件
export default [
	{
		input: `${input}/index.ts`,
		output: {
			format: 'es',
			file: `${output}/index.esm.js`
		},
		plugins: [
			terser(),
			nodeResolve(),
			commonjs({
				include: 'node_modules/**',
				ignoreGlobal: true,
				sourceMap: false,
				namedExports: {},
			}),
			typescript({
				useTsconfigDeclarationDir: false,
				tsconfigOverride: {
					include: ['packages/**/*'],
					exclude: ['node_modules']
				},
				abortOnError: false
			})
		]
	}
]
