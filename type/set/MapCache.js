import Hash from "./Hash";
import { getMapData, Map } from "./lib";
import ListCache from "./ListCache";
export class MapCache {
    __data__;
    constructor(entries) {
        let index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    clear() {
        this.__data__ = {
            'hash': new Hash,
            'map': new (Map || ListCache),
            'string': new Hash
        };
    }
    delete(key) {
        return getMapData(this, key)['delete'](key);
    }
    get(key) {
        return getMapData(this, key).get(key);
    }
    has(key) {
        return getMapData(this, key).has(key);
    }
    set(key, value) {
        getMapData(this, key).set(key, value);
        return this;
    }
}
