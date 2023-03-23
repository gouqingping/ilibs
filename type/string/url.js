export function getUrlQuery(url, split) {
    if (!url || url.indexOf("?") == -1)
        return {};
    split && (url = url.includes(split) ? url.split(split)[0] : url);
    return url.match(/([^?=&]+)(=([^&]*))/g).reduce((total, crr) => {
        const [key, value] = crr.split("=");
        total[key] = value;
        return total;
    }, {});
}
export function getPathParams(path, pathMap, serializer = null) {
    if (!path || !pathMap)
        return {};
    let splitPath = path.split("/"), splitPathMap = pathMap.split("/");
    return splitPathMap.reduce((acc, crr, i) => {
        if (crr[0] === ":") {
            const param = crr.substr(1);
            acc[param] = serializer && serializer[param]
                ? serializer[param](splitPath[i])
                : splitPath[i];
        }
        return acc;
    }, {});
}
;
export function generatePathQuery(path, obj = {}) {
    if (!path)
        return path;
    return path + Object.entries(obj).reduce((total, [k, v]) => (total += `${k}=${encodeURIComponent(v)}&`), "?").slice(0, -1);
}
export function generatePath(path, obj = {}) {
    if (!path)
        return path;
    return path.replace(/(\:[a-z]+)/g, (v) => obj[v.substr(1)]);
}
;
