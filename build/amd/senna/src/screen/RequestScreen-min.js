define(["exports","metal/src/metal","metal-ajax/src/Ajax","metal-structs/src/all/structs","metal-promise/src/promise/Promise","../errors/errors","../utils/utils","../globals/globals","./Screen","metal-uri/src/Uri","metal-useragent/src/UA"],function(e,t,r,a,u,o,n,i,s,l,f){"use strict";function d(e){return e&&e.__esModule?e:{"default":e}}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function h(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var m=d(r),y=d(u),v=d(o),E=d(n),b=d(i),R=d(s),S=d(l),g=d(f),P=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),T=function(e){function r(){c(this,r);var e=p(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));return e.cacheable=!0,e.httpHeaders={"X-PJAX":"true","X-Requested-With":"XMLHttpRequest"},e.httpMethod=r.GET,e.request=null,e.timeout=3e4,e}return h(r,e),P(r,[{key:"assertValidResponseStatusCode",value:function(e){if(!this.isValidResponseStatusCode(e)){var t=new Error(v["default"].INVALID_STATUS);throw t.invalidStatus=!0,t.statusCode=e,t}}},{key:"beforeUpdateHistoryPath",value:function(e){var t=this.getRequestPath();return t&&t!==e?t:e}},{key:"beforeUpdateHistoryState",value:function(e){return e.senna&&e.form&&e.redirectPath===e.path?null:e}},{key:"formatLoadPath",value:function(e){var t=new S["default"](e);return t.setHostname(b["default"].window.location.hostname),t.setProtocol(b["default"].window.location.protocol),b["default"].window.location.port&&t.setPort(b["default"].window.location.port),g["default"].isIeOrEdge&&this.httpMethod===r.GET?t.makeUnique().toString():t.toString()}},{key:"getHttpHeaders",value:function(){return this.httpHeaders}},{key:"getHttpMethod",value:function(){return this.httpMethod}},{key:"getRequestPath",value:function(){var e=this.getRequest();if(e){var t=e.requestPath,a=this.maybeExtractResponseUrlFromRequest(e);return a&&(t=a),g["default"].isIeOrEdge&&this.httpMethod===r.GET&&(t=new S["default"](t).removeUnique().toString()),E["default"].getUrlPath(t)}return null}},{key:"getRequest",value:function(){return this.request}},{key:"getTimeout",value:function(){return this.timeout}},{key:"isValidResponseStatusCode",value:function(e){return e>=200&&e<=399}},{key:"load",value:function(e){var u=this,o=this.getCache();if((0,t.isDefAndNotNull)(o))return y["default"].resolve(o);var n=null,i=this.httpMethod,s=new a.MultiMap;Object.keys(this.httpHeaders).forEach(function(e){return s.add(e,u.httpHeaders[e])}),b["default"].capturedFormElement&&(this.addSafariXHRPolyfill(),n=new FormData(b["default"].capturedFormElement),this.maybeAppendSubmitButtonValue_(n),i=r.POST,g["default"].isIeOrEdge&&s.add("If-None-Match",'"0"'));var l=this.formatLoadPath(e);return m["default"].request(l,i,n,s,null,this.timeout).then(function(e){return u.removeSafariXHRPolyfill(),u.setRequest(e),u.assertValidResponseStatusCode(e.status),i===r.GET&&u.isCacheable()&&u.addCache(e.responseText),e.requestPath=l,e.responseText})["catch"](function(e){switch(u.removeSafariXHRPolyfill(),e.message){case v["default"].REQUEST_TIMEOUT:e.timeout=!0;break;case v["default"].REQUEST_ERROR:e.requestError=!0;break;case v["default"].REQUEST_PREMATURE_TERMINATION:e.requestError=!0,e.requestPrematureTermination=!0}throw e})}},{key:"maybeAppendSubmitButtonValue_",value:function(e){var t=b["default"].capturedFormButtonElement;t&&t.name&&e.append(t.name,t.value)}},{key:"maybeExtractResponseUrlFromRequest",value:function(e){var t=e.responseURL;return t?t:e.getResponseHeader(r.X_REQUEST_URL_HEADER)}},{key:"addSafariXHRPolyfill",value:function(){if(b["default"].capturedFormElement&&g["default"].isSafari)for(var e=b["default"].capturedFormElement.querySelectorAll('input[type="file"]:not([disabled])'),t=0;t<e.length;t++){var r=e[t];if(r.files.length>0)return;r.setAttribute("data-safari-temp-disabled","true"),r.setAttribute("disabled","")}}},{key:"removeSafariXHRPolyfill",value:function(){if(b["default"].capturedFormElement&&g["default"].isSafari)for(var e=b["default"].capturedFormElement.querySelectorAll('input[type="file"][data-safari-temp-disabled]'),t=0;t<e.length;t++){var r=e[t];r.removeAttribute("data-safari-temp-disabled"),r.removeAttribute("disabled")}}},{key:"setHttpHeaders",value:function(e){this.httpHeaders=e}},{key:"setHttpMethod",value:function(e){this.httpMethod=e.toLowerCase()}},{key:"setRequest",value:function(e){this.request=e}},{key:"setTimeout",value:function(e){this.timeout=e}}]),r}(R["default"]);T.GET="get",T.POST="post",T.X_REQUEST_URL_HEADER="X-Request-URL",e["default"]=T});