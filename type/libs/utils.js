import { isType, isArray, isObject, isString, isNumber, isFunction } from './base';
export * from '../set';
export const NUMBERS_UPPERCASE = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
export const MONEY_UNIT = ['', '十', '百', '仟', '萬', '億', '点', ''];
export function convertNumberToUppercase(num) {
    const MU = MONEY_UNIT, a = ('' + num).replace(/(^0*)/g, '').split('.');
    let k = 0, re = '';
    for (let i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = MONEY_UNIT[7] + re;
                break;
            case 4:
                if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$').test(a[0]))
                    re = MU[4] + re;
                break;
            case 8:
                re = MU[5] + re;
                MU[7] = MU[5];
                k = 0;
                break;
        }
        if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0)
            re = MU[0] + re;
        if (a[0].charAt(i) !== 0)
            re = NUMBERS_UPPERCASE[a[0].charAt(i)] + MU[k % 4] + re;
        k++;
    }
    if (a.length > 1) {
        re += MU[6];
        for (let i = 0; i < a[1].length; i++)
            re += NUMBERS_UPPERCASE[a[1].charAt(i)];
    }
    if (re === '一十')
        re = NUMBERS_UPPERCASE[NUMBERS_UPPERCASE.length - 1];
    if (re.match(/^一/) && re.length === 3)
        re = re.replace('一', '');
    return re;
}
;
export function h5Resize(downCallback = () => { }, upCallback = () => { }) {
    const clientHeight = window.innerHeight;
    downCallback = isFunction(downCallback) ? downCallback : function () { };
    upCallback = isFunction(upCallback) ? upCallback : function () { };
    window.addEventListener('resize', () => {
        const height = window.innerHeight;
        if (height === clientHeight)
            downCallback();
        if (height < clientHeight)
            upCallback();
    });
}
export function fontSize(def = 0, maxWidth = 1920) {
    const clientWidth = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (!clientWidth)
        return 0;
    return def * (clientWidth / maxWidth);
}
;
export function howLongAgo(date, type = "cn") {
    if (!date)
        return date;
    try {
        let info = {
            cn: ["秒前", "分钟前", "小时前", "天前", "个月前", "年前"],
            en: ["seconds ago", "minutes ago", "hours ago", "days ago", "months ago", "years ago"]
        };
        if (isType(date, ["string", "number"])) {
            date = new Date(date);
        }
        ;
        if (date) {
            const round = (n) => Math.round((Date.now() - date.getTime()) / n);
            const [seconds, minutes, hours, days, months, years] = [
                round(1e3), round(6e4), round(36e5), round(864e5), round(2592e6), round(31104e6)
            ];
            switch (true) {
                case seconds < 60:
                    return `${seconds} ${info[type][0]}`;
                    break;
                case minutes < 60:
                    return `${minutes} ${info[type][1]}`;
                    break;
                case hours < 24:
                    return `${hours} ${info[type][2]}`;
                    break;
                case days < 30:
                    return `${days} ${info[type][3]}`;
                    break;
                case months < 12:
                    return `${months} ${info[type][4]}`;
                    break;
                default:
                    return `${years} ${info[type][5]}`;
                    break;
            }
        }
        return "";
    }
    catch (error) {
        return "";
    }
}
export const useThrottl = (fn, time) => {
    let timer = null;
    let prev = Date.now() - time;
    return (...args) => {
        let remaining = time - (Date.now() - prev);
        clearTimeout(timer);
        if (remaining <= 0) {
            fn.apply(this, args);
            prev = Date.now();
        }
        else {
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, remaining);
        }
    };
};
export const useDebounce = (fn, time) => {
    let timer = null;
    return (...args) => {
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, time);
    };
};
export function useLazyLoad(tags, node = null) {
    if (!tags)
        return tags;
    let globals = node || window || globalThis, ele = node || document.documentElement;
    const _getTop = (tag) => {
        let ot = tag.offsetTop;
        while (tag = tag.offsetParent) {
            ot += tag.offsetTop;
        }
        return ot;
    }, _loadImg = (tagArr) => {
        let sltHeight = ele.clientHeight, slTop = ele.scrollTop || document.body.scrollTop;
        tagArr.forEach(tag => {
            if ((sltHeight + slTop) > _getTop(tag)) {
                const src = tag.getAttribute("data-src");
                tag.removeAttribute("data-src");
                tag.src = src ? src : tag.src;
            }
        });
    }, currentScrollChange = () => (_loadImg(tags)), currentNodeStateChange = () => (globals.removeEventListener("scroll", currentScrollChange));
    currentScrollChange();
    globals.addEventListener('scroll', currentScrollChange);
    globals.addEventListener("beforeunload", currentNodeStateChange);
    globals.addEventListener('DOMNodeRemoved', currentNodeStateChange);
}
export function randomNum(min = 0, max = 10) {
    switch (arguments.length) {
        case 1:
            return Math.random() * (min + 1);
            break;
        case 2:
            return Math.random() * (max - min + 1) + min;
            break;
        default:
            return 0;
            break;
    }
}
export function updatePath(path, reqSrc = location.origin) {
    if (!path || !isString(path))
        return path;
    if (!path && !(/^_|:|^\/|http|https(.*?)$/.test(path))) {
        return path;
    }
    ;
    let pathSplit = "";
    path = path.replace(/^\s+|\s+$/g, "");
    (path.indexOf(":/") > -1) && (pathSplit = path.split(":"), (pathSplit[0].indexOf("http") == -1) && (path = `:${pathSplit[1]}`));
    (path.charAt(0) == ":") && (path = path.replace(":", reqSrc));
    (path.indexOf("http") > -1) && (path = `http${path.split("http")[1]}`);
    return path;
}
export function setIcon(url) {
    if (!url || !isString(url))
        return url;
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}
export const setTitle = (title) => (document.title = title);
export function cloneDeep(data) {
    const hash = new WeakMap();
    if (!data)
        return data;
    if (!isObject(data))
        return data;
    if (hash.has(data))
        return hash.get(data);
    let target = isArray(data) ? [] : {};
    hash.set(data, target);
    Reflect.ownKeys(data).forEach((item) => {
        if (isObject(data[item])) {
            target[item] = cloneDeep(data[item]);
        }
        else {
            target[item] = data[item];
        }
    });
    return target;
}
;
export const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);
export function merge(...args) {
    let isAr = false;
    args.forEach((item) => {
        isAr = isArray(item);
        return;
    });
    if (isAr)
        return args;
    let obj = {};
    args.forEach((item) => {
        obj = { ...obj, ...item };
    });
    return obj;
}
export function each(data, iteratee) {
    if (!isObject(data) && !isArray(data))
        return data;
    if (isObject(data))
        return objectEach(data, iteratee);
    let index = -1, length = data == null ? 0 : data.length;
    let result = isArray(data) && [...data];
    while (++index < length) {
        result[index] = iteratee(data[index], index, data);
        if (result[index] === false)
            break;
    }
    return result;
}
;
export function objectEach(obj, iteratee) {
    if (!isObject(obj))
        return { obj };
    let array = Object.keys(obj);
    let index = -1, length = array == null ? 0 : array.length;
    let result = { ...obj };
    while (++index < length) {
        result[array[index]] = iteratee(obj[array[index]], array[index], obj);
        if (result[array[index]] === false)
            break;
    }
    return result;
}
export function isExistChild(data) {
    if (!data || (!isObject(data) && !isArray(data)))
        return true;
    data = (isObject(data)) ? Object.keys(data) : data;
    return data.length <= 0;
}
export function filter(array, predicate) {
    if (!isArray(array))
        return [array];
    let index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
        let value = array[index];
        (predicate(value, index, array)) && (result[resIndex++] = value);
    }
    return result;
}
export function push(data, key, value) {
    if (!data || (!isObject(data) && !isArray(data)))
        return data;
    if (isArray(data)) {
        let index = -1, length = key.length, offset = data.length;
        if (isArray(key)) {
            while (++index < length)
                (data[offset + index] = key[index]);
        }
        else {
            if (value) {
                data[key] = value;
            }
            else {
                data[offset] = key;
            }
        }
        return data;
    }
    if (isArray(key)) {
        let index = -1, length = key.length;
        while (++index < length)
            for (let i in key[index])
                (data[i] = (key[index][i]));
    }
    else if (isObject(key)) {
        for (let i in key)
            (data[i] = (key[i]));
    }
    else {
        data[key] = value;
    }
    return data;
}
export function flatter(arr) {
    if (!arr.length)
        return [];
    while (arr.some((item) => isArray(item)))
        arr = [].concat(...arr);
    return arr.filter(item => !(!item));
}
export function rmArr(array, key) {
    let index = array.indexOf(key);
    if (index > -1)
        array.splice(index, 1);
    return array;
}
;
export function emit(object, option = null) {
    if (!option)
        return "";
    if (isArray(option)) {
        let current = option[0];
        if (option.length === 1)
            return current;
        return emit(object[current], rmArr(option, current));
    }
    ;
    return object[option];
}
;
export function getValue(data, key, alt) {
    let value, current = data, currentKey = isString(key) ? key : isNumber(key) ? `${key}` : '';
    if (!key)
        return alt;
    if (isArray(key))
        currentKey = key.join('.');
    const array = currentKey.split('.');
    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (!value)
            return alt;
        if (i === j - 1)
            return value;
        current = value;
    }
    return alt;
}
;
export function nextRegister() {
    let args = arguments;
    let count = 0;
    let comm = {};
    function nextTime() {
        count++;
        (count < args.length) && (args[count] && isType(args[count], 'function')) && args[count](comm, nextTime);
    }
    (args[count] && isType(args[count], 'function')) && args[count](comm, nextTime);
}
export function currying(fn, ...args) {
    const length = fn.length;
    let allArgs = [...args];
    const res = (...newArgs) => {
        allArgs = [...allArgs, ...newArgs];
        if (allArgs.length === length) {
            return fn(...allArgs);
        }
        else {
            return res;
        }
    };
    return res;
}
export const templateParser = (template, data) => template.replace(/\{\{(\w+)\}\}/g, (_match, key) => data[key]);
export function listToTree(data) {
    let temp = {};
    let treeData = [];
    for (let i = 0; i < data.length; i++)
        temp[data[i].id] = data[i];
    for (let i in temp) {
        if (+temp[i].parentId != 0) {
            if (!temp[temp[i].parentId].children)
                temp[temp[i].parentId].children = [];
            temp[temp[i].parentId].children.push(temp[i]);
        }
        else {
            treeData.push(temp[i]);
        }
    }
    return treeData;
}
export function treeToList(data) {
    let res = [];
    const dfs = (tree) => {
        tree.forEach((item) => {
            if (item.children) {
                dfs(item.children);
                delete item.children;
            }
            res.push(item);
        });
    };
    dfs(data);
    return res;
}
export function setInterval(fn, t = 0) {
    let timer = null;
    const interval = () => {
        fn();
        timer = setTimeout(interval, t);
    };
    interval();
    return () => clearTimeout(timer);
}
export function copyjs(dom) {
    const body = document.body;
    let range;
    if (isString(dom))
        dom = document.querySelector(dom);
    if (!dom)
        return false;
    if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(dom);
        range.select();
    }
    else if (window.getSelection) {
        let selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(dom);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else {
        console.warn("none");
    }
    return document.execCommand("copy");
}
export const copyToClipboard = (text) => navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(text);
export const scrollTo = (element, type = 'top') => {
    if (isString(element))
        element = document.querySelector(element);
    if (!element)
        return false;
    element.scrollIntoView({ behavior: "smooth", block: type == 'top' ? "start" : 'end' });
};
export const trinityGrading = (str) => (isNumber(str) ? str.toString() : str)?.replace?.(/(?<=\d)(?=(\d{3})+(?!\d))/g, ',') || str;
