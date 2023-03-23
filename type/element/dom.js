import { isArray, isFunction, isObject, isString, each, objectEach } from "../libs";
const Dom = {};
const win = window || globalThis;
export const loadRes = function (url, t, fn = () => { }) {
    let ref;
    if (['js', 'javascript'].includes(t)) {
        ref = createDom({
            tag: 'script',
            attrs: {
                type: 'text/javascript',
                src: url
            }
        });
    }
    else if (t === 'css') {
        ref = createDom({
            tga: 'link',
            attrs: {
                rel: 'stylesheet',
                type: 'text/css',
                href: url
            }
        });
    }
    else if (t === 'style') {
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
            typeof fn === 'function' && fn();
        };
    }
};
export function selectDom(tag) {
    let stor = document.querySelectorAll(tag);
    stor = stor.length > 1 ? stor : stor.length > 0 ? stor[0] : stor;
    return stor;
}
export function isVNode({ tag }) {
    return !(!tag);
}
export function createTextNode(text) {
    if (text)
        return document.createTextNode(text);
    return null;
}
export function htmlStringToVNode(html) {
    let jsx = { tag: '', attrs: {}, children: [] };
    const toVNode = (html, currentJSX) => {
        const doc = isString(html) ? document.createElement('div') : html;
        isString(html) && (doc.innerHTML = html);
        const docchildNodes = doc.childNodes;
        currentJSX.tag = doc.tagName;
        if (doc.attributes)
            Object.entries(doc.attributes).forEach(([index, { name, value }]) => (currentJSX.attrs[name] = value));
        for (let i = 0, len = docchildNodes.length; i < len; i++) {
            const { tagName, attributes, nodeType, textContent } = docchildNodes[i];
            const cjsx = { tag: tagName, attrs: {}, children: [] };
            if (attributes)
                Object.entries(attributes).forEach(([index, { name, value }]) => (cjsx.attrs[name] = value));
            if (nodeType === 3) {
                if (textContent && textContent.replace(/[\r\n\s]/g, "")) {
                    currentJSX.children.push(textContent);
                }
            }
            else {
                currentJSX.children.push(cjsx);
                toVNode(docchildNodes[i], cjsx);
            }
        }
        ;
        return currentJSX;
    };
    toVNode(html, jsx);
    return jsx;
}
export function createDom(vnode, container) {
    let dom;
    if (isString(vnode)) {
        return createTextNode(vnode);
    }
    else if (vnode instanceof Element) {
        return vnode;
    }
    else if (isFunction(vnode)) {
        if (vnode.tag.toString().startsWith("class ")) {
            let obj = new vnode.tag();
            return createDom(obj.render());
        }
        return createDom(vnode.tag());
    }
    else {
        if (isObject(vnode)) {
            dom = document.createElement(vnode.tag);
        }
        else {
            return vnode;
        }
    }
    ;
    const { attrs, children } = vnode;
    setAttr(dom, attrs);
    children && children.forEach((child) => {
        let iChild = child.element ? child.element : child;
        const childIsArray = (subiChild) => {
            if (isArray(subiChild)) {
                subiChild.forEach((subChild) => childIsArray(subChild));
            }
            else {
                dom && dom.appendChild && dom.appendChild(createDom(subiChild));
            }
        };
        childIsArray(iChild);
    });
    vnode.element = dom;
    if (isString(container))
        container = selectDom(container);
    container && append(container, dom);
    return vnode.element;
}
;
export function setStyle(tag, style) {
    if (isString(tag))
        tag = selectDom(tag);
    if (!tag)
        return tag;
    if (isString(style)) {
        tag.style = style;
    }
    else {
        if (isObject(style)) {
            objectEach(style, (item, key) => {
                tag.style[key] = item;
            });
        }
    }
    return tag;
}
;
export function setClass(tag, clas) {
    if (isString(tag))
        tag = selectDom(tag);
    if (!tag)
        return tag;
    const rmClass = [];
    if (typeof clas === 'string') {
        clas = clas.split(' ');
    }
    else if (isObject(clas)) {
        const nClas = [];
        objectEach(clas, (item, key) => {
            if (item) {
                nClas.push(key);
            }
            else {
                rmClass.push(key);
            }
            ;
        });
        clas = [...nClas];
    }
    ;
    if (!isArray(clas)) {
        return tag;
    }
    else {
        const domClassList = tag.classList;
        clas.forEach((item) => {
            if (!domClassList.contains(item)) {
                domClassList.add(item);
            }
            else if (rmClass.includes(item)) {
                domClassList.remove(item);
            }
        });
    }
    return tag;
}
;
export const addClass = setClass;
export function removeClass(tag, clas) {
    if (isString(tag))
        tag = selectDom(tag);
    if (!tag)
        return tag;
    const domClassList = tag.classList;
    let rmClass = [];
    if (typeof clas === 'string') {
        rmClass = [...clas.split(' ')];
    }
    else if (isObject(clas)) {
        const nClas = [];
        objectEach(clas, (item, key) => {
            if (!item) {
                rmClass.push(key);
            }
            ;
        });
        rmClass = [...nClas];
    }
    ;
    if (!isArray(rmClass)) {
        return tag;
    }
    else {
        rmClass.forEach((item) => {
            domClassList.remove(item);
        });
    }
    return tag;
}
;
export function append(tag, child) {
    if (isString(tag))
        tag = selectDom(tag);
    if (!tag)
        return tag;
    if (isArray(child)) {
        child.forEach(item => {
            if (item) {
                if (isObject(item) && item.tag) {
                    tag.appendChild(createDom(item));
                }
                else {
                    tag.appendChild(item);
                }
            }
        });
    }
    else {
        tag.appendChild(child);
    }
    return tag;
}
export function getChildNode(tag, child = null) {
    if (isString(tag))
        tag = selectDom(tag);
    if (!tag)
        return tag;
    const childNodes = tag.childNodes || [];
    const currentNodes = [];
    if (!child)
        return childNodes;
    if (!isArray(child))
        child = [child];
    child.length > 0 && childNodes.forEach((item) => {
        if (child) {
            for (let i = 0, len = child.length; i < len; i++) {
                const element = child[i];
                if (element.charAt(0) === '.') {
                    if (item.classList.includes(element.slice(1))) {
                        currentNodes.push(item);
                    }
                }
                else if (element.charAt(0) === '#') {
                    if (item.id === element.slice(1)) {
                        currentNodes.push(item);
                    }
                }
                else if (item.tagName.toLocaleUpperCase() === element.toLocaleUpperCase()) {
                    currentNodes.push(item);
                }
            }
        }
    });
    return currentNodes;
}
export function setTransform(tag, value) {
    if (isString(tag))
        tag = selectDom(tag);
    if (!tag)
        return tag;
    tag.style.transform = value;
}
;
let passiveSupported = false;
try {
    const options = Object.defineProperty({}, "passive", {
        get() {
            passiveSupported = true;
        }
    });
    win.addEventListener("test", options, options);
    win.removeEventListener("test", options, options);
}
catch (err) {
    passiveSupported = false;
}
;
export function addListener(target, type, callback, options = {}) {
    if (isString(target))
        target = selectDom(target);
    if (!target)
        return target;
    if ('passive' in options && passiveSupported) {
        target.addEventListener(type, callback, options);
    }
    else {
        target.addEventListener(type, callback, options.capture);
    }
}
;
export function removeListener(target, type, callback, options = {}) {
    if (isString(target))
        target = selectDom(target);
    if (!target)
        return target;
    if ('passive' in options && passiveSupported) {
        target.removeEventListener(type, callback, options);
    }
    else {
        target.removeEventListener(type, callback, options.capture);
    }
}
;
export function remove(node) {
    if (isString(node))
        node = selectDom(node);
    if (!node)
        return node;
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
export function setAttr(node, attrs = {}) {
    if (isString(node))
        node = selectDom(node);
    if (!node)
        return node;
    objectEach(attrs, (item, key) => {
        if (key === 'style') {
            setStyle(node, item);
        }
        else {
            if (['class', 'className'].includes(key)) {
                setClass(node, item);
            }
            else {
                if (getAttr(node, key)) {
                    node.setAttribute(key, item);
                }
                else {
                    node[key] = item;
                }
            }
        }
    });
}
export function getAttr(node, attrName) {
    if (isString(node))
        node = selectDom(node);
    if (!node)
        return node;
    if (!attrName) {
        const attrs = {};
        each(node.getAttributeNames(), (key) => attrs[key] = node.getAttribute(key));
        return attrs;
    }
    if (!isArray(attrName))
        attrName = [attrName];
    const currentAttrs = [];
    each(attrName, (item) => currentAttrs.push(node.getAttribute(item)));
    return currentAttrs.length === 1 ? currentAttrs[0] : currentAttrs;
}
;
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
