import clsName from 'classnames';

/** classnames return undefined if length < 1 for prevent react render class="" */
export function Cx(){
  return clsName.apply(null, arguments) || undefined;
}

/** === Type checking === */
export const isStr = v => typeof v === 'string' || v instanceof String;
export const isObj = v => v && typeof v === 'object' && v.constructor === Object;
export const isFunc = v => v && typeof v === 'function';
export const isBool = v => typeof v === "boolean";
export const isNum = v => typeof v === "number" && !isNaN(v);
/** === END Type checking === */

export function omit(obj, omitKeys){
  let res = {};
  Object.keys(obj).forEach(k => {
    if(omitKeys.indexOf(k) === -1) res[k] = obj[k];
  });
  return res;
}

/** == dom function === */
export const domQ = (q, dom = document) => dom.querySelector(q);
export const domQall = (q, dom = document) => dom.querySelectorAll(q);

/** @USAGE:
	add = setClass(element, "btn active");
	remove = setClass(element, "btn active", 'remove'); */
export function setClass(el, c, fn = "add"){
  // let cls = c.split(" ");
  el.classList[fn](...c.split(" "));// ...cls
}
export const hasClass = (el, c) => el.classList.contains(c);

export function hasAttr(el, a) {
	if (el && a) return el.hasAttribute(a);
	return false;
}
export const getAttr = (el, a) => el.getAttribute(a);
/**
	@el 	: DOM element / node
	@attr : valid attribute name & value (Object)
*/
export function setAttr(el, attr){
	if(el){
		if(isObj(attr)){
			for(let key in attr){
				el.setAttribute(key, attr[key]);
			}
		}
		else if(isStr(attr)) attr.split(" ").forEach(v => el.removeAttribute(v));
		else console.warn('setAttr() : params 2 required Object to add / string to remove, To remove several attributes, separate the attribute names with a space.');
	}
}
/** === END dom function === */

export const debounce = (callback, delay = 250) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay)
  }
}

export const getParam = (key) => new URLSearchParams(window.location.search).get(key);
