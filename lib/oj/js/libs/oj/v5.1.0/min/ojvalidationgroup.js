/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","ojs/ojcomponentcore"],function(n){var e={properties:{valid:{type:"string",enumValues:["valid","invalidShown","invalidHidden","pending"],readOnly:!0,writeback:!0}},methods:{focusOn:{},showMessages:{}},extension:{_CONSTRUCTOR:function(e){var t,i=this,o=e.element,r=[];function a(){r=[],function n(e){var t;var i;var o;var a;var d=[];i=e.childNodes;a=i.length;for(o=0;o<a;o++)t=i[o],f(t)?r.push(t):d.push(t);a=d.length;for(o=0;o<a;o++)n(d[o])}(o),e.props.valid=v();for(var n=r.length,t=0;t<n;t++)d(r[t])}function d(n){n.addEventListener("validChanged",l.bind(this)),n.addEventListener("disabledChanged",u.bind(this)),n.addEventListener("readonlyChanged",u.bind(this))}function s(n){n.removeEventListener("validChanged",l),n.removeEventListener("disabledChanged",u),n.removeEventListener("readonlyChanged",u)}function l(n){e.props.valid=v()}function u(n){var t=n.target,i=t.valid,o=!(t.readonly||t.disabled);"valid"!==i&&(e.props.valid=o&&"invalidShown"===i?"invalidShown":v())}function v(){for(var n,e,t,i,o="valid",a=r.length,d=0;d<a&&"invalidShown"!==o;d++)p(n=r[d])&&(t=n.valid,e=n.disabled,i=n.readonly,e||i||("invalidShown"===t?o="invalidShown":"invalidHidden"===t?o="invalidHidden":"pending"===t&&"valid"===o&&(o="pending")));return o}function f(n){return!!(1===n.nodeType&&-1!==n.tagName.indexOf("-")&&"valid"in n&&p(n)&&void 0!==n.valid)}function c(n,e){var t=e.length;if(f(n))return!0;for(var i=0;i<t;i++)if(f(e[i]))return!0;return!1}function h(n){var e=r.length;if(1!==n.nodeType)return!1;for(var t=0;t<e;t++)if(r[t].contains(n))return!0;return!1}function g(n){for(var e,t=r.length,i=0;i<n.length;i++)if(1===(e=n[i]).nodeType){if(-1!==r.indexOf(e))return!0;for(var o=0;o<t;o++)if(e.contains(r[o]))return!0}return!1}function p(e){var t,i,o;return t=n.BaseCustomElementBridge.getInstance(e),void 0!==(i=t._WIDGET_ELEM)&&(o=n.Components.__GetWidgetConstructor(i)),!(void 0!==i&&!o)}i._rootElementMutationObserver=new MutationObserver(function(n){if(document.body.contains(o)){for(var e,t,i,r,d=n.length,l=!1,u=0;u<d&&!l;u++)t=n[u],r=t.target,i=t.removedNodes,e=t.addedNodes,!(l=g(i))&&e.length>0&&!h(r)&&c(r,e)&&(l=!0);l&&(!function(n){for(var e=n.length,t=0;t<e;t++)for(var i=n[t],o=i.removedNodes.length,r=0;r<o;r++){var a=i.removedNodes[r];1===a.nodeType&&s(a)}}(n),a())}else this.disconnect()}),i.createDOM=function(){for(o.classList.add("oj-validation-group"),(t=document.createElement("div")).setAttribute("data-oj-context","");o.firstChild;)t.appendChild(o.firstChild);o.appendChild(t)},i.updateDOM=function(){var e=n.Context.getContext(t).getBusyContext();e.whenReady().then(function(){for(var n=r.length,e=0;e<n;e++)s(r[e]);a(),i._rootElementMutationObserver.observe(o,{childList:!0,subtree:!0})})},i.handlePropertyChanged=function(n,e){return!0},i.showMessages=function(){for(var n,e=0;e<r.length;e++)(n=r[e]).disabled||n.readonly||"showMessages"in n&&n.showMessages()},i.focusOn=function(e){var t=null,i=null;"@firstInvalidShown"===e?(i=function(){var n,e=[];if("invalidShown"!==o.valid)return null;for(var t=r.length,i=0;i<t;i++)(n=r[i]).disabled||n.readonly||"invalidShown"===n.valid&&e.push(n);if(0===e.length)return null;return e.sort(function(n,e){return n.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1}),e[0]}())&&("focusOn"in i?i.focusOn("@firstInvalidShown"):i.focus()):void 0===e?(t=function(){for(var n=null,e=r.length,t=0;t<e;t++)if(!(n=r[t]).readonly&&!n.disabled)return n;return null}())&&("focusOn"in t?t.focusOn():t.focus()):n.Logger.info("focusOn's parameter value is not '@firstInvalidShown' or empty, so it's a no-op.")}}}};Object.freeze(e),n.CustomElementBridge.registerMetadata("oj-validation-group",null,e),n.CustomElementBridge.register("oj-validation-group",{metadata:n.CustomElementBridge.getMetadata("oj-validation-group")})});