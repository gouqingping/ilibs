import { isString, flatter } from "../libs";
import { unique } from './unique'

const intersect = (a: any, b: any) => new Set([...a].filter(item => b.has(item)));
const intersectMap = (a: { [k: string]: any }, k: string | boolean = false) => {
    return a.map((i: { [k: string]: any }) => {
        if (k && isString(k)) return i[k];
        return i;
    });
}
export function intersection(...arg: any[][] | any[]) {
    const last = arg[arg.length - 1];
    const [first, ...arrs] = arg.map((i) => isString(last) ? i : new Set(i)), ints: any[] = [];
    let current = first;
    if (isString(last)) {
        arrs.length = arrs.length - 1;
        const arrBy = arrs.map(item => intersectMap(item, last));
        arrBy.forEach(item => current = intersect(new Set(intersectMap(first, last)), new Set(item)));
        for (let item of current.values()) ints.push(item)
        return unique(flatter(arg).filter(i => ints.includes(i[last])), last)
    } else {
        arrs.forEach(item => current = intersect(first, item));
        for (let item of current.values()) ints.push(item)
        return ints;
    }
}
