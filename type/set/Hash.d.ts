export default class Hash {
    private __data__;
    constructor(entries?: any);
    clear(): void;
    delete(key: string): boolean;
    get(key: string): any;
    has(key: string): boolean;
    set(key: string, value: any): this;
}
