import { AnyObject } from "../libs";
declare const Dom: AnyObject;
export declare type VNode = {
    tag: string;
    attrs?: AnyObject;
    children?: VNode[];
};
export declare type Loadres = 'script' | 'css' | 'style' | 'js' | 'javascript';
export declare const loadRes: (url: string, t: Loadres, fn?: Function) => void;
export declare function selectDom(tag: string): HTMLElement;
export declare function isVNode({ tag }: VNode): boolean;
export declare function createTextNode(text: string): Text | null;
export declare function htmlStringToVNode(html: string | any): VNode;
export declare function createDom(vnode: VNode | any, container?: AnyObject | HTMLElement | Node | string): HTMLElement | Node | Text | null;
export declare function setStyle(tag: HTMLElement | Node | any, style: string | AnyObject | any): HTMLElement | Node;
export declare function setClass(tag: HTMLElement | Node | any, clas: string | AnyObject | string[]): HTMLElement | Node | AnyObject;
export declare const addClass: typeof setClass;
export declare function removeClass(tag: AnyObject | HTMLElement | Node | any, clas: string | AnyObject | string[]): HTMLElement | Node | AnyObject;
export declare function append(tag: AnyObject | HTMLElement | Node | any, child: any[] | VNode[]): HTMLElement | Node | AnyObject;
export declare function getChildNode(tag: AnyObject | HTMLElement | Node | string, child?: string | string[] | null): Node[] | HTMLElement[] | any[];
export declare function setTransform(tag: HTMLElement | string, value: string): undefined;
export declare function addListener(target: any, type: string, callback: Function, options?: {
    passive?: boolean;
    capture?: boolean;
}): any;
export declare function removeListener(target: any, type: string, callback: Function, options?: {
    passive?: boolean;
    capture?: boolean;
}): any;
export declare function remove(node: HTMLElement | string): undefined;
export declare function setAttr(node: any, attrs?: AnyObject): any;
export declare function getAttr(node: HTMLElement | any, attrName?: string[] | string | any): any;
export default Dom;
