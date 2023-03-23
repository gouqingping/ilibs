import { isArray, isNumber, isObject, isString } from "../libs";
import { assignValue, isIndex, toKey } from "./lib";
export function setValue(
    data: { [k: string]: any } | any[],
    path: string | string[] | Number,
    value?: any,
    customizer?: (arg0: any, arg1: any, arg2: any) => any
): { [k: string]: any } | any[] {
    let [object, currentKey]: [any, string] = [data, isString(path) ? path : isNumber(path) ? `${path}` : ''];
    if (isArray(path)) currentKey = path.join('.');
    const keys = currentKey.split('.');
    let index = -1, length = keys.length, lastIndex = length - 1, nested = object;
    while (nested != null && ++index < length) {
        let key = toKey(keys[index]), newValue = value;
        if (index != lastIndex) {
            const objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined;
            if (newValue === undefined) newValue = isObject(objValue) ? objValue : (isIndex(keys[index + 1]) ? objValue : {});
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
    }
    return object;
};