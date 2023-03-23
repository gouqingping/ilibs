export default class ListCache {
    private __data__;
    constructor(entries: any[]);
    clear(): void;
    delete(key: string): boolean;
    get(key: string): undefined;
    has(key: string): boolean;
    set(key: string, value: any): this;
}
