import { capitalUpperCase, isString, isFunction } from "../libs";
import { PinYin } from "./PinYin";
const arraySearch = (l1s: string, ucfirst: Function | boolean | any) => {
    for (let name in PinYin) {
        if (PinYin[name].indexOf(l1s) != -1) {
            if (ucfirst && isFunction(ucfirst)) {
                return ucfirst(name);
            } else return name;
        }
    }
    return false;
};
/**
 * @description: 过滤html代码(把<>转换)
 * @param {string} str
 * @return {string}
 * @Date: 2021-09-15 15:03:59
 * @author: Pat
 */
export const filterTag = (str: string): string => str.replace(/&/ig, '&').replace(/</ig, '<').replace(/>/ig, '>').replace(' ', '');

/**
 * @description: 汉字转拼音
 * @param {string} l1 指定中文字符串
 * @param {boolean} firstBoolen 
 * @return {string}
 * @Date: 2021-02-01 11:20:37
 * @author: Pat
 */
export function getPinyin(l1: string, firstBoolen: boolean = true): string {
    if (!l1 || !isString(l1)) return l1;
    const l2 = l1.length, reg = new RegExp('[a-zA-Z0-9\- ]');
    let I1 = "";
    for (let i = 0; i < l2; i++) {
        let val = l1.substr(i, 1);
        let name = arraySearch(val, firstBoolen ? capitalUpperCase : firstBoolen);
        if (reg.test(val)) {
            I1 += val;
        } else if (name !== false) I1 += name;
    }
    I1 = I1.replace(/ /g, '-');
    while (I1.indexOf('--') > 0) I1 = I1.replace('--', '-');
    return I1;
}