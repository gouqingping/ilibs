/*
 * @Autor        : GGos
 * @Description  : common
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-10-08 11:13:04
 * @LastEditors  : GGos
 * @LastEditTime : 2022-10-10 14:11:23
 */
export type TypeString = 'string' | 'number' | 'object' | 'symbol' | 'array' | 'function' | 'boolean';
/**
 * @description: 验证是否为数组
 * @return {boolean}
 * @author: GGos
 */
export const isArray = Array.isArray;
/**
 * @description: 验证数据是否为对象
 * @param {any} data
 * @return {boolean}
 * @Date: 2022-10-08 11:38:01
 * @author: GGos
 */
export const isObject = (data: any): data is { [k: string]: any } => typeof data === 'object' && !isArray(data);
/**
 * @description: 检查字符串是否为json字符串
 * @param {string} str
 * @return {boolean}
 * @Date: 2022-10-08 12:08:26
 * @author: GGos
 */
export function isJSONStr(str: string): str is string {
    if (str && isString(str)) {
        try {
            if (isObject(JSON.parse(str))) return true;
            return false;
        } catch (e) { return false; }
    }
    return false;
};
/**
 * @description: 验证数据是否为函数
 * @param {any} data
 * @return {boolean}
 * @Date: 2022-10-08 11:41:25
 * @author: GGos
 */
export const isFunction = (data: any): data is Function => typeof data === 'function';
/**
 * @description: 验证数据是否为字符串
 * @param {any} data
 * @return {boolean}
 * @Date: 2022-10-08 11:42:48
 * @author: GGos
 */
export const isString = (data: any): data is string => typeof data === 'string';
/**
 * @description: 验证数据是否为数字类型
 * @param {any} data
 * @return {boolean}
 * @Date: 2022-10-08 11:45:05
 * @author: GGos
 */
export const isNumber = (data: any): data is number => !isNaN(Math.sign(data));
/**
 * @description: 验证数据是否为布尔值
 * @param {any} data
 * @return {boolean}
 * @Date: 2022-10-08 11:45:39
 * @author: GGos
 */
export const isBoolean = (data: any): data is boolean => typeof data === 'boolean';
/**
 * @description: 验证数据是否为symbol
 * @param {any} data
 * @return {boolean}
 * @Date: 2022-10-08 11:46:48
 * @author: GGos
 */
export const isSymbol = (data: any): data is Symbol => typeof data === 'symbol';
/**
 * @description: 验证数据是否为基础数据类型
 * @param {any} data
 * @return {boolean}
 * @Date: 2022-10-08 12:03:41
 * @author: GGos
 */
export const isBasicData = (data: any): boolean => (isString(data) || isNumber(data) || isSymbol(data) || isBoolean(data));
/**
 * @description: 全部转小写
 * @param {string} str
 * @return {string}
 * @Date: 2022-10-08 11:34:05
 * @author: GGos
 */
export const toLowerCase = (str: string): string => (str.toLowerCase());
/**
 * @description: 全部转大写
 * @param {string} str
 * @return {string}
 * @Date: 2022-10-08 11:34:57
 * @author: GGos
 */
export const toUpperCase = (str: string): string => (str.toUpperCase());
/**
 * @description: 获取数据类型
 * @param {any} data
 * @return {TypeString}
 * @Date: 2022-10-08 11:35:23
 * @author: GGos
 */
export const getType = (data: any): TypeString => toLowerCase(Object.prototype.toString.call(data).replace(/\[/g, "").replace(/\]/g, "").replace(/\s/g, "").replace(/\object/g, "")) as TypeString;
/**
 * @description: 验证数据是否为指定数据类型
 * @param {any} data
 * @param {string} typeStr
 * @return {boolean}
 * @Date: 2022-10-08 12:02:57
 * @author: GGos
 */
export const isType = (data: any, typeStr: TypeString | TypeString[]): boolean => {
    if (isArray(typeStr)) {
        let isValidType: boolean = false;
        typeStr.forEach((item: TypeString) => {
            let isOk = isType(data, item);
            isOk && (isValidType = isOk);
        });
        return isValidType;
    }
    return getType(data) === toLowerCase(typeStr);
}
/**
 * @description: 判断两条数据是否相等
 * @param {any} v1
 * @param {any} v2
 * @return {boolean}
 * @Date: 2022-10-08 12:07:11
 * @author: GGos
 */
export const isEqual = (v1: any, v2: any): boolean => (isBasicData(v1) ? v1 : JSON.stringify(v1)) === (isBasicData(v2) ? v2 : JSON.stringify(v2))
/**
 * @description: 检查是否为奇数
 * @param {number} num
 * @return {boolean}
 * @Date: 2022-10-08 12:07:23
 * @author: GGos
 */
export const isOdd = (num: number): boolean => ((num & 1) > 0);
/**
 * @description: 检查是否为Base64字符串
 * @param {string} str
 * @return {boolean}
 * @Date: 2021-02-03 11:42:54
 * @author: Pat
 */
export const isBase64 = (str: string): boolean => {
    const notBase64 = /[^A-Z0-9+\/=]/i, len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str)) return false;
    const firstPaddingChar = str.indexOf('=');
    return firstPaddingChar === -1 || firstPaddingChar === len - 1 || (firstPaddingChar === len - 2 && str[len - 1] === '=');
}
/**
 * @description: 检查字符串是否为图片url
 * @param {string} picture
 * @return {boolean}
 * @Date: 2022-10-08 13:01:32
 * @author: GGos
 */
export const isPicture = (picture: string): boolean => {
    if (isString(picture)) {
        if (picture.indexOf(".") > -1) {
            return "jpeg|gif|jpg|png|bmp|pic|svg".indexOf(picture.split(".")[picture.split(".").length - 1]) > -1;
        }
        return isBase64(picture);
    }
    return false;
};
/**
 * @description: 检查URL是否有效
 * @param {string} url url地址
 * @return {boolean} isURL("https://baidu.com") // true
 * @Date: 2021-02-01 11:49:12
 * @author: Pat
 */
export const isURL = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
/**
 * @description: 判断是android还是ios还是web还是WeChat
 * @return {string}
 * @Date: 2022-10-08 14:24:22
 * @author: GGos
 */
export const isDevice = (): 'iOS' | 'Android' | 'WeChat' | 'Web' => {
    let ua: any = navigator.userAgent.toLowerCase();
    if (ua.match(/iPhone\sOS/i) === 'iphone os' || ua.match(/iPad/i) === 'ipad') return 'iOS';
    if (ua.match(/Android/i) === 'android') return 'Android';
    if (ua.match(/MicroMessenger/i) === 'micromessenger') return 'WeChat';
    return 'Web';
}
/**
 * @description: 设置首字母大写不改变之后的字符串
 * @param {string} str
 * @return {string}
 * @Date: 2022-10-08 13:13:31
 * @author: GGos
 */
export const capitalUpperCase = (str: string): string => (`${toUpperCase(str.charAt(0))}${str.slice(1)}`);
/**
 * @description: 设置首字母小写不改变之后的字符串
 * @param {string} str
 * @return {string}
 * @Date: 2022-10-08 13:14:42
 * @author: GGos
 */
export const capitalLowerCase = (str: string): string => (`${toLowerCase(str.charAt(0))}${str.slice(1)}`);
/**
 * @description: 设置首字母大写其他全部转为小写
 * @param {string} str
 * @return {string}
 * @Date: 2022-10-08 13:15:33
 * @author: GGos
 */
export const capitalUpperCaseAllLowerCase = (str: string): string => (toLowerCase(str).replace(/( |^)[a-z]/g, (L) => toUpperCase(L)));
/**
 * @description: 将"xx_xx"字符串转为小驼峰
 * @param {string} str
 * @return {string}
 * @Date: 2022-10-08 13:15:59
 * @author: GGos
 */
export const toLowerCamelCase = (str: string): string => {
    let arr = toLowerCase(str).split('');
    arr.map((item, index) => ((item === '_') && (arr.splice(index, 1), arr[index] = toUpperCase(arr[index]))));
    return arr.join('');
};
/**
 * @description: 将"xx_xx"字符串转为大驼峰
 * @param {string} str
 * @return {string}
 * @Date: 2022-10-08 13:15:59
 * @author: GGos
 */
export const toCamelCase = (str: string): string => capitalUpperCase(toLowerCamelCase(str));