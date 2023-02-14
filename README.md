<!--
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-03-04 09:33:17
 * @LastEditors  : GGos
 * @LastEditTime : 2022-10-10 15:22:07
-->

# ilibs

前端基础工具方法

<div>
<a href="#验证">验证</a>
<a href="#转换">转换</a>
<a href="#工具">工具</a>
<a href="#节点操作">DOM节点操作</a>
</div>

## Install

```node
$ npm install ilibs
// or
$ npm i ilibs
// or
$ pnpm install ilibs
// or
$ yarn add ilibs
```

# 验证

## 函数列表

| 函数名称           | 描述                                             |
| ------------------ | ------------------------------------------------ |
| isArray(data)      | 验证是否为数组                                   |
| isObject(data)     | 验证数据是否为对象                               |
| isFunction(data)   | 验证数据是否为函数                               |
| isString(data)     | 验证数据是否为字符串                             |
| isNumber(data)     | 验证数据是否为数字类型                           |
| isBoolean(data)    | 验证数据是否为布尔值                             |
| isSymbol(data)     | 验证数据是否为 symbol                            |
| isBasicData(data)  | 验证数据是否为基础数据类型                       |
| isJSONStr(str)     | 检查字符串是否为 json 字符串                     |
| isType(data,type)  | 验证数据是否为指定数据类型                       |
| getType(data)      | 获取数据类型                                     |
| isEqual(v1,v2)     | 验证两条数据是否相等                             |
| isOdd(num)         | 检查是否为奇数                                   |
| isPicture(picture) | 检查字符串是否为图片 url                         |
| isURL(url)         | 检查 URL 是否有效                                |
| isDevice()         | 检查当前是 android 还是 ios 还是 web 还是 WeChat |
| isHex(color)       | 检验证是否为 hex 颜色有效值                      |
| isRgb(color)       | 验证是否为 rgb 颜色有效值                        |
| isColor(color)     | 验证是否为颜色有效值                             |
| isExistChild(data) | 验证对象/数组是否为空数据                        |

## API

### isArray

验证数据是否为数组

```js
import { isArray } from 'ilibs';
console.log(isArray([1, 2, 3, 4])); // true
console.log(isArray(1)); // false
```

##### API

| 参数 | 描述           | 类型 | 必填 | 可选项 |
| ---- | -------------- | ---- | ---- | ------ |
| data | 需要验证的数据 | any  | yes  | -      |

### isObject

验证数据是否为对象

```js
import { isObject } from 'ilibs';
console.log(isObject({ a: 1 })); // true
console.log(isObject([1, 2, 3, 4])); // false
```

##### API

| 参数 | 描述           | 类型 | 必填 | 可选项 |
| ---- | -------------- | ---- | ---- | ------ |
| data | 需要验证的数据 | any  | yes  | -      |

### isFunction

验证数据是否为函数

```js
import { isFunction } from 'ilibs';
console.log(isFunction(isFunction)); // true
console.log(isFunction({ a: 1 })); // false
```

##### API

| 参数 | 描述           | 类型 | 必填 | 可选项 |
| ---- | -------------- | ---- | ---- | ------ |
| data | 需要验证的数据 | any  | yes  | -      |

### isString

验证数据是否为字符串

```js
import { isString } from 'ilibs';
console.log(isString('isString')); // true
console.log(isString({ a: 1 })); // false
```

##### API

| 参数 | 描述           | 类型 | 必填 | 可选项 |
| ---- | -------------- | ---- | ---- | ------ |
| data | 需要验证的数据 | any  | yes  | -      |

### isNumber

验证数据是否为数字类型

```js
import { isNumber } from 'ilibs';
console.log(isNumber(1)); // true
console.log(isNumber('1.2')); // true
console.log(isNumber('1a')); // false
```

##### API

| 参数 | 描述           | 类型 | 必填 | 可选项 |
| ---- | -------------- | ---- | ---- | ------ |
| data | 需要验证的数据 | any  | yes  | -      |

### isBoolean

验证数据是否为布尔值

```js
import { isBoolean } from 'ilibs';
console.log(isBoolean(true)); // true
console.log(isBoolean('1a')); // false
```

##### API

| 参数 | 描述           | 类型 | 必填 | 可选项 |
| ---- | -------------- | ---- | ---- | ------ |
| data | 需要验证的数据 | any  | yes  | -      |

### isSymbol

验证数据是否为 symbol

```js
import { isSymbol } from 'ilibs';
console.log(isSymbol(new Symbol('1'))); // true
console.log(isSymbol('1a')); // false
```

##### API

| 参数 | 描述           | 类型 | 必填 | 可选项 |
| ---- | -------------- | ---- | ---- | ------ |
| data | 需要验证的数据 | any  | yes  | -      |

### isBasicData

验证数据是否为基础数据类型

```js
import { isBasicData } from 'ilibs';
console.log(isBasicData(1)); // true
console.log(isBasicData(new Symbol('1'))); // false
```

##### API

| 参数 | 描述           | 类型 | 必填 | 可选项 |
| ---- | -------------- | ---- | ---- | ------ |
| data | 需要验证的数据 | any  | yes  | -      |

### isJSONStr

检查字符串是否为 json 字符串

```js
import { isJSONStr } from 'ilibs';
console.log(isJSONStr('{"a":1}')); // true
console.log(isJSONStr('12345678')); // false
```

##### API

| 参数 | 描述           | 类型   | 必填 | 可选项 |
| ---- | -------------- | ------ | ---- | ------ |
| str  | 需要验证的数据 | string | yes  | -      |

### isType

验证数据是否为指定数据类型

```js
import { isType } from 'ilibs';
console.log(isType('{"a":1}', 'string')); // true
console.log(isType('12345678', 'number')); // false
```

##### API

| 参数 | 描述           | 类型   | 必填 | 可选项                                             |
| ---- | -------------- | ------ | ---- | -------------------------------------------------- |
| data | 需要验证的数据 | any    | yes  | -                                                  |
| type | 验证的数据类型 | string | yes  | string/number/object/symbol/array/function/boolean |

### getType

获取数据类型

```js
import { getType } from 'ilibs';
console.log(getType({ a: 1 })); // object
console.log(getType('12345678')); // string
```

##### API

| 参数 | 描述           | 类型 | 必填 | 可选项 |
| ---- | -------------- | ---- | ---- | ------ |
| data | 需要验证的数据 | any  | yes  | -      |

##### Return

'string' | 'number' | 'object' | 'symbol' | 'array' | 'function' | 'boolean'

### isEqual

验证两条数据是否相等

```js
import { isEqual } from 'ilibs';
console.log(isEqual({ a: 1 }, { a: 1 })); // true
console.log(isEqual('12345678', 'number')); // false
```

##### API

| 参数 | 描述             | 类型 | 必填 | 可选项 |
| ---- | ---------------- | ---- | ---- | ------ |
| v1   | 需要验证的数据 1 | any  | yes  | -      |
| v2   | 需要验证的数据 2 | any  | yes  | -      |

### isOdd

检查是否为奇数

```js
import { isOdd } from 'ilibs';
console.log(isOdd(1)); // true
console.log(isOdd(2)); // false
```

##### API

| 参数 | 描述           | 类型   | 必填 | 可选项 |
| ---- | -------------- | ------ | ---- | ------ |
| num  | 需要验证的数字 | number | yes  | -      |

### isPicture

检查字符串是否为图片 url

```js
import { isPicture } from 'ilibs';
console.log(isPicture('./image.png')); // true
console.log(isPicture('./video.mp4')); // false
```

##### API

| 参数    | 描述           | 类型   | 必填 | 可选项 |
| ------- | -------------- | ------ | ---- | ------ |
| picture | 需要验证的链接 | string | yes  | -      |

### isURL

检查字符串是否为图片 url

```js
import { isURL } from 'ilibs';
console.log(isURL('https://baidu.com')); // true
console.log(isURL('./video.mp4')); // false
```

##### API

| 参数 | 描述           | 类型   | 必填 | 可选项 |
| ---- | -------------- | ------ | ---- | ------ |
| url  | 需要验证的链接 | string | yes  | -      |

### isDevice

检查当前是 android 还是 ios 还是 web 还是 WeChat

```js
import { isURL } from 'ilibs';
console.log(isDevice()); // Web
```

##### return

'iOS' | 'Android' | 'WeChat' | 'Web'

### isHex

验证是否为 hex 颜色有效值

```js
import { isHex } from 'ilibs';
console.log(isHex('#fff')); // true
console.log(isHex('rgba(255,255,255,1)')); // false
```

##### API

| 参数  | 描述           | 类型   | 必填 | 可选项 |
| ----- | -------------- | ------ | ---- | ------ |
| color | 需要验证的 hex | string | yes  | -      |

### isRgb

验证是否为 rgb 颜色有效值

```js
import { isRgb } from 'ilibs';
console.log(isRgb('#fff')); // false
console.log(isRgb('rgba(255,255,255,1)')); // true
```

##### API

| 参数  | 描述           | 类型   | 必填 | 可选项 |
| ----- | -------------- | ------ | ---- | ------ |
| color | 需要验证的 hex | string | yes  | -      |

### isColor

验证是否为颜色有效值

```js
import { isColor } from 'ilibs';
console.log(isColor('#fff')); // true
console.log(isColor('(255,255,255,1)')); // false
```

##### API

| 参数  | 描述           | 类型   | 必填 | 可选项 |
| ----- | -------------- | ------ | ---- | ------ |
| color | 需要验证的 hex | string | yes  | -      |

### isExistChild

验证对象/数组是否为空数据

```js
import { isExistChild } from 'ilibs';
console.log(isExistChild({})); // true
console.log(isExistChild({ a: 1 })); // false
console.log(isExistChild({})); // true
console.log(isExistChild({ a: 1 })); // false
```

##### API

| 参数 | 描述           | 类型         | 必填 | 可选项 |
| ---- | -------------- | ------------ | ---- | ------ |
| data | 需要验证的数据 | any[]/obejct | yes  | -      |

# 转换

## 函数列表

| 函数名称                          | 描述                                |
| --------------------------------- | ----------------------------------- |
| toLowerCase(str)                  | 字符串全部转小写                    |
| toUpperCase(str)                  | 字符串全部转大写                    |
| capitalUpperCase(str)             | 设置首字母大写不改变之后的字符串    |
| capitalLowerCase(str)             | 设置首字母小写不改变之后的字符串    |
| capitalUpperCaseAllLowerCase(str) | 设置首字母大写其他全部转为小写      |
| toLowerCamelCase(str)             | 将"xx_xx"字符串转为小驼峰           |
| toCamelCase(str)                  | 将"xx_xx"字符串转为大驼峰           |
| filterTag(str)                    | 过滤 html 代码(把<>转换为字符串)    |
| numberToChinese(num)              | 将阿拉伯数字翻译成中文的大写数字    |
| dateFmt(date,fmt)                 | 时间格式化                          |
| getPinyin(l1,firstBoolen)         | 汉字转拼音                          |
| hexToRgb(color,a)                 | 将 hex 表示方式转换为 rgba 表示方式 |
| rgbToHex(rgb)                     | 将 rgb 表示方式转换为 hex 表示方式  |

## API

### toLowerCase

字符串全部转小写

```js
import { toLowerCase } from 'ilibs';
console.log(toLowerCase('HTTPs')); // https
```

##### API

| 参数 | 描述             | 类型   | 必填 | 可选项 |
| ---- | ---------------- | ------ | ---- | ------ |
| str  | 需要转换的字符串 | string | yes  | -      |

### toUpperCase

字符串全部大写

```js
import { toUpperCase } from 'ilibs';
console.log(toUpperCase('HTTPs')); // HTTPS
```

##### API

| 参数 | 描述             | 类型   | 必填 | 可选项 |
| ---- | ---------------- | ------ | ---- | ------ |
| str  | 需要转换的字符串 | string | yes  | -      |

### capitalUpperCase

设置首字母大写不改变之后的字符串

```js
import { capitalUpperCase } from 'ilibs';
console.log(capitalUpperCase('https')); // Https
```

##### API

| 参数 | 描述             | 类型   | 必填 | 可选项 |
| ---- | ---------------- | ------ | ---- | ------ |
| str  | 需要转换的字符串 | string | yes  | -      |

### capitalLowerCase

设置首字母小写不改变之后的字符串

```js
import { capitalLowerCase } from 'ilibs';
console.log(capitalLowerCase('Https')); // https
```

##### API

| 参数 | 描述             | 类型   | 必填 | 可选项 |
| ---- | ---------------- | ------ | ---- | ------ |
| str  | 需要转换的字符串 | string | yes  | -      |

### capitalUpperCaseAllLowerCase

设置首字母大写其他全部转为小写

```js
import { capitalUpperCaseAllLowerCase } from 'ilibs';
console.log(capitalUpperCaseAllLowerCase('HTTPS')); //Https
```

##### API

| 参数 | 描述             | 类型   | 必填 | 可选项 |
| ---- | ---------------- | ------ | ---- | ------ |
| str  | 需要转换的字符串 | string | yes  | -      |

### toLowerCamelCase

将"xx_xx"字符串转为小驼峰

```js
import { toLowerCamelCase } from 'ilibs';
console.log(toLowerCamelCase('HTTPS_baidu')); //httpsBaidu
```

##### API

| 参数 | 描述             | 类型   | 必填 | 可选项 |
| ---- | ---------------- | ------ | ---- | ------ |
| str  | 需要转换的字符串 | string | yes  | -      |

### toCamelCase

将"xx_xx"字符串转为大驼峰

```js
import { toCamelCase } from 'ilibs';
console.log(toCamelCase('HTTPS_baidu')); //HttpsBaidu
```

##### API

| 参数 | 描述             | 类型   | 必填 | 可选项 |
| ---- | ---------------- | ------ | ---- | ------ |
| str  | 需要转换的字符串 | string | yes  | -      |

### filterTag

过滤 html 代码(把<>转换为字符串)

```js
import { filterTag } from 'ilibs';
console.log(filterTag('<div>HTTPS_baidu</div>')); //<div>HTTPS_baidu</div>
```

##### API

| 参数 | 描述             | 类型   | 必填 | 可选项 |
| ---- | ---------------- | ------ | ---- | ------ |
| str  | 需要转换的字符串 | string | yes  | -      |

### numberToChinese

将阿拉伯数字翻译成中文的大写数字

```js
import { numberToChinese } from 'ilibs';
console.log(numberToChinese(12312312)); //一仟二百三十一萬二仟三百一十二
```

##### API

| 参数 | 描述           | 类型   | 必填 | 可选项 |
| ---- | -------------- | ------ | ---- | ------ |
| num  | 需要转换的数字 | number | yes  | -      |

### dateFmt

时间格式化

```js
import { dateFmt } from 'ilibs';
console.log(dateFmt()); // 2022/10/09 15:12:34
```

##### API

| 参数 | 描述           | 类型     | 必填 | 可选项 | 默认值              |
| ---- | -------------- | -------- | ---- | ------ | ------------------- |
| date | 需要转换的时间 | DateTime | -    | -      | -                   |
| fmt  | 转换的时间格式 | string   | -    | -      | YYYY/mm/dd HH:MM:SS |

### getPinyin

汉字转拼音

```js
import { getPinyin } from 'ilibs';
console.log(getPinyin('汉字转拼音')); // HanZiZhuanPinYin
```

##### API

| 参数        | 描述                   | 类型   | 必填 | 可选项     | 默认值 |
| ----------- | ---------------------- | ------ | ---- | ---------- | ------ |
| l1          | 指定中文字符串         | string | -    | -          | -      |
| firstBoolen | 每个单词首字母是否大写 | boolen | -    | true/false | true   |

### hexToRgb

将 hex 表示方式转换为 rgba 表示方式

```js
import { hexToRgb } from 'ilibs';
console.log(hexToRgb('#ffffff')); // rgba(255,255,255,1)
```

##### API

| 参数  | 描述                     | 类型   | 必填 | 可选项 | 默认值 |
| ----- | ------------------------ | ------ | ---- | ------ | ------ |
| color | hex 色值                 | string | -    | -      | -      |
| a     | 转换结束的透明度，默认 1 | boolen | -    | 0-1    | 1      |

### rgbToHex

将 rgb 表示方式转换为 hex 表示方式

```js
import { rgbToHex } from 'ilibs';
console.log(rgbToHex('rgba(255,255,255,1)')); // #FFFFFFFF
```

##### API

| 参数 | 描述     | 类型   | 必填 | 可选项 | 默认值 |
| ---- | -------- | ------ | ---- | ------ | ------ |
| rgb  | rgb 色值 | string | -    | -      | -      |

# 工具

## 函数列表

| 函数名称                               | 描述                                                              |
| -------------------------------------- | ----------------------------------------------------------------- |
| fontSize(def,maxWidth)                 | 根据分辨率不同显示不同字体大小                                    |
| getUrlQuery(url)                       | 从查询字符串中获取参数                                            |
| generatePathQuery(path,obj)            | 使用查询字符串生成路径                                            |
| getPathParams(path,pathMap,serializer) | 从路径中获取参数                                                  |
| generatePath(path,obj)                 | 使用查询字符串生成路径                                            |
| howLongAgo(date,type)                  | 距现在多少时间前                                                  |
| useThrottl(fn,time)                    | 程序节流                                                          |
| useDebounce(fn,time)                   | 程序防抖                                                          |
| useLazyLoad(tags,node)                 | 图片懒加载                                                        |
| randomNum(min,max)                     | 生成区间随机数                                                    |
| cloneDeep(data,)                       | 数据深拷贝                                                        |
| unwarp(obj)                            | 针对于 Proxy 对象结构                                             |
| merge(...args)                         | 数据合并                                                          |
| each(data,iteratee)                    | 遍历数据                                                          |
| filter(array,predicate)                | 数组筛选                                                          |
| push(data,key,value)                   | 对象/数组添加数据                                                 |
| flatter(arr)                           | 数组扁平化处理（多维数组变成一维数组）                            |
| setValue(data,path,value)              | 设置数组/对象中对应 path 属性路径上的值，如果 path 不存在，则创建 |
| getValue(data,key,alt)                 | 根据字符串输出对象参数,避免程序阻滞                               |
| currying(fn,...args)                   | 柯里化处理                                                        |
| templateParser(template,data)          | template 解析器                                                   |
| listToTree(data)                       | 列表转成树形结构                                                  |
| treeToList(data)                       | 树形结构转成列表                                                  |
| setInterval(fn,t)                      | setInterval 重置优化                                              |
| copyjs(dom)                            | 复制当前节点内容                                                  |
| generateRandomHexColor()               | 生成随机颜色                                                      |
| scrollTo(element,type)                 | 滚动到顶部/底部 ('top'/'bottom',默认 top)                         |

## API

### fontSize

字符串全部转小写

```js
import { fontSize } from 'ilibs';
console.log(fontSize(14, 1920)); // 14
```

##### API

| 参数     | 描述         | 类型   | 必填 | 默认值 |
| -------- | ------------ | ------ | ---- | ------ |
| def      | 基数值       | number | yes  | -      |
| maxWidth | 最大分辨率宽 | number | -    | 1920   |

##### Return

number

### getUrlQuery

从查询字符串中获取参数

```js
import { getUrlQuery } from 'ilibs';
console.log(getUrlQuery('/user?name=Orkhan&age=30')); // {name: 'Orkhan', age: '30'}
```

##### API

| 参数 | 描述     | 类型   | 必填 | 默认值 |
| ---- | -------- | ------ | ---- | ------ |
| url  | url 地址 | string | yes  | -      |

##### Return

object

### generatePathQuery

使用查询字符串生成路径

```js
import { generatePathQuery } from 'ilibs';
console.log(generatePathQuery('/user', { name: 'Orkhan', age: 30 })); // /user?name=Orkhan&age=30
```

##### API

| 参数 | 描述     | 类型   | 必填 | 默认值 |
| ---- | -------- | ------ | ---- | ------ |
| path | 路径符串 | string | yes  | -      |
| obj  | 条件对象 | object | -    | -      |

##### Return

string

### getPathParams

从查询字符串中获取参数

```js
import { getPathParams } from 'ilibs';
console.log(getPathParams('/app/products/123', '/app/:page/:id')); // {page: 'products', id: '123'}
console.log(
	getPathParams('/items/2/id/8583212', '/items/:category/id/:id', {
		category: (v) => ['Car', 'Mobile', 'Home'][v],
		id: (v) => +v,
	}),
); // {category: 'Home', id: 8583212}
```

##### API

| 参数       | 描述               | 类型   | 必填 | 默认值 |
| ---------- | ------------------ | ------ | ---- | ------ |
| path       | url 地址           | string | yes  | -      |
| pathMap    | 需要获取参数字符串 | string | yes  | -      |
| serializer | 自由组合返回的对象 | object | -    | -      |

##### Return

object

### generatePath

使用查询字符串生成路径

```js
import { generatePath } from 'ilibs';
console.log(generatePath('/user/:name/:age', { name: 'Orkhan', age: 30 })); // /user/Orkhan/30
```

##### API

| 参数 | 描述     | 类型   | 必填 | 默认值 |
| ---- | -------- | ------ | ---- | ------ |
| path | 路径符串 | string | yes  | -      |
| obj  | 条件对象 | object | -    | -      |

##### Return

string

### howLongAgo

使用查询字符串生成路径

```js
import { howLongAgo } from 'ilibs';
console.log(howLongAgo('2022-10-09 15:30:23')); // 1 小时前
console.log(howLongAgo('2022-10-09 15:30:23')); // 1 hours ago
```

##### API

| 参数 | 描述         | 类型               | 必填 | 可选值 | 默认值 |
| ---- | ------------ | ------------------ | ---- | ------ | ------ |
| date | 时间         | Date/number/string | yes  | -      | -      |
| type | 显示名称类型 | string             | -    | cn/en  | cn     |

##### Return

string

### useThrottl

程序节流

```js
import { useThrottl } from 'ilibs';
const conso = (n: number) => console.log(n);
window.onload = () => {
	const button = document.createElement('button');
	button.style.lineHeight = '35px';
	button.innerHTML = 'submit';
	document.getElementById('app')?.appendChild(button);
	button.addEventListener('click', useThrottl(conso, 1000));
};
```

##### API

| 参数 | 描述     | 类型     | 必填 | 可选值 | 默认值 |
| ---- | -------- | -------- | ---- | ------ | ------ |
| fn   | 执行函数 | Function | -    | -      | -      |
| time | 时间     | number   | -    | -      | -      |

### useDebounce

程序节流

```js
import { useDebounce } from 'ilibs';
const conso = (n: number) => console.log(n);
window.onload = () => {
	const input = document.createElement('input');
	input.style.lineHeight = '35px';
	document.getElementById('app')?.appendChild(input);
	input.addEventListener('keyup', useDebounce(conso, 1000));
};
```

##### API

| 参数 | 描述     | 类型     | 必填 | 可选值 | 默认值 |
| ---- | -------- | -------- | ---- | ------ | ------ |
| fn   | 执行函数 | Function | -    | -      | -      |
| time | 时间     | number   | -    | -      | -      |

### useLazyLoad

图片懒加载

```js
import { useLazyLoad } from 'ilibs';
window.onload = () => {
	useLazyLoad(['/a.png', '/b.png', '/c.png', '/d.png']);
};
```

##### API

| 参数 | 描述              | 类型     | 必填 | 可选值 | 默认值                   |
| ---- | ----------------- | -------- | ---- | ------ | ------------------------ |
| tags | 图片链接集合      | string[] | yes  | -      | -                        |
| node | 图片容器 dom 节点 | Element  | -    | -      | document.documentElement |

### randomNum

生成区间随机数

```js
import { randomNum } from 'ilibs';
console.log(randomNum(100, 10000)); // 2208.79223401305
```

##### API

| 参数 | 描述   | 类型   | 必填 | 可选值 | 默认值 |
| ---- | ------ | ------ | ---- | ------ | ------ |
| min  | 最小值 | number | yes  | -      | -      |
| max  | 最大值 | number | yes  | -      | -      |

### cloneDeep

数据深拷贝

```js
import { cloneDeep } from 'ilibs';
const a = { a: 1 };
const b = cloneDeep(a);
b.a = 2;
console.log(a, b); //  {a: 1} {a: 2}
```

##### API

| 参数 | 描述 | 类型 | 必填 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ------ | ------ |
| data | 数据 | any  | yes  | -      | -      |

##### Return

any

### unwarp

针对于 Proxy 对象结构

```js
import { unwarp } from 'ilibs';
let obj = {
	a: 1,
};
let proxyObj = new Proxy(obj, {
	get: function (target, attr) {
		return target[attr]; // obj["a"]
	},
});
console.log(proxyObj); // Proxy {a: 1}
console.log(unwarp(proxyObj)); // {a: 1}
```

##### API

| 参数 | 描述 | 类型   | 必填 | 可选值 | 默认值 |
| ---- | ---- | ------ | ---- | ------ | ------ |
| obj  | 数据 | object | yes  | -      | -      |

##### Return

object

### merge

针对于 Proxy 对象结构

```js
import { merge } from 'ilibs';
let obj = {
	a: 1,
};
console.log(merge(obj, { b: 2 })); // {a: 1, b: 2}
```

##### Return

any[] | AnyObject

### each

设置页面标题

```js
import { each } from 'ilibs';
each(
	{
		a: 1,
		b: 2,
	},
	(key, index, data) => {
		console.log(key, index, data);
	},
);
// 1 'a' {a: 1, b: 2}
// 2 'b' {a: 1, b: 2}
```

##### API

| 参数     | 描述     | 类型     | 必填 | 可选值 | 默认值 |
| -------- | -------- | -------- | ---- | ------ | ------ |
| data     | 数据     | any      | yes  | -      | -      |
| iteratee | 回调函数 | Function | yes  | -      | -      |

### filter

数组筛选

```js
import { filter } from 'ilibs';
console.log(filter([1, 2, 3, 4, 5, 6], (a) => a > 2));
// [3, 4, 5, 6]
```

##### API

| 参数      | 描述     | 类型     | 必填 | 可选值 | 默认值 |
| --------- | -------- | -------- | ---- | ------ | ------ |
| data      | 数据     | any[]    | yes  | -      | -      |
| predicate | 回调函数 | Function | yes  | -      | -      |

### push

数组筛选

```js
import { push } from 'ilibs';
console.log(push([1, 2, 3, 4, 5, 6], 2)); // [1, 2, 3, 4, 5, 6, 2]
console.log(push([1, 2, 3, 4, 5, 6], 2, 9)); // [1, 2, 9, 4, 5, 6]
console.log(push({ a: 1, b: 2 }, 'a', 9)); // {a: 9, b: 2}
console.log(push({ a: 1, b: 2 }, 'c', 9)); // {a: 1, b: 2,c:9}
console.log(push({ a: 1, b: 2 }, { c: 1, d: 2 })); // {a: 1, b: 2, c: 1, d: 2}
console.log(
	push({ a: 1, b: 2 }, [
		{ c: 3, d: 4 },
		{ a: 11, b: 12 },
	]),
); // {a: 11, b: 12, c: 3, d: 4}
```

##### API

| 参数  | 描述                                                 | 类型         | 必填 | 可选值 | 默认值 |
| ----- | ---------------------------------------------------- | ------------ | ---- | ------ | ------ |
| data  | 数据                                                 | any[]/object | yes  | -      | -      |
| key   | 数组改变时数组的下标,添加时数组添加的数据.对象的 key | any          | yes  | -      | -      |
| value | 某条数据的值                                         | any          | -    | -      | -      |

### flatter

数组扁平化处理（多维数组变成一维数组）

```js
import { flatter } from 'ilibs';
console.log(flatter([[1, 2, 3], 4, 5, 6, [[[[7, 8], 9]]]])); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

##### API

| 参数 | 描述 | 类型  | 必填 | 可选值 | 默认值 |
| ---- | ---- | ----- | ---- | ------ | ------ |
| data | 数据 | any[] | yes  | -      | -      |

### setValue

设置数组/对象中对应 `path` 属性路径上的值，如果 `path` 不存在，则创建

```js
import { setValue } from 'ilibs';
const object = {
	a: [{ b: { c: 1 } }, { b2: { c: 2 } }],
	b: 1,
	c: { c: 3 },
	d: ['2.0', ['old d.1'], ['2.2.0', '2.2.1']],
};
const array = ['0', '1', ['2.0', ['2.1.0'], ['2.2.0', '2.2.1']]];
setValue(object, 'd.1', 'new d.1');
console.log('object:', object);
// object: {
//     a: [{ 'b': { 'c': 1 } }, { 'b2': { 'c': 2 } }],
//     b: 1,
//     c: { 'c': 3 },
//     d: [
//         '2.0',
//         'new d.1',
//         ['2.2.0', '2.2.1']
//     ]
// };
setValue(array, '2.2', 4);
console.log('array:', array);
// array: [
//     '0',
//     '1',
//     [
//         '2.0',
//         4,
//         ['2.2.0', '2.2.1']
//     ]
// ]
```

##### API

| 参数  | 描述         | 类型                   | 必填 | 可选值 | 默认值 |
| ----- | ------------ | ---------------------- | ---- | ------ | ------ |
| data  | 数据         | object/array           | yes  | -      | -      |
| path  | 设置值的路径 | string/string[]/Number | yes  | -      | -      |
| value | 设置的值     | any                    | -    | -      | -      |

### getValue

根据字符串输出对象参数,避免程序阻滞

```js
import { getValue } from 'ilibs';
const arr = [1, 2, 3, 4, [51, 52, 53, 54, [551, 552, 553, 554, 555]]];
console.log(getValue({ a: 1, b: 2, c: { a: 11, b: 12 } }, ['c', 'a'])); // 11
console.log(getValue({ a: 1, b: 2, c: { a: 11, b: 12 } }, 'c.a')); // 11
console.log(getValue({ a: 1, b: 2, c: { a: 11, b: 12 } }, 'c.a.d', 'test')); // test
console.log(getValue(arr, '5.5.5', 'test')); // 555
console.log(getValue(arr, '5.5', 'test')); // [551,552,553,554,555]
console.log(getValue(arr, '5.5.9', 'test')); // test
```

##### API

| 参数 | 描述                        | 类型                   | 必填 | 可选值 | 默认值 |
| ---- | --------------------------- | ---------------------- | ---- | ------ | ------ |
| data | 数据                        | object/array           | yes  | -      | -      |
| key  | 输出的字段路径              | string/string[]/Number | yes  | -      | -      |
| alt  | 在没有获取到 value 返回的值 | any                    | -    | -      | -      |

### currying

柯里化处理

```js
import { currying } from 'ilibs';
const add = (a, b, c) => a + b + c;
const a = currying(add, 5, 5);
console.log(a(2)); // 12
```

##### API

| 参数 | 描述     | 类型     | 必填 | 可选值 | 默认值 |
| ---- | -------- | -------- | ---- | ------ | ------ |
| fn   | 执行函数 | Function | yes  | -      | -      |
| args | 传参     | any      | yes  | -      | -      |

### templateParser

template 解析器

```js
import { templateParser } from 'ilibs';
console.log(templateParser('<div>{{test}}</div>', { test: '测试' })); // <div>测试</div>
```

##### API

| 参数     | 描述      | 类型   | 必填 | 可选值 | 默认值 |
| -------- | --------- | ------ | ---- | ------ | ------ |
| template | html 片段 | string | yes  | -      | -      |
| data     | 解析格式  | object | yes  | -      | -      |

### listToTree

列表转成树形结构

```js
import { listToTree } from 'ilibs';
console.log(
	listToTree([
		{
			id: 1,
			text: '节点1',
			parentId: 0, //这里用0表示为顶级节点
		},
		{
			id: 2,
			text: '节点1_1',
			parentId: 1, //通过这个字段来确定子父级
		},
	]),
);
// [{"id":1,"text":"节点1","parentId":0,"children":[{"id":2,"text":"节点1_1","parentId":1}]}]
```

##### API

| 参数 | 描述 | 类型  | 必填 | 可选值 | 默认值 |
| ---- | ---- | ----- | ---- | ------ | ------ |
| data | 数据 | Array | yes  | -      | -      |

### treeToList

树形结构转成列表

```js
import { treeToList } from 'ilibs';
console.log(
	treeToList([
		{
			id: 1,
			text: '节点1',
			parentId: 0,
			children: [{ id: 2, text: '节点1_1', parentId: 1 }],
		},
	]),
);
// [{"id":2,"text":"节点1_1","parentId":1},{"id":1,"text":"节点1","parentId":0}]
```

##### API

| 参数 | 描述 | 类型  | 必填 | 可选值 | 默认值 |
| ---- | ---- | ----- | ---- | ------ | ------ |
| data | 数据 | Array | yes  | -      | -      |

### setInterval

setInterval 重置优化

```js
import { setInterval } from 'ilibs';
setInterval(() => {
	console.log(1);
}, 1000)();
```

##### API

| 参数 | 描述            | 类型     | 必填 | 可选值 | 默认值 |
| ---- | --------------- | -------- | ---- | ------ | ------ |
| fn   | 回调执行方法    | Function | yes  | -      | -      |
| t    | 执行时间 (毫秒) | number   | yes  | -      | -      |

### copyjs

复制当前节点内容

```js
import { copyjs } from 'ilibs';
const d = document.createElement('div');
d.innerHTML = '测试复制';
d.id = 'test';
document.body.appendChild(d);
setTimeout(() => {
	copyjs('#test');
}, 1000);
```

##### API

| 参数 | 描述           | 类型             | 必填 | 可选值 | 默认值 |
| ---- | -------------- | ---------------- | ---- | ------ | ------ |
| dom  | 需要复制的节点 | Element / string | yes  | -      | -      |

### generateRandomHexColor

生成随机颜色

```js
import { generateRandomHexColor } from 'ilibs';
console.log(generateRandomHexColor()); // #ffffff
```

##### Return

string

### scrollTo

滚动到顶部/底部 ('top'/'bottom',默认 top)

```js
import { scrollTo } from 'ilibs';
setTimeout(() => {
	scrollTo(document.body);
}, 1000);
```

##### API

| 参数    | 描述             | 类型             | 必填 | 可选值     | 默认值 |
| ------- | ---------------- | ---------------- | ---- | ---------- | ------ |
| element | 带有滚动条的 dom | Element / string | yes  | -          | -      |
| type    | 滚动的位置       | string           | -    | top/bottom | top    |

# 节点操作

## 函数列表

| 函数名称                             | 描述                    |
| ------------------------------------ | ----------------------- |
| setIcon(url)                         | 设置页面 ICON           |
| setTitle(title)                      | 设置页面标题            |
| loadRes(url,t,fn)                    | 设置页面外部引入资源    |
| selectDom(tag)                       | 节点选择器              |
| createTextNode(text)                 | 创建文本节点            |
| htmlStringToVNode(html)              | html 字符串转 node 对象 |
| createDom(vnode,container)           | node 对象转 dom 节点    |
| setStyle(tag,style)                  | 设置 dom style 样式     |
| setClass(tag,clas)                   | 设置 dom class 样式     |
| removeClass(tag,clas)                | 删除 dom class 样式     |
| append(tag,child)                    | 向 dom 节点添加子节点   |
| getChildNode(tag)                    | 获取 dom 节点的子节点   |
| setTransform(tag)                    | 设置 dom 节点过滤       |
| addListener(target,type,callback)    | 设置 dom 节点事件监听   |
| removeListener(target,type,callback) | 移除 dom 节点事件监听   |
| remove(node)                         | 移除 dom 节点           |
| setAttr(node,attrs)                  | 设置 dom 节点 attr      |
| getAttr(node,attrName)               | 获取 dom 节点 attr      |

## API

### setIcon

设置页面 ICON

```js
import { setIcon } from 'ilibs';
setIcon('icon.png');
```

##### API

| 参数 | 描述          | 类型   | 必填 | 可选值 | 默认值 |
| ---- | ------------- | ------ | ---- | ------ | ------ |
| url  | icon 链接地址 | string | yes  | -      | -      |

### setTitle

设置页面标题

```js
import { setTitle } from 'ilibs';
setTitle('设置页面标题');
```

##### API

| 参数  | 描述     | 类型   | 必填 | 可选值 | 默认值 |
| ----- | -------- | ------ | ---- | ------ | ------ |
| title | 页面标题 | string | yes  | -      | -      |

### loadRes

设置页面外部引入资源

```js
import { loadRes } from 'ilibs';
loadRes('body{color:red}', 'style');
```

##### API

| 参数 | 描述         | 类型     | 必填 | 可选值                         | 默认值 |
| ---- | ------------ | -------- | ---- | ------------------------------ | ------ |
| url  | 引入内容     | string   | yes  | -                              | -      |
| t    | 引入类型     | string   | yes  | script/css/style/js/javascript | -      |
| fn   | 添加成功回调 | Function | -    | -                              | -      |

### selectDom

节点选择器

```js
import { selectDom } from 'ilibs';
console.log(selectDom('body'));
```

##### API

| 参数 | 描述                                        | 类型   | 必填 | 可选值 | 默认值 |
| ---- | ------------------------------------------- | ------ | ---- | ------ | ------ |
| tag  | 节点名称,与 document.querySelector 传参一致 | string | yes  | -      | -      |

##### Return

Element

### createTextNode

创建文本节点

```js
import { createTextNode } from 'ilibs';
console.log(createTextNode('text'));
```

##### API

| 参数 | 描述 | 类型   | 必填 | 可选值 | 默认值 |
| ---- | ---- | ------ | ---- | ------ | ------ |
| text | 文本 | string | yes  | -      | -      |

##### Return

Element

### htmlStringToVNode

html 字符串转 node 对象

```js
import { htmlStringToVNode } from 'ilibs';
console.log(htmlStringToVNode('<div>text</div>')); //  {"tag":"DIV","attrs":{},"children":[{"tag":"DIV","attrs":{},"children":["text"]}]}
```

##### API

| 参数 | 描述        | 类型   | 必填 | 可选值 | 默认值 |
| ---- | ----------- | ------ | ---- | ------ | ------ |
| html | html 字符串 | string | yes  | -      | -      |

##### Return

object

### createDom

node 对象转 dom 节点

```js
import { createDom } from 'ilibs';
console.log(createDom({ tag: 'DIV', attrs: {}, children: ['text'] })); //  <div>text</div>
```

##### API

| 参数      | 描述                      | 类型   | 必填 | 可选值 | 默认值 |
| --------- | ------------------------- | ------ | ---- | ------ | ------ |
| vnode     | node 对象                 | object | yes  | -      | -      |
| container | 将 dom 节点添加到那个容器 | object | -    | -      | -      |

##### Return

HTMLElement | Node | Text | null

### setStyle

设置 dom style 样式

```js
import { setStyle } from 'ilibs';
setStyle('body', {
	color: 'red',
});
setStyle('body', 'color: red');
```

##### API

| 参数  | 描述     | 类型                | 必填 | 可选值 | 默认值 |
| ----- | -------- | ------------------- | ---- | ------ | ------ |
| tag   | dom 节点 | HTMLElement /string | yes  | -      | -      |
| style | 样式     | object /string      | yes  | -      | -      |

##### Return

HTMLElement | Node | Text | null

### setClass

设置 dom class 样式

```js
import { setClass } from 'ilibs';
setClass('body', {
	'body-color': true,
	'body-margin': false,
});
setClass('body', 'body-color');
setClass('body', ['body-color', 'body-margin']);
```

##### API

| 参数 | 描述       | 类型                   | 必填 | 可选值 | 默认值 |
| ---- | ---------- | ---------------------- | ---- | ------ | ------ |
| tag  | dom 节点   | HTMLElement/string     | yes  | -      | -      |
| clas | class 样式 | object/string/string[] | yes  | -      | -      |

##### Return

HTMLElement | Node | Text | null

### removeClass

删除 dom class 样式

```js
import { removeClass } from 'ilibs';
removeClass('body', {
	'body-color': true,
	'body-margin': false,
});
setClass('body', 'body-color');
setClass('body', ['body-color', 'body-margin']);
```

##### API

| 参数 | 描述       | 类型                   | 必填 | 可选值 | 默认值 |
| ---- | ---------- | ---------------------- | ---- | ------ | ------ |
| tag  | dom 节点   | HTMLElement/string     | yes  | -      | -      |
| clas | class 样式 | object/string/string[] | yes  | -      | -      |

##### Return

HTMLElement | Node | Text | null

### append

向 dom 节点添加子节点

```js
import { append } from 'ilibs';
const d = document.createElement('div');
d.innerHTML = '测试复制';
d.id = 'test';
append('body', [d]);
append('body', [{ tag: 'DIV', attrs: {}, children: ['text'] }]);
```

##### API

| 参数  | 描述     | 类型               | 必填 | 可选值 | 默认值 |
| ----- | -------- | ------------------ | ---- | ------ | ------ |
| tag   | dom 节点 | HTMLElement/string | yes  | -      | -      |
| child | 子节点   | Array              | yes  | -      | -      |

##### Return

HTMLElement | Node | Text | null

### getChildNode

获取 dom 节点的子节点

```js
import { getChildNode } from 'ilibs';
console.log(getChildNode('body'));
```

##### API

| 参数 | 描述     | 类型               | 必填 | 可选值 | 默认值 |
| ---- | -------- | ------------------ | ---- | ------ | ------ |
| tag  | dom 节点 | HTMLElement/string | yes  | -      | -      |

##### Return

Array

### setTransform

获取 dom 节点的子节点

```js
import { setTransform } from 'ilibs';
console.log(setTransform('body'));
```

##### API

| 参数 | 描述     | 类型               | 必填 | 可选值 | 默认值 |
| ---- | -------- | ------------------ | ---- | ------ | ------ |
| tag  | dom 节点 | HTMLElement/string | yes  | -      | -      |

##### Return

Array

### addListener

设置 dom 节点事件监听

```js
import { addListener } from 'ilibs';
const bodyEvent = () => {
	console.log(1);
};
addListener('body', 'click', bodyEvent);
```

##### API

| 参数     | 描述     | 类型               | 必填 | 可选值 | 默认值 |
| -------- | -------- | ------------------ | ---- | ------ | ------ |
| target   | dom 节点 | HTMLElement/string | yes  | -      | -      |
| type     | 事件类型 | string             | yes  | -      | -      |
| callback | 回调函数 | Function           | yes  | -      | -      |

### removeListener

移除 dom 节点事件监听

```js
import { addListener, removeListener } from 'ilibs';
const bodyEvent = () => {
	console.log(1);
	removeListener('body', 'click', bodyEvent);
};
addListener('body', 'click', bodyEvent);
```

##### API

| 参数     | 描述     | 类型               | 必填 | 可选值 | 默认值 |
| -------- | -------- | ------------------ | ---- | ------ | ------ |
| target   | dom 节点 | HTMLElement/string | yes  | -      | -      |
| type     | 事件类型 | string             | yes  | -      | -      |
| callback | 回调函数 | Function           | yes  | -      | -      |

### remove

移除 dom 节点

```js
import { remove } from 'ilibs';
remove('body');
```

##### API

| 参数 | 描述     | 类型               | 必填 | 可选值 | 默认值 |
| ---- | -------- | ------------------ | ---- | ------ | ------ |
| node | dom 节点 | HTMLElement/string | yes  | -      | -      |

### setAttr

设置 dom 节点 attr

```js
import { setAttr } from 'ilibs';
setAttr('body', { style: 'color:red' });
```

##### API

| 参数  | 描述           | 类型               | 必填 | 可选值 | 默认值 |
| ----- | -------------- | ------------------ | ---- | ------ | ------ |
| node  | dom 节点       | HTMLElement/string | yes  | -      | -      |
| attrs | 节点 attr 对象 | object             | -    | -      | -      |

### getAttr

获取 dom 节点 attr

```js
import { getAttr } from 'ilibs';
getAttr('body');
```

##### API

| 参数  | 描述           | 类型               | 必填 | 可选值 | 默认值 |
| ----- | -------------- | ------------------ | ---- | ------ | ------ |
| node  | dom 节点       | HTMLElement/string | yes  | -      | -      |
| attrs | 节点 attr 对象 | object             | -    | -      | -      |
