define(["exports","./dom","metal/src/metal"],function(e,n,t){"use strict";function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),r=function(){function e(){a(this,e)}return i(e,null,[{key:"checkAnimationEventName",value:function(){return void 0===e.animationEventName_&&(e.animationEventName_={animation:e.checkAnimationEventName_("animation"),transition:e.checkAnimationEventName_("transition")}),e.animationEventName_}},{key:"checkAnimationEventName_",value:function(n){var a=["Webkit","MS","O",""],i=t.string.replaceInterval(n,0,1,n.substring(0,1).toUpperCase()),r=[i+"End",i+"End",i+"End",n+"end"];e.animationElement_||(e.animationElement_=document.createElement("div"));for(var o=0;o<a.length;o++)if(void 0!==e.animationElement_.style[a[o]+i])return a[o].toLowerCase()+r[o];return n+"end"}},{key:"checkAttrOrderChange",value:function(){if(void 0===e.attrOrderChange_){var t='<div data-component="" data-ref=""></div>',a=document.createElement("div");(0,n.append)(a,t),e.attrOrderChange_=t!==a.innerHTML}return e.attrOrderChange_}}]),e}();r.animationElement_=void 0,r.animationEventName_=void 0,r.attrOrderChange_=void 0,e["default"]=r});