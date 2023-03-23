import { isString, flatter } from "../libs";
import { unique } from './unique';
const intersect = (a, b) => new Set([...a].filter(item => b.has(item)));
const intersectMap = (a, k = false) => {
    return a.map((i) => {
        if (k && isString(k))
            return i[k];
        return i;
    });
};
export function intersection(...arg) {
    const last = arg[arg.length - 1];
    const [first, ...arrs] = arg.map((i) => isString(last) ? i : new Set(i)), ints = [];
    let current = first;
    if (isString(last)) {
        arrs.length = arrs.length - 1;
        const arrBy = arrs.map(item => intersectMap(item, last));
        arrBy.forEach(item => current = intersect(new Set(intersectMap(first, last)), new Set(item)));
        for (let item of current.values())
            ints.push(item);
        return unique(flatter(arg).filter(i => ints.includes(i[last])), last);
    }
    else {
        arrs.forEach(item => current = intersect(first, item));
        for (let item of current.values())
            ints.push(item);
        return ints;
    }
}
