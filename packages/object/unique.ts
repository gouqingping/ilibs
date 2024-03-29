export const unique = (arr: any[], k?: string | number) => {
    let map = new Map()
    arr.forEach((item) => {
        const i = k ? item[k] : item;
        if (!map.has(i)) map.set(i, item);
    })
    return [...map.values()];
}