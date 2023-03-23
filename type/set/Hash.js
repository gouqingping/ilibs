import { hasOwnProperty, nativeCreate } from "./lib";
const HASH_UNDEFINED = '__ilibs_hash_undefined__';
export default class Hash {
    __data__;
    constructor(entries) {
        let index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
            const entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    clear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    delete(key) {
        return this.has(key) && delete this.__data__[key];
    }
    get(key) {
        const data = this.__data__;
        if (nativeCreate) {
            const result = data[key];
            return result === HASH_UNDEFINED ? undefined : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }
    has(key) {
        const data = this.__data__;
        return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }
    set(key, value) {
        const data = this.__data__;
        data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
        return this;
    }
}
