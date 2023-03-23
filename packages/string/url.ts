
/**
 * @description: 从查询字符串中获取参数
 * @param {string} url getQueryParams("/user?name=Orkhan&age=30")
 * @return {AnyObject} { name: 'Orkhan', age: '30' }
 * @Date: 2021-02-01 11:36:59
 * @author: Pat
 */
export function getUrlQuery(url: string | any, split?: string): AnyObject {
    if (!url || url.indexOf("?") == -1) return {};
    split && (url = url.includes(split) ? url.split(split)[0] : url);
    return url.match(/([^?=&]+)(=([^&]*))/g).reduce((total: AnyObject, crr: string) => {
        const [key, value] = crr.split("=");
        total[key] = value;
        return total;
    }, {});
}
/**
 * @description: 从路径中获取参数
 * @param {string} path 路径符串
 * @param {string} pathMap 需要获取参数字符串
 * @param {AnyObject} serializer 
 * @return {AnyObject} getPathParams("/app/products/123", "/app/:page/:id"); // { page: 'products', id: '123' }
 *                    getPathParams("/items/2/id/8583212", "/items/:category/id/:id", {category: v => ['Car', 'Mobile', 'Home'][v],id: v => +v}); // { category: 'Home', id: 8583212 }
 * @Date: 2021-02-01 11:40:49
 * @author: Pat
 */
export function getPathParams(path: string, pathMap: string, serializer: AnyObject | null | undefined = null): AnyObject {
    if (!path || !pathMap) return {};
    let splitPath: string[] = path.split("/"),
        splitPathMap: string[] = pathMap.split("/");
    return splitPathMap.reduce((acc: AnyObject, crr: any, i: number) => {
        if (crr[0] === ":") {
            const param = crr.substr(1);
            acc[param] = serializer && serializer[param]
                ? serializer[param](splitPath[i])
                : splitPath[i];
        }
        return acc;
    }, {});
};
/**
 * @description: 使用查询字符串生成路径
 * @param {string} path 路径符串
 * @param {AnyObject} obj 条件对象
 * @return {string} generatePathQuery("/user", { name: "Orkhan", age: 30 });  // "/user?name=Orkhan&age=30"
 * @Date: 2021-02-01 11:43:34
 * @author: Pat
 */
export function generatePathQuery(path: string, obj: AnyObject = {}): string {
    if (!path) return path;
    return path + Object.entries(obj).reduce((total: string, [k, v]) => (total += `${k}=${encodeURIComponent(v)}&`), "?").slice(0, -1);
}
/**
 * @description: 使用参数生成路径
 * @param {string} path
 * @param {AnyObject} obj
 * @return {string} generatePath("/app/:page/:id", { page: "products", id: 85, });  // "/app/products/85"
 * @Date: 2021-02-01 11:44:28
 * @author: Pat
 */
export function generatePath(path: string, obj: AnyObject = {}): string {
    if (!path) return path;
    return path.replace(/(\:[a-z]+)/g, (v) => obj[v.substr(1)])
};