import { isFunction, isObject, isSymbol } from "../common";
const INFINITY = 1 / 0;
const root = typeof global == 'object' && global && global.Object === Object && global ||
    typeof self == 'object' && self && self.Object === Object && self ||
    Function('return this')();
const Symbol = root.Symbol;
const symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
const maskSrcKey = (function () {
    const coreJsData = root['__core-js_shared__'];
    const uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
}());
const funcToString = Function.prototype.toString;
const isHostObject = (value: any) => {
    let result = false;
    if (value != null && typeof value.toString != 'function') {
        try {
            result = !!(value + '');
        } catch (e) { }
    }
    return result;
}
const toSource = (func: any) => {
    if (func != null) {
        try {
            return funcToString.call(func);
        } catch (e) { }
        try {
            return (func + '');
        } catch (e) { }
    }
    return '';
}
const baseIsNative = (value: any): boolean => {
    if (!isObject(value) || isMasked(value)) return false;
    const reIsNative = funcToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
    const pattern = (isFunction(value) || isHostObject(value)) ? RegExp(`^${reIsNative}$`) : /^\[object .+?Constructor\]$/;
    return pattern.test(toSource(value));
}

const getNative = (object: { [k: string]: any }, key: string) => {
    const value = object == null ? undefined : object[key];
    return baseIsNative(object[key]) ? value : undefined;
}

const isMasked = (func: any) => !!maskSrcKey && (maskSrcKey in func);


const isKeyable = (value: string) => ['string', 'number', 'symbol', 'boolean'].includes(typeof value) ? (value !== '__proto__') : (value === null);


export const hasOwnProperty = Object.prototype.hasOwnProperty;

export const Map = getNative(root, 'Map');
export const nativeCreate = getNative(Object, 'create');

export function assocIndexOf(array: never[], key: string) {
    let length = array.length;
    while (length--) {
        if (eq(array[length][0], key)) {
            return length;
        }
    }
    return -1;
}

export function eq(value: any, other: string) {
    return value === other || (value !== value && other !== other);
}

export function getMapData(map: { [k: string]: any }, key: string) {
    const data = map.__data__;
    return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
}

export function assignValue(object: any, key: PropertyKey, value: any) {
    if (!(hasOwnProperty.call(object, key) && eq(object[key], value)) ||
        (value === undefined && !(key in object))) object[key] = value;
}

export function toKey(value: any): any {
    if (typeof value == 'string' || isSymbol(value)) return value;
    const result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}
export function isIndex(value: any, length?: number) {
    const reIsUint = /^(?:0|[1-9]\d*)$/
    const MAX_SAFE_INTEGER = 9007199254740991;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}