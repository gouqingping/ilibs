import { capitalUpperCase, isString, isFunction } from "../libs";
import { PinYin } from "./PinYin";
const arraySearch = (l1s, ucfirst) => {
    for (let name in PinYin) {
        if (PinYin[name].indexOf(l1s) != -1) {
            if (ucfirst && isFunction(ucfirst)) {
                return ucfirst(name);
            }
            else
                return name;
        }
    }
    return false;
};
export const filterTag = (str) => str.replace(/&/ig, '&').replace(/</ig, '<').replace(/>/ig, '>').replace(' ', '');
export function getPinyin(l1, firstBoolen = true) {
    if (!l1 || !isString(l1))
        return l1;
    const l2 = l1.length, reg = new RegExp('[a-zA-Z0-9\- ]');
    let I1 = "";
    for (let i = 0; i < l2; i++) {
        let val = l1.substr(i, 1);
        let name = arraySearch(val, firstBoolen ? capitalUpperCase : firstBoolen);
        if (reg.test(val)) {
            I1 += val;
        }
        else if (name !== false)
            I1 += name;
    }
    I1 = I1.replace(/ /g, '-');
    while (I1.indexOf('--') > 0)
        I1 = I1.replace('--', '-');
    return I1;
}
