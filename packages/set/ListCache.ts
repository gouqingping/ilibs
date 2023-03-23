import { assocIndexOf } from "./lib";

export default class ListCache {
    private __data__!: never[];
    constructor(entries: any[]) {
        let index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
            const entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    clear() {
        this.__data__ = [];
    }
    delete(key: string) {
        let data = this.__data__, index = assocIndexOf(data, key);

        if (index < 0) {
            return false;
        }
        const lastIndex = data.length - 1;
        if (index == lastIndex) {
            data.pop();
        } else {
            Array.prototype.splice.call(data, index, 1);
        }
        return true;
    }
    get(key: string) {
        let data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? undefined : data[index][1];
    }
    has(key: string): boolean {
        return assocIndexOf(this.__data__, key) > -1;
    }
    set(key: string, value: any) {
        let data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
            data.push([key, value] as never);
        } else {
            data[index][1] = value as never;
        }
        return this;
    }
}