/*
 * @Autor        : GGos
 * @Description  : DOM
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-08-23 14:44:23
 * @LastEditors  : GGos
 * @LastEditTime : 2022-10-10 15:21:30
 */
import { isArray, isFunction, isObject, isString, AnyObject, each, objectEach } from "../libs";
const Dom: AnyObject = {};
const win: any = window || globalThis;
export type VNode = {
    tag: string,
    attrs?: AnyObject,
    children?: VNode[]
};

export type Loadres = 'script' | 'css' | 'style' | 'js' | 'javascript'

export const loadRes = function (url: string, t: Loadres, fn: Function = () => { }) { // 加载js || css || style
    let ref: HTMLElement | any;
    if (['js', 'javascript'].includes(t)) {
        ref = createDom({
            tag: 'script',
            attrs: {
                type: 'text/javascript',
                src: url
            }
        });
    } else if (t === 'css') {
        ref = createDom({
            tga: 'link',
            attrs: {
                rel: 'stylesheet',
                type: 'text/css',
                href: url
            }
        });
    } else if (t === 'style') {
        ref = createDom({
            tag: 'style',
            attrs: {
                innerHTML: url
            }
        });
    }
    if (typeof ref !== 'undefined') {
        append(selectDom('head'), ref);
        ref.onload = function () {
            typeof fn === 'function' && fn()
        }
    }
}

export function selectDom(tag: string): HTMLElement {
    let stor: any = document.querySelectorAll(tag);
    stor = stor.length > 1 ? stor : stor.length > 0 ? stor[0] : stor;
    return stor;
}

export function isVNode({ tag }: VNode) {
    return !(!tag);
}

export function createTextNode(text: string) {
    if (text) return document.createTextNode(text);
    return null;
}
/**
 * @description: Generate VNode Json data based on html string and Dom node
 * @param {string|HTMLElement|Element|Node} html HTML string
 * @return {VNode}
 * @Date: 2021-08-24 16:36:13
 * @author: Pat
 */
export function htmlStringToVNode(html: string | any): VNode {
    let jsx = { tag: '', attrs: {}, children: [] };
    const toVNode = (html: string | any, currentJSX: any) => {
        const doc = isString(html) ? document.createElement('div') : html;
        isString(html) && (doc.innerHTML = html);
        const docchildNodes = doc.childNodes;
        currentJSX.tag = doc.tagName;
        if (doc.attributes) Object.entries(doc.attributes).forEach(([index, { name, value }]: any) => (currentJSX.attrs[name] = value));
        for (let i = 0, len = docchildNodes.length; i < len; i++) {
            const { tagName, attributes, nodeType, textContent } = docchildNodes[i] as AnyObject;
            const cjsx: { [k: string]: any } = { tag: tagName, attrs: {}, children: [] };
            if (attributes) Object.entries(attributes).forEach(([index, { name, value }]: any) => (cjsx.attrs[name] = value));
            if (nodeType === 3) {
                if (textContent && textContent.replace(/[\r\n\s]/g, "")) {
                    currentJSX.children.push(textContent);
                }
            } else {
                currentJSX.children.push(cjsx);
                toVNode(docchildNodes[i], cjsx);
            }
        };
        return currentJSX;
    };
    toVNode(html, jsx);
    return jsx;
}
/**
 * @description: Create a dom node based on vnode data
 * @param {VNode|HTMLElement} vnode {tag:string,attr:AnyObject,children}
 * @param {AnyObject|HTMLElement|Node} container
 * @return {HTMLElement|Node}
 * @Date: 2021-08-24 10:05:14
 * @author: Pat
 */
export function createDom(vnode: VNode | any, container?: AnyObject | HTMLElement | Node | string): HTMLElement | Node | Text | null {
    let dom: any;
    // vnode is string create text node
    if (isString(vnode)) {
        return createTextNode(vnode);
    } else if (vnode instanceof Element) {
        return vnode;
    } else if (isFunction(vnode)) {
        if (vnode.tag.toString().startsWith("class ")) {
            let obj = new vnode.tag();
            return createDom(obj.render());
        }
        return createDom(vnode.tag());
    } else {
        if (isObject(vnode)) {
            dom = document.createElement(vnode.tag);
        } else {
            return vnode;
        }
    };
    const { attrs, children } = vnode;
    setAttr(dom, attrs);
    children && children.forEach((child: AnyObject) => {
        let iChild = child.element ? child.element : child;
        const childIsArray = (subiChild: any) => {
            if (isArray(subiChild)) {
                subiChild.forEach((subChild) => childIsArray(subChild));
            } else {
                dom && dom.appendChild && dom.appendChild(createDom(subiChild));
            }
        };
        childIsArray(iChild);
    });
    vnode.element = dom;
    if (isString(container)) container = selectDom(container);
    container && append(container, dom);
    return vnode.element;
};
/**
 * @description: Set dom node style
 * @param {any} dom
 * @param {string | AnyObject} style
 * @return {HTMLElement|Node}
 * @Date: 2021-08-24 10:20:24
 * @author: Pat
 */
export function setStyle(tag: HTMLElement | Node | any, style: string | AnyObject | any): HTMLElement | Node {
    if (isString(tag)) tag = selectDom(tag);
    if (!tag) return tag;
    if (isString(style)) {
        tag.style = style
    } else {
        if (isObject(style)) {
            objectEach(style, (item: any, key: string) => {
                tag.style[key] = item;
            })
        }
    }
    return tag;
};
/**
 * @description: Set dom node class name
 * @param {AnyObject} dom
 * @param {string | AnyObject | string[]} clas
 * @return {HTMLElement|Node|AnyObject}
 * @Date: 2021-08-24 10:22:21
 * @author: Pat
 */
export function setClass(tag: HTMLElement | Node | any, clas: string | AnyObject | string[]): HTMLElement | Node | AnyObject {
    if (isString(tag)) tag = selectDom(tag);
    if (!tag) return tag;
    const rmClass: string[] = [];
    if (typeof clas === 'string') {
        clas = clas.split(' ');
    } else if (isObject(clas)) {
        const nClas: string[] = [];
        objectEach(clas, (item: any, key: string) => {
            if (item) {
                nClas.push(key)
            } else {
                rmClass.push(key)
            };
        })
        clas = [...nClas];
    };
    if (!isArray(clas)) {
        return tag;
    } else {
        const domClassList = tag.classList;
        clas.forEach((item) => {
            if (!domClassList.contains(item)) {
                domClassList.add(item);
            } else if (rmClass.includes(item)) {
                domClassList.remove(item);
            }
        })
    }
    return tag;
};

export const addClass = setClass;
/**
 * @description: Remove current dom className
 * @param { AnyObject|HTMLElement|Node} dom
 * @param {string | AnyObject | string[]} clas
 * @return {HTMLElement|Node|AnyObject}
 * @Date: 2021-08-24 10:23:50
 * @author: Pat
 */
export function removeClass(tag: AnyObject | HTMLElement | Node | any, clas: string | AnyObject | string[]): HTMLElement | Node | AnyObject {
    if (isString(tag)) tag = selectDom(tag);
    if (!tag) return tag;
    const domClassList = tag.classList;
    let rmClass: any[] = [];
    if (typeof clas === 'string') {
        rmClass = [...clas.split(' ')];
    } else if (isObject(clas)) {
        const nClas: string[] = [];
        objectEach(clas, (item: any, key: string) => {
            if (!item) {
                rmClass.push(key)
            };
        })
        rmClass = [...nClas];
    };
    if (!isArray(rmClass)) {
        return tag;
    } else {
        rmClass.forEach((item) => {
            domClassList.remove(item);
        })
    }
    return tag;
};
/**
 * @description: Add child nodes to the current dom node
 * @param {AnyObject|HTMLElement|Node} tag
 * @param {any[]} child
 * @return {HTMLElement | Node | AnyObject}
 * @Date: 2021-08-24 10:26:04
 * @author: Pat
 */
export function append(tag: AnyObject | HTMLElement | Node | any, child: any[] | VNode[]): HTMLElement | Node | AnyObject {
    if (isString(tag)) tag = selectDom(tag);
    if (!tag) return tag;
    if (isArray(child)) {
        child.forEach(item => {
            if (item) {
                if (isObject(item) && item.tag) {
                    tag.appendChild(createDom(item));
                } else {
                    tag.appendChild(item);
                }
            }
        })
    } else {
        tag.appendChild(child);
    }
    return tag;
}
/**
 * @description: get current dom childNode
 * @param {AnyObject|HTMLElement|Node} tag
 * @param {string} child
 * @return { Node[]|HTMLElement[]|any[]}
 * @Date: 2021-08-24 10:29:10
 * @author: Pat
 */
export function getChildNode(tag: AnyObject | HTMLElement | Node | string, child: string | string[] | null = null): Node[] | HTMLElement[] | any[] {
    if (isString(tag)) tag = selectDom(tag);
    if (!tag) return tag;
    const childNodes = tag.childNodes || [];
    const currentNodes: any[] = [];
    if (!child) return childNodes;
    if (!isArray(child)) child = [child];
    child.length > 0 && childNodes.forEach((item: AnyObject) => {
        if (child) {
            for (let i = 0, len = child.length; i < len; i++) {
                const element: any = child[i];
                if (element.charAt(0) === '.') {
                    if (item.classList.includes(element.slice(1))) {
                        currentNodes.push(item);
                    }
                } else if (element.charAt(0) === '#') {
                    if (item.id === element.slice(1)) {
                        currentNodes.push(item);
                    }
                } else if (item.tagName.toLocaleUpperCase() === element.toLocaleUpperCase()) {
                    currentNodes.push(item);
                }
            }
        }
    })
    return currentNodes;
}

/**
 * @description: set current dom transsfrom style
 * @param {HTMLElement} tag
 * @param {string} value
 * @Date: 2021-08-24 10:30:22
 * @author: Pat
 */
export function setTransform(tag: HTMLElement | string, value: string) {
    if (isString(tag)) tag = selectDom(tag);
    if (!tag) return tag;
    tag.style.transform = value;
};

// Feature detection for {passive: false} support in add/removeEventListener.
let passiveSupported = false;
try {
    // https://github.com/facebook/flow/issues/285
    // $FlowFixMe
    const options = Object.defineProperty({}, "passive", {
        get() { // eslint-disable-line
            passiveSupported = true;
        }
    });
    win.addEventListener("test", options, options);
    win.removeEventListener("test", options, options);
} catch (err) {
    passiveSupported = false;
};
/**
 * @description: Bind events to the current dom node
 * @param {any} target
 * @param {string} type
 * @param {Function} callback
 * @param {object} options
 * @Date: 2021-08-24 10:30:56
 * @author: Pat
 */
export function addListener(target: any, type: string, callback: Function, options: { passive?: boolean, capture?: boolean } = {}) {
    if (isString(target)) target = selectDom(target);
    if (!target) return target;
    if ('passive' in options && passiveSupported) {
        target.addEventListener(type, callback, options);
    } else {
        target.addEventListener(type, callback, options.capture);
    }
};
/**
 * @description: Remove events to the current dom node
 * @param {any} target
 * @param {string} type
 * @param {Function} callback
 * @param {object} options
 * @Date: 2021-08-24 10:31:34
 * @author: Pat
 */
export function removeListener(target: any, type: string, callback: Function, options: { passive?: boolean, capture?: boolean } = {}) {
    if (isString(target)) target = selectDom(target);
    if (!target) return target;
    if ('passive' in options && passiveSupported) {
        target.removeEventListener(type, callback, options);
    } else {
        target.removeEventListener(type, callback, options.capture);
    }
};
/**
 * @description: Remove current node
 * @param {HTMLElement} node
 * @Date: 2021-08-24 10:31:58
 * @author: Pat
 */
export function remove(node: HTMLElement | string) {
    if (isString(node)) node = selectDom(node);
    if (!node) return node;
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
/**
 * @description: set current node attrs
 * @param {HTMLElement} node
 * @param {AnyObject} attrs
 * @Date: 2021-08-24 11:06:16
 * @author: Pat
 */
export function setAttr(node: any, attrs: AnyObject = {}) {
    if (isString(node)) node = selectDom(node);
    if (!node) return node;
    objectEach(attrs, (item: any, key: string) => {
        if (key === 'style') {
            setStyle(node, item);
        } else {
            if (['class', 'className'].includes(key)) {
                setClass(node, item);
            } else {
                if (getAttr(node, key)) {
                    node.setAttribute(key, item);
                } else {
                    node[key] = item;
                }
            }
        }
    });
}
/**
 * @description: get current node attrs
 * @param {HTMLElement} node
 * @param {AnyObject} attrName
 * @return {*}
 * @Date: 2021-08-24 11:06:16
 * @author: Pat
 */
export function getAttr(node: HTMLElement | any, attrName?: string[] | string | any): any {
    if (isString(node)) node = selectDom(node);
    if (!node) return node;
    if (!attrName) {
        const attrs: { [k: string]: any } = {};
        each(node.getAttributeNames(), (key: string) => attrs[key] = node.getAttribute(key));
        return attrs
    }
    if (!isArray(attrName)) attrName = [attrName];
    const currentAttrs: any[] = [];
    each(attrName, (item: string) => currentAttrs.push((node as HTMLElement).getAttribute(item)))
    return currentAttrs.length === 1 ? currentAttrs[0] : currentAttrs;
};
Dom.append = append;
Dom.getChildNode = getChildNode;
Dom.setTransform = setTransform;
Dom.setStyle = setStyle;
Dom.setClass = Dom.addClass = setClass;
Dom.removeClass = removeClass;
Dom.addListener = addListener;
Dom.removeListener = removeListener;
Dom.remove = remove;
Dom.createTextNode = createTextNode;
Dom.createDom = createDom;
Dom.setAttr = setAttr;
Dom.getAttr = getAttr;
Dom.htmlStringToVNode = htmlStringToVNode;
export default Dom;