export * from '../set';
export interface AnyObject {
    [key: string]: any;
}
export declare const NUMBERS_UPPERCASE: string[];
export declare const MONEY_UNIT: string[];
export declare function convertNumberToUppercase(num: number): string;
export declare function h5Resize(downCallback?: () => void, upCallback?: () => void): void;
export declare function fontSize(def?: number, maxWidth?: number): number;
export declare function howLongAgo(date: Date | number | string | any, type?: string): any;
export declare const useThrottl: (fn: Function, time: number) => (...args: any[]) => void;
export declare const useDebounce: (fn: Function, time: number) => (...args: any[]) => void;
export declare function useLazyLoad(tags: string[], node?: Element | null): undefined;
export declare function randomNum(min?: number, max?: number): number;
export declare function updatePath(path: string, reqSrc?: string): string;
export declare function setIcon(url: string): string | undefined;
export declare const setTitle: (title: string) => string;
export declare function cloneDeep(data: any): any;
export declare const unwarp: (obj: AnyObject) => any;
export declare function merge(...args: any[]): any[] | AnyObject;
export declare function each(data: any, iteratee: Function): any;
export declare function objectEach(obj: AnyObject, iteratee: Function): AnyObject;
export declare function isExistChild(data: any[] | AnyObject): boolean;
export declare function filter(array: any[], predicate: Function): any[];
export declare function push(data: any[] | AnyObject, key: any, value?: any): any[] | AnyObject;
export declare function flatter(arr: any[]): any[];
export declare function rmArr(array: any[], key: string): any[];
export declare function emit(object: AnyObject, option?: any): any;
export declare function getValue(data: AnyObject | any[], key: string | string[] | Number, alt?: any): any;
export declare function nextRegister(): void;
export declare function currying(fn: Function, ...args: any): Function;
export declare const templateParser: (template: string, data: AnyObject) => string;
export declare function listToTree(data: any[]): any[];
export declare function treeToList(data: any[]): any[];
export declare function setInterval(fn: Function, t?: number): Function;
export declare function copyjs(dom: Element | string): boolean;
export declare const copyToClipboard: (text: string) => Promise<void>;
export declare const scrollTo: (element: Element | string, type?: 'top' | 'bottom') => false | undefined;
export declare const trinityGrading: (str: string | number) => string | number;