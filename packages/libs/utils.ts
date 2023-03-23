/*
 * @Autor        : Pat
 * @Description  : Utils
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-04-19 10:56:47
 * @LastEditors  : GGos
 * @LastEditTime : 2022-10-10 14:18:49
 */
import { isType, isArray, isObject, isString, isNumber, isFunction } from './base';
export * from '../set';
export interface AnyObject { [key: string]: any }
export const NUMBERS_UPPERCASE = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
export const MONEY_UNIT = ['', '十', '百', '仟', '萬', '億', '点', ''];

/**
 * @description: 将阿拉伯数字翻译成中文的大写数字
 * @param {number} num
 * @return {string}
 * @Date: 2021-09-15 15:06:38
 * @author: g go s
 */
export function convertNumberToUppercase(num: number): string {
    const MU = MONEY_UNIT, a: any[] = ('' + num).replace(/(^0*)/g, '').split('.');
    let k = 0, re = '';
    for (let i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = MONEY_UNIT[7] + re
                break
            case 4:
                if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$').test(a[0])) re = MU[4] + re;
                break
            case 8:
                re = MU[5] + re
                MU[7] = MU[5]
                k = 0
                break
        }
        if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) re = MU[0] + re;
        if (a[0].charAt(i) !== 0) re = NUMBERS_UPPERCASE[a[0].charAt(i)] + MU[k % 4] + re;
        k++;
    }
    if (a.length > 1) {
        re += MU[6]
        for (let i = 0; i < a[1].length; i++) re += NUMBERS_UPPERCASE[a[1].charAt(i)];
    }
    if (re === '一十') re = NUMBERS_UPPERCASE[NUMBERS_UPPERCASE.length - 1];
    if (re.match(/^一/) && re.length === 3) re = re.replace('一', '');
    return re
};
/**
 * @description: H5软键盘缩回、弹起回调
 * @param {() => void} downCallback
 * @param {() => void} upCallback
 * @Date: 2022-10-08 11:19:12
 * @author: GGos
 */
export function h5Resize(downCallback: () => void = () => { }, upCallback: () => void = () => { }) {
    const clientHeight = window.innerHeight;
    downCallback = isFunction(downCallback) ? downCallback : function () { }
    upCallback = isFunction(upCallback) ? upCallback : function () { }
    window.addEventListener('resize', () => {
        const height = window.innerHeight;
        if (height === clientHeight) downCallback();
        if (height < clientHeight) upCallback();
    });
}

/**
 * @description: 根据分辨率不同显示不同字体大小
 * @param {number} def 值
 * @param {number} maxWidth 最大分辨率宽
 * @return {number}
 * @Date: 2021-02-01 11:23:38
 * @author: Pat
 */
export function fontSize(def: number = 0, maxWidth: number = 1920): number {
    const clientWidth = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (!clientWidth) return 0;
    return def * (clientWidth / maxWidth);
};
/**
 * @description: 距现在多少时间前
 * @param {Date | number | string } date 时间 new Date(2021, 0, 5)
 * @param {string} type 
 * @return {string} fromAgo(new Date(2021, 0, 5)) // 14 天前;
 * @Date: 2021-02-01 11:45:41
 * @author: Pat
 */
export function howLongAgo(date: Date | number | string | any, type: string = "cn"): any {
    if (!date) return date;
    try {
        let info: any = {
            cn: ["秒前", "分钟前", "小时前", "天前", "个月前", "年前"],
            en: ["seconds ago", "minutes ago", "hours ago", "days ago", "months ago", "years ago"]
        };
        if (isType(date, ["string", "number"])) { date = new Date(date) };
        if (date) {
            const round = (n: number) => Math.round((Date.now() - date.getTime()) / n);
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
    } catch (error) {
        return "";
    }
}
/**
 * @description: 节流
 * @param {Function} fn 
 * @param {number} time
 * @Date: 2021-02-26 15:27:52
 * @author: Pat
 */

export const useThrottl = (fn: Function, time: number) => {
    let timer: any = null;
    let prev = Date.now() - time;
    return (...args: any[]) => {
        let remaining = time - (Date.now() - prev);
        clearTimeout(timer);
        if (remaining <= 0) {
            fn.apply(this, args);
            prev = Date.now();
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, remaining)
        }
    }
}

/**
 * @description: 防抖
 * @param {Function} fn 
 * @param {number} time
 * @Date: 2021-02-26 15:27:52
 * @author: Pat
 */
export const useDebounce = (fn: Function, time: number) => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, time)
    }
}

/**
 * @description: 图片懒加载
 * @param {any} tags
 * @Date: 2021-03-05 16:37:53
 * @author: Pat
 */
export function useLazyLoad(tags: string[], node: Element | null = null) {
    if (!tags) return tags;
    let globals = node || window || globalThis, ele = node || document.documentElement;
    // 获取当前Tag滚动条的高度
    const _getTop = (tag: any) => {
        let ot = tag.offsetTop;
        while (tag = tag.offsetParent) {
            ot += tag.offsetTop;
        }
        return ot
    },
        // 遍历所有Tag判断
        // 如果当前可视区域高度+当前页面滚动条的高度 大于 当前Tag所在的位置
        // 那么开始加载当前的Tag，将Tag data-src 的值转换为 src
        _loadImg = (tagArr: any[]) => {
            // 获取可视区域高度
            let sltHeight = ele.clientHeight, slTop = ele.scrollTop || document.body.scrollTop;
            tagArr.forEach(tag => {
                if ((sltHeight + slTop) > _getTop(tag)) {
                    const src = tag.getAttribute("data-src");
                    tag.removeAttribute("data-src");
                    tag.src = src ? src : tag.src;
                }
            })
        },
        currentScrollChange = () => (_loadImg(tags)),
        currentNodeStateChange = () => (globals.removeEventListener("scroll", currentScrollChange));
    currentScrollChange();
    //onscroll()在滚动条滚动的时候触发
    globals.addEventListener('scroll', currentScrollChange);
    globals.addEventListener("beforeunload", currentNodeStateChange);
    globals.addEventListener('DOMNodeRemoved', currentNodeStateChange);
}
/**
 * @description: 生成区间随机数
 * @param {any} min 最小值
 * @param {any} max 最大值
 * @Date: 2021-04-19 11:38:56
 * @author: Pat
 */
export function randomNum(min: number = 0, max: number = 10) {
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
/**
 * @description: update current path
 * @param {string} path
 * @param {string} reqSrc
 * @Date: 2021-03-24 15:36:32
 * @author: Pat
 */
export function updatePath(path: string, reqSrc: string = location.origin) {
    if (!path || !isString(path)) return path;
    if (!path && !(/^_|:|^\/|http|https(.*?)$/.test(path))) { return path };
    let pathSplit: string | string[] = "";
    path = path.replace(/^\s+|\s+$/g, "");
    (path.indexOf(":/") > -1) && (pathSplit = path.split(":"), (pathSplit[0].indexOf("http") == -1) && (path = `:${pathSplit[1]}`));
    (path.charAt(0) == ":") && (path = path.replace(":", reqSrc));
    (path.indexOf("http") > -1) && (path = `http${path.split("http")[1]}`);
    return path
}
/**
 * @description: 设置页面ICON
 * @param {string} url
 * @Date: 2021-03-29 09:41:37
 * @author: Pat
 */
export function setIcon(url: string) {
    if (!url || !isString(url)) return url;
    let link: any = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}
/**
 * @description: 设置页面标题
 * @param {string} title
 * @Date: 2021-03-29 09:41:37
 * @author: Pat
 */
export const setTitle = (title: string) => (document.title = title);
/**
 * @description: 数据深拷贝 let a = cloneDeep({a:1}) // {a:1}
 * @param {any} data
 * @Date: 2021-04-19 09:45:11
 * @author: Pat
 */
export function cloneDeep(data: any) {
    const hash = new WeakMap();
    if (!data) return data;
    if (!isObject(data)) return data;
    if (hash.has(data)) return hash.get(data);
    let target: any = isArray(data) ? [] : {};
    hash.set(data, target);
    Reflect.ownKeys(data).forEach((item: any) => {
        if (isObject(data[item])) {
            target[item] = cloneDeep(data[item]);
        } else {
            target[item] = data[item];
        }
    });
    return target;
};
/**
 * @description: 针对于Echarts结构Proxy设置Option  unwarp(xxxx).setOption
 * @param {AnyObject} obj
 * @Date: 2021-05-13 17:46:50
 * @author: Pat
 */
export const unwarp = (obj: AnyObject) => obj && (obj.__v_raw || obj.valueOf() || obj);
/**
 * @description: 数据合并
 * @return {any[]|AnyObject}
 * @Date: 2021-06-19 13:57:57
 * @author: Pat
 */
export function merge(...args: any[]): any[] | AnyObject {
    let isAr: boolean = false;
    args.forEach((item: any[] | AnyObject) => {
        isAr = isArray(item);
        return;
    });
    if (isAr) return args;
    let obj = {};
    args.forEach((item: any[] | AnyObject) => {
        obj = { ...obj, ...item };
    });
    return obj;
}
/**
 * @description: 遍历数据
 * @param {AnyObject | any[]} data The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {any} 
 * @Date: 2021-06-19 14:32:21
 * @author: Pat
 */
export function each(data: any, iteratee: Function): any {
    if (!isObject(data) && !isArray(data)) return data;
    if (isObject(data)) return objectEach(data, iteratee);
    let index: any = -1, length = data == null ? 0 : (data as []).length;
    let result: any = isArray(data) && [...data];
    while (++index < length) {
        result[index] = iteratee(data[index], index, data);
        if (result[index] === false) break;
    }
    return result;
};
/**
 * @description: 遍历对象
 * @param {AnyObject} obj The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @return {AnyObject}
 * @Date: 2021-06-19 14:40:25
 * @author: Pat
 */
export function objectEach(obj: AnyObject, iteratee: Function): AnyObject {
    if (!isObject(obj)) return { obj };
    let array = Object.keys(obj);
    let index = -1, length = array == null ? 0 : array.length;
    let result = { ...obj };
    while (++index < length) {
        result[array[index]] = iteratee(obj[array[index]], array[index], obj);
        if (result[array[index]] === false) break;
    }
    return result;
}
/**
 * @description: 验证对象/数组是否为空数据
 * @param {any[] | AnyObject} data
 * @return {boolean}
 * @Date: 2021-06-19 15:32:28
 * @author: Pat
 */
export function isExistChild(data: any[] | AnyObject): boolean {
    if (!data || (!isObject(data) && !isArray(data))) return true;
    data = (isObject(data)) ? Object.keys(data) : data;
    return data.length <= 0;
}

/**
 * @description: 数组筛选
 * @param {any[]} array
 * @param {Function} predicate
 * @return {any[]}
 * @Date: 2021-06-19 15:45:25
 * @author: Pat
 */
export function filter(array: any[], predicate: Function): any[] {
    if (!isArray(array)) return [array];
    let index = -1, length = array == null ? 0 : array.length, resIndex = 0, result: any[] = [];
    while (++index < length) {
        let value = array[index];
        (predicate(value, index, array)) && (result[resIndex++] = value);
    }
    return result;
}

/**
 * @description: 对象/数组添加数据
 * @param {any[] | AnyObject} data
 * @param {any} key
 * @param {any} value
 * @return {any[] | AnyObject}
 * @Date: 2021-06-19 16:03:07
 * @author: Pat
 */
export function push(data: any[] | AnyObject, key: any, value?: any): any[] | AnyObject {
    if (!data || (!isObject(data) && !isArray(data))) return data;
    if (isArray(data)) {
        let index = -1, length = key.length, offset = data.length;
        if (isArray(key)) {
            while (++index < length) (data[offset + index] = key[index]);
        } else {
            if (value) {
                data[key] = value
            } else {
                data[offset] = key
            }
        }
        return data
    }
    if (isArray(key)) {
        let index = -1, length = key.length;
        while (++index < length) for (let i in key[index]) (data[i] = (key[index][i]));
    } else if (isObject(key)) {
        for (let i in key) (data[i] = (key[i]));
    } else {
        data[key] = value;
    }
    return data
}
/**
 * @description: 数组扁平化处理（多维数组变成一维数组）
 * @param {any[]} arr
 * @return {any[]}
 * @Date: 2021-06-23 14:15:37
 * @author: Pat
 */
export function flatter(arr: any[]): any[] {
    if (!arr.length) return [];
    while (arr.some((item) => isArray(item))) arr = [].concat(...arr);
    return arr.filter(item => !(!item));
}
/**
 * @description: Delete the specified parameter in the array
 * @param {Array} array Array to be processed
 * @param {any} key Parameters to be deleted
 * @return {Array<any>}
 * @Date: 2021-01-29 13:56:46
 * @author: Pat
 */
export function rmArr(array: any[], key: string): any[] {
    let index = array.indexOf(key);
    if (index > -1) array.splice(index, 1);
    return array
};
/**
 * @description: Output object parameters based on array conditions
 * @param {AnyObject} object Object to be processed
 * @param {Array} option Parameters to be output
 * @return {string}
 * @Date: 2021-01-29 14:01:05
 * @author: Pat
 */
export function emit(object: AnyObject, option: any = null): any {
    if (!option) return "";
    if (isArray(option)) {
        let current = option[0];
        if (option.length === 1) return current;
        return emit(object[current], rmArr(option, current));
    };
    return object[option];
};
/**
 * @description: Output object zhiding parameters according to array conditions
 * @param {string} key Object specified parameters
 * @param {AnyObject} obj Output object raw data
 * @return {string | AnyObject | Array<any> | number}
 * @Date: 2021-01-29 14:05:54
 * @author: Pat
 */
export function getValue(
    data: AnyObject | any[],
    key: string | string[] | Number,
    alt?: any
): any {
    let value: any, current: any = data, currentKey: string = isString(key) ? key : isNumber(key) ? `${key}` : '';
    // Not current object specified parameters
    // Return current output object raw data
    if (!key) return alt;
    if (isArray(key)) currentKey = key.join('.');
    // As array condition to array or string
    // Output object parameters based on array conditions
    const array = currentKey.split('.');
    // Object specified parameters contain '.'
    // Then split '.'
    // converted to an array
    // output the corresponding object parameters
    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (!value) return alt;
        if (i === j - 1) return value;
        current = value;
    }
    return alt;
};
/**
 * @description: 手动next
 * @Date: 2021-06-23 16:03:14
 * @author: Pat
 */
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
/**
 * @description: 柯里化处理
 * @param {Function} fn
 * @param {array} args
 * @Date: 2021-06-23 16:40:52
 * @author: Pat
 */
export function currying(fn: Function, ...args: any): Function {
    const length = fn.length;
    let allArgs = [...args];
    const res = (...newArgs: any) => {
        allArgs = [...allArgs, ...newArgs];
        if (allArgs.length === length) {
            return fn(...allArgs);
        } else {
            return res;
        }
    };
    return res;
}
/**
 * @description: template 解析器
 * @param {string} template
 * @param {AnyObject} data
 * @return {*}
 * @Date: 2021-06-23 16:58:06
 * @author: Pat
 */
export const templateParser = (template: string, data: AnyObject): string => template.replace(/\{\{(\w+)\}\}/g, (_match, key) => data[key]);
/**
 * @description: 列表转成树形结构
 * @param {any[]} data
 * @return {any[]}
 * @Date: 2021-06-23 16:59:24
 * @author: Pat
 */
export function listToTree(data: any[]): any[] {
    let temp: any = {};
    let treeData: any = [];
    for (let i = 0; i < data.length; i++) temp[data[i].id] = data[i];
    for (let i in temp) {
        if (+temp[i].parentId != 0) {
            if (!temp[temp[i].parentId].children) temp[temp[i].parentId].children = [];
            temp[temp[i].parentId].children.push(temp[i]);
        } else {
            treeData.push(temp[i]);
        }
    }
    return treeData;
}
/**
 * @description: 树形结构转成列表
 * @param {any[]} data
 * @return {any[]}
 * @Date: 2021-06-23 16:59:24
 * @author: Pat
 */
export function treeToList(data: any[]): any[] {
    let res: any[] = [];
    const dfs = (tree: any) => {
        tree.forEach((item: any) => {
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

/**
 * @description: setInterval 重置优化
 * @param {Function} fn 回调执行方法
 * @param {number} t 时间值
 * @return {Function} 关闭当前计时器
 * @Date: 2021-06-25 17:46:41
 * @author: Pat
 */
export function setInterval(fn: Function, t: number = 0): Function {
    let timer: any = null;
    const interval = () => {
        fn();
        timer = setTimeout(interval, t);
    }
    interval();
    return () => clearTimeout(timer);
}

/**
 * @description: 复制当前节点内容
 * @param {Element} dom
 * @Date: 2021-07-22 17:45:21
 * @author: Pat
 */
export function copyjs(dom: Element | string) {
    const body: any = document.body;
    let range: any;
    if (isString(dom)) dom = document.querySelector(dom) as Element;
    if (!dom) return false;
    if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(dom);
        range.select();
    } else if (window.getSelection) {
        let selection: any = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(dom);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("none");
    }
    return document.execCommand("copy");
}
/**
 * @description: 复制文字到粘贴板
 * @param {string} text
 * @Date: 2022-10-08 11:02:18
 * @author: GGos
 */
export const copyToClipboard = (text: string) => navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(text)

/**
 * @description: 滚动到顶部/底部 ('top' | 'bottom',默认 top)
 * @param {Element} element
 * @param {'top' | 'bottom'} type
 * @Date: 2022-10-08 11:09:46
 * @author: GGos
 */
export const scrollTo = (element: Element | string, type: 'top' | 'bottom' = 'top') => {
    if (isString(element)) element = document.querySelector(element) as Element;
    if (!element) return false;
    element.scrollIntoView({ behavior: "smooth", block: type == 'top' ? "start" : 'end' })
};

export const trinityGrading = (str: string | number) => (isNumber(str) ? str.toString() : str)?.replace?.(/(?<=\d)(?=(\d{3})+(?!\d))/g, ',') || str;
