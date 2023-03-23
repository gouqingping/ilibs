export const isArray = Array.isArray;
export const isObject = (data) => typeof data === 'object' && !isArray(data);
export function isJSONStr(str) {
    if (str && isString(str)) {
        try {
            if (isObject(JSON.parse(str)))
                return true;
            return false;
        }
        catch (e) {
            return false;
        }
    }
    return false;
}
;
export const isFunction = (data) => typeof data === 'function';
export const isString = (data) => typeof data === 'string';
export const isNumber = (data) => !isNaN(Math.sign(data));
export const isBoolean = (data) => typeof data === 'boolean';
export const isSymbol = (data) => typeof data === 'symbol';
export const isBasicData = (data) => (isString(data) || isNumber(data) || isSymbol(data) || isBoolean(data));
export const toLowerCase = (str) => (str.toLowerCase());
export const toUpperCase = (str) => (str.toUpperCase());
export const getType = (data) => toLowerCase(Object.prototype.toString.call(data).replace(/\[/g, "").replace(/\]/g, "").replace(/\s/g, "").replace(/\object/g, ""));
export const isType = (data, typeStr) => {
    if (isArray(typeStr)) {
        let isValidType = false;
        typeStr.forEach((item) => {
            let isOk = isType(data, item);
            isOk && (isValidType = isOk);
        });
        return isValidType;
    }
    return getType(data) === toLowerCase(typeStr);
};
export const isEqual = (v1, v2) => (isBasicData(v1) ? v1 : JSON.stringify(v1)) === (isBasicData(v2) ? v2 : JSON.stringify(v2));
export const isOdd = (num) => ((num & 1) > 0);
export const isBase64 = (str) => {
    const notBase64 = /[^A-Z0-9+\/=]/i, len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str))
        return false;
    const firstPaddingChar = str.indexOf('=');
    return firstPaddingChar === -1 || firstPaddingChar === len - 1 || (firstPaddingChar === len - 2 && str[len - 1] === '=');
};
export const isPicture = (picture) => {
    if (isString(picture)) {
        if (picture.indexOf(".") > -1) {
            return "jpeg|gif|jpg|png|bmp|pic|svg".indexOf(picture.split(".")[picture.split(".").length - 1]) > -1;
        }
        return isBase64(picture);
    }
    return false;
};
export const isURL = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch (error) {
        return false;
    }
};
export const isDevice = () => {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iPhone\sOS/i) === 'iphone os' || ua.match(/iPad/i) === 'ipad')
        return 'iOS';
    if (ua.match(/Android/i) === 'android')
        return 'Android';
    if (ua.match(/MicroMessenger/i) === 'micromessenger')
        return 'WeChat';
    return 'Web';
};
export const capitalUpperCase = (str) => (`${toUpperCase(str.charAt(0))}${str.slice(1)}`);
export const capitalLowerCase = (str) => (`${toLowerCase(str.charAt(0))}${str.slice(1)}`);
export const capitalUpperCaseAllLowerCase = (str) => (toLowerCase(str).replace(/( |^)[a-z]/g, (L) => toUpperCase(L)));
export const toLowerCamelCase = (str) => {
    let arr = toLowerCase(str).split('');
    arr.map((item, index) => ((item === '_') && (arr.splice(index, 1), arr[index] = toUpperCase(arr[index]))));
    return arr.join('');
};
export const toCamelCase = (str) => capitalUpperCase(toLowerCamelCase(str));
