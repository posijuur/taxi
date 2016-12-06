/*! jCarousel - v0.3.3 - 2015-04-07
* http://sorgalla.com/jcarousel/
* Copyright (c) 2006-2015 Jan Sorgalla; Licensed MIT */
!function(a){"use strict";var b=a.jCarousel={};b.version="0.3.3";var c=/^([+\-]=)?(.+)$/;b.parseTarget=function(a){var b=!1,d="object"!=typeof a?c.exec(a):null;return d?(a=parseInt(d[2],10)||0,d[1]&&(b=!0,"-="===d[1]&&(a*=-1))):"object"!=typeof a&&(a=parseInt(a,10)||0),{target:a,relative:b}},b.detectCarousel=function(a){for(var b;a.length>0;){if(b=a.filter("[data-jcarousel]"),b.length>0)return b;if(b=a.find("[data-jcarousel]"),b.length>0)return b;a=a.parent()}return null},b.base=function(c){return{version:b.version,_options:{},_element:null,_carousel:null,_init:a.noop,_create:a.noop,_destroy:a.noop,_reload:a.noop,create:function(){return this._element.attr("data-"+c.toLowerCase(),!0).data(c,this),!1===this._trigger("create")?this:(this._create(),this._trigger("createend"),this)},destroy:function(){return!1===this._trigger("destroy")?this:(this._destroy(),this._trigger("destroyend"),this._element.removeData(c).removeAttr("data-"+c.toLowerCase()),this)},reload:function(a){return!1===this._trigger("reload")?this:(a&&this.options(a),this._reload(),this._trigger("reloadend"),this)},element:function(){return this._element},options:function(b,c){if(0===arguments.length)return a.extend({},this._options);if("string"==typeof b){if("undefined"==typeof c)return"undefined"==typeof this._options[b]?null:this._options[b];this._options[b]=c}else this._options=a.extend({},this._options,b);return this},carousel:function(){return this._carousel||(this._carousel=b.detectCarousel(this.options("carousel")||this._element),this._carousel||a.error('Could not detect carousel for plugin "'+c+'"')),this._carousel},_trigger:function(b,d,e){var f,g=!1;return e=[this].concat(e||[]),(d||this._element).each(function(){f=a.Event((c+":"+b).toLowerCase()),a(this).trigger(f,e),f.isDefaultPrevented()&&(g=!0)}),!g}}},b.plugin=function(c,d){var e=a[c]=function(b,c){this._element=a(b),this.options(c),this._init(),this.create()};return e.fn=e.prototype=a.extend({},b.base(c),d),a.fn[c]=function(b){var d=Array.prototype.slice.call(arguments,1),f=this;return this.each("string"==typeof b?function(){var e=a(this).data(c);if(!e)return a.error("Cannot call methods on "+c+' prior to initialization; attempted to call method "'+b+'"');if(!a.isFunction(e[b])||"_"===b.charAt(0))return a.error('No such method "'+b+'" for '+c+" instance");var g=e[b].apply(e,d);return g!==e&&"undefined"!=typeof g?(f=g,!1):void 0}:function(){var d=a(this).data(c);d instanceof e?d.reload(b):new e(this,b)}),f},e}}(jQuery),function(a,b){"use strict";var c=function(a){return parseFloat(a)||0};a.jCarousel.plugin("jcarousel",{animating:!1,tail:0,inTail:!1,resizeTimer:null,lt:null,vertical:!1,rtl:!1,circular:!1,underflow:!1,relative:!1,_options:{list:function(){return this.element().children().eq(0)},items:function(){return this.list().children()},animation:400,transitions:!1,wrap:null,vertical:null,rtl:null,center:!1},_list:null,_items:null,_target:a(),_first:a(),_last:a(),_visible:a(),_fullyvisible:a(),_init:function(){var a=this;return this.onWindowResize=function(){a.resizeTimer&&clearTimeout(a.resizeTimer),a.resizeTimer=setTimeout(function(){a.reload()},100)},this},_create:function(){this._reload(),a(b).on("resize.jcarousel",this.onWindowResize)},_destroy:function(){a(b).off("resize.jcarousel",this.onWindowResize)},_reload:function(){this.vertical=this.options("vertical"),null==this.vertical&&(this.vertical=this.list().height()>this.list().width()),this.rtl=this.options("rtl"),null==this.rtl&&(this.rtl=function(b){if("rtl"===(""+b.attr("dir")).toLowerCase())return!0;var c=!1;return b.parents("[dir]").each(function(){return/rtl/i.test(a(this).attr("dir"))?(c=!0,!1):void 0}),c}(this._element)),this.lt=this.vertical?"top":"left",this.relative="relative"===this.list().css("position"),this._list=null,this._items=null;var b=this.index(this._target)>=0?this._target:this.closest();this.circular="circular"===this.options("wrap"),this.underflow=!1;var c={left:0,top:0};return b.length>0&&(this._prepare(b),this.list().find("[data-jcarousel-clone]").remove(),this._items=null,this.underflow=this._fullyvisible.length>=this.items().length,this.circular=this.circular&&!this.underflow,c[this.lt]=this._position(b)+"px"),this.move(c),this},list:function(){if(null===this._list){var b=this.options("list");this._list=a.isFunction(b)?b.call(this):this._element.find(b)}return this._list},items:function(){if(null===this._items){var b=this.options("items");this._items=(a.isFunction(b)?b.call(this):this.list().find(b)).not("[data-jcarousel-clone]")}return this._items},index:function(a){return this.items().index(a)},closest:function(){var b,d=this,e=this.list().position()[this.lt],f=a(),g=!1,h=this.vertical?"bottom":this.rtl&&!this.relative?"left":"right";return this.rtl&&this.relative&&!this.vertical&&(e+=this.list().width()-this.clipping()),this.items().each(function(){if(f=a(this),g)return!1;var i=d.dimension(f);if(e+=i,e>=0){if(b=i-c(f.css("margin-"+h)),!(Math.abs(e)-i+b/2<=0))return!1;g=!0}}),f},target:function(){return this._target},first:function(){return this._first},last:function(){return this._last},visible:function(){return this._visible},fullyvisible:function(){return this._fullyvisible},hasNext:function(){if(!1===this._trigger("hasnext"))return!0;var a=this.options("wrap"),b=this.items().length-1,c=this.options("center")?this._target:this._last;return b>=0&&!this.underflow&&(a&&"first"!==a||this.index(c)<b||this.tail&&!this.inTail)?!0:!1},hasPrev:function(){if(!1===this._trigger("hasprev"))return!0;var a=this.options("wrap");return this.items().length>0&&!this.underflow&&(a&&"last"!==a||this.index(this._first)>0||this.tail&&this.inTail)?!0:!1},clipping:function(){return this._element["inner"+(this.vertical?"Height":"Width")]()},dimension:function(a){return a["outer"+(this.vertical?"Height":"Width")](!0)},scroll:function(b,c,d){if(this.animating)return this;if(!1===this._trigger("scroll",null,[b,c]))return this;a.isFunction(c)&&(d=c,c=!0);var e=a.jCarousel.parseTarget(b);if(e.relative){var f,g,h,i,j,k,l,m,n=this.items().length-1,o=Math.abs(e.target),p=this.options("wrap");if(e.target>0){var q=this.index(this._last);if(q>=n&&this.tail)this.inTail?"both"===p||"last"===p?this._scroll(0,c,d):a.isFunction(d)&&d.call(this,!1):this._scrollTail(c,d);else if(f=this.index(this._target),this.underflow&&f===n&&("circular"===p||"both"===p||"last"===p)||!this.underflow&&q===n&&("both"===p||"last"===p))this._scroll(0,c,d);else if(h=f+o,this.circular&&h>n){for(m=n,j=this.items().get(-1);m++<h;)j=this.items().eq(0),k=this._visible.index(j)>=0,k&&j.after(j.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(j),k||(l={},l[this.lt]=this.dimension(j),this.moveBy(l)),this._items=null;this._scroll(j,c,d)}else this._scroll(Math.min(h,n),c,d)}else if(this.inTail)this._scroll(Math.max(this.index(this._first)-o+1,0),c,d);else if(g=this.index(this._first),f=this.index(this._target),i=this.underflow?f:g,h=i-o,0>=i&&(this.underflow&&"circular"===p||"both"===p||"first"===p))this._scroll(n,c,d);else if(this.circular&&0>h){for(m=h,j=this.items().get(0);m++<0;){j=this.items().eq(-1),k=this._visible.index(j)>=0,k&&j.after(j.clone(!0).attr("data-jcarousel-clone",!0)),this.list().prepend(j),this._items=null;var r=this.dimension(j);l={},l[this.lt]=-r,this.moveBy(l)}this._scroll(j,c,d)}else this._scroll(Math.max(h,0),c,d)}else this._scroll(e.target,c,d);return this._trigger("scrollend"),this},moveBy:function(a,b){var d=this.list().position(),e=1,f=0;return this.rtl&&!this.vertical&&(e=-1,this.relative&&(f=this.list().width()-this.clipping())),a.left&&(a.left=d.left+f+c(a.left)*e+"px"),a.top&&(a.top=d.top+f+c(a.top)*e+"px"),this.move(a,b)},move:function(b,c){c=c||{};var d=this.options("transitions"),e=!!d,f=!!d.transforms,g=!!d.transforms3d,h=c.duration||0,i=this.list();if(!e&&h>0)return void i.animate(b,c);var j=c.complete||a.noop,k={};if(e){var l={transitionDuration:i.css("transitionDuration"),transitionTimingFunction:i.css("transitionTimingFunction"),transitionProperty:i.css("transitionProperty")},m=j;j=function(){a(this).css(l),m.call(this)},k={transitionDuration:(h>0?h/1e3:0)+"s",transitionTimingFunction:d.easing||c.easing,transitionProperty:h>0?function(){return f||g?"all":b.left?"left":"top"}():"none",transform:"none"}}g?k.transform="translate3d("+(b.left||0)+","+(b.top||0)+",0)":f?k.transform="translate("+(b.left||0)+","+(b.top||0)+")":a.extend(k,b),e&&h>0&&i.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",j),i.css(k),0>=h&&i.each(function(){j.call(this)})},_scroll:function(b,c,d){if(this.animating)return a.isFunction(d)&&d.call(this,!1),this;if("object"!=typeof b?b=this.items().eq(b):"undefined"==typeof b.jquery&&(b=a(b)),0===b.length)return a.isFunction(d)&&d.call(this,!1),this;this.inTail=!1,this._prepare(b);var e=this._position(b),f=this.list().position()[this.lt];if(e===f)return a.isFunction(d)&&d.call(this,!1),this;var g={};return g[this.lt]=e+"px",this._animate(g,c,d),this},_scrollTail:function(b,c){if(this.animating||!this.tail)return a.isFunction(c)&&c.call(this,!1),this;var d=this.list().position()[this.lt];this.rtl&&this.relative&&!this.vertical&&(d+=this.list().width()-this.clipping()),this.rtl&&!this.vertical?d+=this.tail:d-=this.tail,this.inTail=!0;var e={};return e[this.lt]=d+"px",this._update({target:this._target.next(),fullyvisible:this._fullyvisible.slice(1).add(this._visible.last())}),this._animate(e,b,c),this},_animate:function(b,c,d){if(d=d||a.noop,!1===this._trigger("animate"))return d.call(this,!1),this;this.animating=!0;var e=this.options("animation"),f=a.proxy(function(){this.animating=!1;var a=this.list().find("[data-jcarousel-clone]");a.length>0&&(a.remove(),this._reload()),this._trigger("animateend"),d.call(this,!0)},this),g="object"==typeof e?a.extend({},e):{duration:e},h=g.complete||a.noop;return c===!1?g.duration=0:"undefined"!=typeof a.fx.speeds[g.duration]&&(g.duration=a.fx.speeds[g.duration]),g.complete=function(){f(),h.call(this)},this.move(b,g),this},_prepare:function(b){var d,e,f,g,h=this.index(b),i=h,j=this.dimension(b),k=this.clipping(),l=this.vertical?"bottom":this.rtl?"left":"right",m=this.options("center"),n={target:b,first:b,last:b,visible:b,fullyvisible:k>=j?b:a()};if(m&&(j/=2,k/=2),k>j)for(;;){if(d=this.items().eq(++i),0===d.length){if(!this.circular)break;if(d=this.items().eq(0),b.get(0)===d.get(0))break;if(e=this._visible.index(d)>=0,e&&d.after(d.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(d),!e){var o={};o[this.lt]=this.dimension(d),this.moveBy(o)}this._items=null}if(g=this.dimension(d),0===g)break;if(j+=g,n.last=d,n.visible=n.visible.add(d),f=c(d.css("margin-"+l)),k>=j-f&&(n.fullyvisible=n.fullyvisible.add(d)),j>=k)break}if(!this.circular&&!m&&k>j)for(i=h;;){if(--i<0)break;if(d=this.items().eq(i),0===d.length)break;if(g=this.dimension(d),0===g)break;if(j+=g,n.first=d,n.visible=n.visible.add(d),f=c(d.css("margin-"+l)),k>=j-f&&(n.fullyvisible=n.fullyvisible.add(d)),j>=k)break}return this._update(n),this.tail=0,m||"circular"===this.options("wrap")||"custom"===this.options("wrap")||this.index(n.last)!==this.items().length-1||(j-=c(n.last.css("margin-"+l)),j>k&&(this.tail=j-k)),this},_position:function(a){var b=this._first,c=b.position()[this.lt],d=this.options("center"),e=d?this.clipping()/2-this.dimension(b)/2:0;return this.rtl&&!this.vertical?(c-=this.relative?this.list().width()-this.dimension(b):this.clipping()-this.dimension(b),c+=e):c-=e,!d&&(this.index(a)>this.index(b)||this.inTail)&&this.tail?(c=this.rtl&&!this.vertical?c-this.tail:c+this.tail,this.inTail=!0):this.inTail=!1,-c},_update:function(b){var c,d=this,e={target:this._target,first:this._first,last:this._last,visible:this._visible,fullyvisible:this._fullyvisible},f=this.index(b.first||e.first)<this.index(e.first),g=function(c){var g=[],h=[];b[c].each(function(){e[c].index(this)<0&&g.push(this)}),e[c].each(function(){b[c].index(this)<0&&h.push(this)}),f?g=g.reverse():h=h.reverse(),d._trigger(c+"in",a(g)),d._trigger(c+"out",a(h)),d["_"+c]=b[c]};for(c in b)g(c);return this}})}(jQuery,window),function(a){"use strict";a.jcarousel.fn.scrollIntoView=function(b,c,d){var e,f=a.jCarousel.parseTarget(b),g=this.index(this._fullyvisible.first()),h=this.index(this._fullyvisible.last());if(e=f.relative?f.target<0?Math.max(0,g+f.target):h+f.target:"object"!=typeof f.target?f.target:this.index(f.target),g>e)return this.scroll(e,c,d);if(e>=g&&h>=e)return a.isFunction(d)&&d.call(this,!1),this;for(var i,j=this.items(),k=this.clipping(),l=this.vertical?"bottom":this.rtl?"left":"right",m=0;;){if(i=j.eq(e),0===i.length)break;if(m+=this.dimension(i),m>=k){var n=parseFloat(i.css("margin-"+l))||0;m-n!==k&&e++;break}if(0>=e)break;e--}return this.scroll(e,c,d)}}(jQuery),function(a){"use strict";a.jCarousel.plugin("jcarouselControl",{_options:{target:"+=1",event:"click",method:"scroll"},_active:null,_init:function(){this.onDestroy=a.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",a.proxy(this._create,this))},this),this.onReload=a.proxy(this._reload,this),this.onEvent=a.proxy(function(b){b.preventDefault();var c=this.options("method");a.isFunction(c)?c.call(this):this.carousel().jcarousel(this.options("method"),this.options("target"))},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend",this.onReload),this._element.on(this.options("event")+".jcarouselcontrol",this.onEvent),this._reload()},_destroy:function(){this._element.off(".jcarouselcontrol",this.onEvent),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend",this.onReload)},_reload:function(){var b,c=a.jCarousel.parseTarget(this.options("target")),d=this.carousel();if(c.relative)b=d.jcarousel(c.target>0?"hasNext":"hasPrev");else{var e="object"!=typeof c.target?d.jcarousel("items").eq(c.target):c.target;b=d.jcarousel("target").index(e)>=0}return this._active!==b&&(this._trigger(b?"active":"inactive"),this._active=b),this}})}(jQuery),function(a){"use strict";a.jCarousel.plugin("jcarouselPagination",{_options:{perPage:null,item:function(a){return'<a href="#'+a+'">'+a+"</a>"},event:"click",method:"scroll"},_carouselItems:null,_pages:{},_items:{},_currentPage:null,_init:function(){this.onDestroy=a.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",a.proxy(this._create,this))},this),this.onReload=a.proxy(this._reload,this),this.onScroll=a.proxy(this._update,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend",this.onReload).on("jcarousel:scrollend",this.onScroll),this._reload()},_destroy:function(){this._clear(),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend",this.onReload).off("jcarousel:scrollend",this.onScroll),this._carouselItems=null},_reload:function(){var b=this.options("perPage");if(this._pages={},this._items={},a.isFunction(b)&&(b=b.call(this)),null==b)this._pages=this._calculatePages();else for(var c,d=parseInt(b,10)||0,e=this._getCarouselItems(),f=1,g=0;;){if(c=e.eq(g++),0===c.length)break;this._pages[f]=this._pages[f]?this._pages[f].add(c):c,g%d===0&&f++}this._clear();var h=this,i=this.carousel().data("jcarousel"),j=this._element,k=this.options("item"),l=this._getCarouselItems().length;a.each(this._pages,function(b,c){var d=h._items[b]=a(k.call(h,b,c));d.on(h.options("event")+".jcarouselpagination",a.proxy(function(){var a=c.eq(0);if(i.circular){var d=i.index(i.target()),e=i.index(a);parseFloat(b)>parseFloat(h._currentPage)?d>e&&(a="+="+(l-d+e)):e>d&&(a="-="+(d+(l-e)))}i[this.options("method")](a)},h)),j.append(d)}),this._update()},_update:function(){var b,c=this.carousel().jcarousel("target");a.each(this._pages,function(a,d){return d.each(function(){return c.is(this)?(b=a,!1):void 0}),b?!1:void 0}),this._currentPage!==b&&(this._trigger("inactive",this._items[this._currentPage]),this._trigger("active",this._items[b])),this._currentPage=b},items:function(){return this._items},reloadCarouselItems:function(){return this._carouselItems=null,this},_clear:function(){this._element.empty(),this._currentPage=null},_calculatePages:function(){for(var a,b,c=this.carousel().data("jcarousel"),d=this._getCarouselItems(),e=c.clipping(),f=0,g=0,h=1,i={};;){if(a=d.eq(g++),0===a.length)break;b=c.dimension(a),f+b>e&&(h++,f=0),f+=b,i[h]=i[h]?i[h].add(a):a}return i},_getCarouselItems:function(){return this._carouselItems||(this._carouselItems=this.carousel().jcarousel("items")),this._carouselItems}})}(jQuery),function(a,b){"use strict";var c,d,e={hidden:"visibilitychange",mozHidden:"mozvisibilitychange",msHidden:"msvisibilitychange",webkitHidden:"webkitvisibilitychange"};a.each(e,function(a,e){return"undefined"!=typeof b[a]?(c=a,d=e,!1):void 0}),a.jCarousel.plugin("jcarouselAutoscroll",{_options:{target:"+=1",interval:3e3,autostart:!0},_timer:null,_started:!1,_init:function(){this.onDestroy=a.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",a.proxy(this._create,this))},this),this.onAnimateEnd=a.proxy(this._start,this),this.onVisibilityChange=a.proxy(function(){b[c]?this._stop():this._start()},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy),a(b).on(d,this.onVisibilityChange),this.options("autostart")&&this.start()},_destroy:function(){this._stop(),this.carousel().off("jcarousel:destroy",this.onDestroy),a(b).off(d,this.onVisibilityChange)},_start:function(){return this._stop(),this._started?(this.carousel().one("jcarousel:animateend",this.onAnimateEnd),this._timer=setTimeout(a.proxy(function(){this.carousel().jcarousel("scroll",this.options("target"))},this),this.options("interval")),this):void 0},_stop:function(){return this._timer&&(this._timer=clearTimeout(this._timer)),this.carousel().off("jcarousel:animateend",this.onAnimateEnd),this},start:function(){return this._started=!0,this._start(),this},stop:function(){return this._started=!1,this._stop(),this}})}(jQuery,document);
/* jQuery Form Styler v1.7.3 | (c) Dimox | https://github.com/Dimox/jQueryFormStyler */
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):"object"===typeof exports?module.exports=b(require("jquery")):b(jQuery)})(function(b){function z(c,a){this.element=c;this.options=b.extend({},N,a);this.init()}function G(c){if(!b(c.target).parents().hasClass("jq-selectbox")&&"OPTION"!=c.target.nodeName&&b("div.jq-selectbox.opened").length){c=b("div.jq-selectbox.opened");var a=b("div.jq-selectbox__search input",c),f=b("div.jq-selectbox__dropdown",c);c.find("select").data("_"+
h).options.onSelectClosed.call(c);a.length&&a.val("").keyup();f.hide().find("li.sel").addClass("selected");c.removeClass("focused opened dropup dropdown")}}var h="styler",N={wrapper:"form",idSuffix:"-styler",filePlaceholder:"\u0424\u0430\u0439\u043b \u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",fileBrowse:"\u041e\u0431\u0437\u043e\u0440...",fileNumber:"\u0412\u044b\u0431\u0440\u0430\u043d\u043e \u0444\u0430\u0439\u043b\u043e\u0432: %s",selectPlaceholder:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435...",
selectSearch:!1,selectSearchLimit:10,selectSearchNotFound:"\u0421\u043e\u0432\u043f\u0430\u0434\u0435\u043d\u0438\u0439 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e",selectSearchPlaceholder:"\u041f\u043e\u0438\u0441\u043a...",selectVisibleOptions:0,singleSelectzIndex:"100",selectSmartPositioning:!0,onSelectOpened:function(){},onSelectClosed:function(){},onFormStyled:function(){}};z.prototype={init:function(){function c(){var b="",d="",c="",e="";void 0!==a.attr("id")&&""!==a.attr("id")&&
(b=' id="'+a.attr("id")+f.idSuffix+'"');void 0!==a.attr("title")&&""!==a.attr("title")&&(d=' title="'+a.attr("title")+'"');void 0!==a.attr("class")&&""!==a.attr("class")&&(c=" "+a.attr("class"));var l=a.data(),t;for(t in l)""!==l[t]&&"_styler"!==t&&(e+=" data-"+t+'="'+l[t]+'"');this.id=b+e;this.title=d;this.classes=c}var a=b(this.element),f=this.options,y=navigator.userAgent.match(/(iPad|iPhone|iPod)/i)&&!navigator.userAgent.match(/(Windows\sPhone)/i)?!0:!1,h=navigator.userAgent.match(/Android/i)&&
!navigator.userAgent.match(/(Windows\sPhone)/i)?!0:!1;if(a.is(":checkbox")){var z=function(){var f=new c,d=b("<div"+f.id+' class="jq-checkbox'+f.classes+'"'+f.title+'><div class="jq-checkbox__div"></div></div>');a.css({position:"absolute",zIndex:"-1",opacity:0,margin:0,padding:0}).after(d).prependTo(d);d.attr("unselectable","on").css({"-webkit-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","-o-user-select":"none","user-select":"none",display:"inline-block",position:"relative",
overflow:"hidden"});a.is(":checked")&&d.addClass("checked");a.is(":disabled")&&d.addClass("disabled");d.click(function(b){b.preventDefault();d.is(".disabled")||(a.is(":checked")?(a.prop("checked",!1),d.removeClass("checked")):(a.prop("checked",!0),d.addClass("checked")),a.focus().change())});a.closest("label").add('label[for="'+a.attr("id")+'"]').on("click.styler",function(a){b(a.target).is("a")||b(a.target).closest(d).length||(d.triggerHandler("click"),a.preventDefault())});a.on("change.styler",
function(){a.is(":checked")?d.addClass("checked"):d.removeClass("checked")}).on("keydown.styler",function(a){32==a.which&&d.click()}).on("focus.styler",function(){d.is(".disabled")||d.addClass("focused")}).on("blur.styler",function(){d.removeClass("focused")})};z();a.on("refresh",function(){a.off(".styler").parent().before(a).remove();z()})}else if(a.is(":radio")){var B=function(){var x=new c,d=b("<div"+x.id+' class="jq-radio'+x.classes+'"'+x.title+'><div class="jq-radio__div"></div></div>');a.css({position:"absolute",
zIndex:"-1",opacity:0,margin:0,padding:0}).after(d).prependTo(d);d.attr("unselectable","on").css({"-webkit-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","-o-user-select":"none","user-select":"none",display:"inline-block",position:"relative"});a.is(":checked")&&d.addClass("checked");a.is(":disabled")&&d.addClass("disabled");d.click(function(b){b.preventDefault();d.is(".disabled")||(d.closest(f.wrapper).find('input[name="'+a.attr("name")+'"]').prop("checked",!1).parent().removeClass("checked"),
a.prop("checked",!0).parent().addClass("checked"),a.focus().change())});a.closest("label").add('label[for="'+a.attr("id")+'"]').on("click.styler",function(a){b(a.target).is("a")||b(a.target).closest(d).length||(d.triggerHandler("click"),a.preventDefault())});a.on("change.styler",function(){a.parent().addClass("checked")}).on("focus.styler",function(){d.is(".disabled")||d.addClass("focused")}).on("blur.styler",function(){d.removeClass("focused")})};B();a.on("refresh",function(){a.off(".styler").parent().before(a).remove();
B()})}else if(a.is(":file")){a.css({position:"absolute",top:0,right:0,width:"100%",height:"100%",opacity:0,margin:0,padding:0});var C=function(){var x=new c,d=a.data("placeholder");void 0===d&&(d=f.filePlaceholder);var A=a.data("browse");if(void 0===A||""===A)A=f.fileBrowse;var e=b("<div"+x.id+' class="jq-file'+x.classes+'"'+x.title+' style="display: inline-block; position: relative; overflow: hidden"></div>'),l=b('<div class="jq-file__name">'+d+"</div>").appendTo(e);b('<div class="jq-file__browse">'+
A+"</div>").appendTo(e);a.after(e).appendTo(e);a.is(":disabled")&&e.addClass("disabled");a.on("change.styler",function(){var b=a.val();if(a.is("[multiple]")){var b="",c=a[0].files.length;0<c&&(b=a.data("number"),void 0===b&&(b=f.fileNumber),b=b.replace("%s",c))}l.text(b.replace(/.+[\\\/]/,""));""===b?(l.text(d),e.removeClass("changed")):e.addClass("changed")}).on("focus.styler",function(){e.addClass("focused")}).on("blur.styler",function(){e.removeClass("focused")}).on("click.styler",function(){e.removeClass("focused")})};
C();a.on("refresh",function(){a.off(".styler").parent().before(a).remove();C()})}else if(a.is('input[type="number"]')){var D=function(){var c=b('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>');a.after(c).prependTo(c).wrap('<div class="jq-number__field"></div>');a.is(":disabled")&&c.addClass("disabled");var d,f,e,l=null,t=null;void 0!==a.attr("min")&&(d=a.attr("min"));void 0!==a.attr("max")&&(f=a.attr("max"));e=void 0!==a.attr("step")&&
b.isNumeric(a.attr("step"))?Number(a.attr("step")):Number(1);var K=function(s){var c=a.val(),k;b.isNumeric(c)||(c=0,a.val("0"));s.is(".minus")?(k=parseInt(c,10)-e,0<e&&(k=Math.ceil(k/e)*e)):s.is(".plus")&&(k=parseInt(c,10)+e,0<e&&(k=Math.floor(k/e)*e));b.isNumeric(d)&&b.isNumeric(f)?k>=d&&k<=f&&a.val(k):b.isNumeric(d)&&!b.isNumeric(f)?k>=d&&a.val(k):!b.isNumeric(d)&&b.isNumeric(f)?k<=f&&a.val(k):a.val(k)};c.is(".disabled")||(c.on("mousedown","div.jq-number__spin",function(){var a=b(this);K(a);l=setTimeout(function(){t=
setInterval(function(){K(a)},40)},350)}).on("mouseup mouseout","div.jq-number__spin",function(){clearTimeout(l);clearInterval(t)}),a.on("focus.styler",function(){c.addClass("focused")}).on("blur.styler",function(){c.removeClass("focused")}))};D();a.on("refresh",function(){a.off(".styler").closest(".jq-number").before(a).remove();D()})}else if(a.is("select")){var M=function(){function x(a){a.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll",function(a){var c=null;"mousewheel"==a.type?
c=-1*a.originalEvent.wheelDelta:"DOMMouseScroll"==a.type&&(c=40*a.originalEvent.detail);c&&(a.stopPropagation(),a.preventDefault(),b(this).scrollTop(c+b(this).scrollTop()))})}function d(){for(var a=0;a<l.length;a++){var b=l.eq(a),c="",d="",e=c="",u="",p="",v="",w="",g="";b.prop("selected")&&(d="selected sel");b.is(":disabled")&&(d="disabled");b.is(":selected:disabled")&&(d="selected sel disabled");void 0!==b.attr("id")&&""!==b.attr("id")&&(e=' id="'+b.attr("id")+f.idSuffix+'"');void 0!==b.attr("title")&&
""!==l.attr("title")&&(u=' title="'+b.attr("title")+'"');void 0!==b.attr("class")&&(v=" "+b.attr("class"),g=' data-jqfs-class="'+b.attr("class")+'"');var h=b.data(),r;for(r in h)""!==h[r]&&(p+=" data-"+r+'="'+h[r]+'"');""!==d+v&&(c=' class="'+d+v+'"');c="<li"+g+p+c+u+e+">"+b.html()+"</li>";b.parent().is("optgroup")&&(void 0!==b.parent().attr("class")&&(w=" "+b.parent().attr("class")),c="<li"+g+p+' class="'+d+v+" option"+w+'"'+u+e+">"+b.html()+"</li>",b.is(":first-child")&&(c='<li class="optgroup'+
w+'">'+b.parent().attr("label")+"</li>"+c));t+=c}}function z(){var e=new c,s="",H=a.data("placeholder"),k=a.data("search"),h=a.data("search-limit"),u=a.data("search-not-found"),p=a.data("search-placeholder"),v=a.data("z-index"),w=a.data("smart-positioning");void 0===H&&(H=f.selectPlaceholder);if(void 0===k||""===k)k=f.selectSearch;if(void 0===h||""===h)h=f.selectSearchLimit;if(void 0===u||""===u)u=f.selectSearchNotFound;void 0===p&&(p=f.selectSearchPlaceholder);if(void 0===v||""===v)v=f.singleSelectzIndex;
if(void 0===w||""===w)w=f.selectSmartPositioning;var g=b("<div"+e.id+' class="jq-selectbox jqselect'+e.classes+'" style="display: inline-block; position: relative; z-index:'+v+'"><div class="jq-selectbox__select"'+e.title+' style="position: relative"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>');a.css({margin:0,padding:0}).after(g).prependTo(g);var L=b("div.jq-selectbox__select",g),r=b("div.jq-selectbox__select-text",
g),e=l.filter(":selected");d();k&&(s='<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="'+p+'"></div><div class="jq-selectbox__not-found">'+u+"</div>");var m=b('<div class="jq-selectbox__dropdown" style="position: absolute">'+s+'<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">'+t+"</ul></div>");g.append(m);var q=b("ul",m),n=b("li",m),E=b("input",m),A=b("div.jq-selectbox__not-found",m).hide();n.length<h&&E.parent().hide();""===
a.val()?r.text(H).addClass("placeholder"):r.text(e.text());var F=0,B=0;n.each(function(){var a=b(this);a.css({display:"inline-block"});a.innerWidth()>F&&(F=a.innerWidth(),B=a.width());a.css({display:""})});r.is(".placeholder")&&r.width()>F?r.width(r.width()):(s=g.clone().appendTo("body").width("auto"),k=s.outerWidth(),s.remove(),k==g.outerWidth()&&r.width(B));F>g.width()&&m.width(F);""===l.first().text()&&""!==a.data("placeholder")&&n.first().hide();a.css({position:"absolute",left:0,top:0,width:"100%",
height:"100%",opacity:0});var C=g.outerHeight(),I=E.outerHeight(),J=q.css("max-height"),s=n.filter(".selected");1>s.length&&n.first().addClass("selected sel");void 0===n.data("li-height")&&n.data("li-height",n.outerHeight());var D=m.css("top");"auto"==m.css("left")&&m.css({left:0});"auto"==m.css("top")&&m.css({top:C});m.hide();s.length&&(l.first().text()!=e.text()&&g.addClass("changed"),g.data("jqfs-class",s.data("jqfs-class")),g.addClass(s.data("jqfs-class")));if(a.is(":disabled"))return g.addClass("disabled"),
!1;L.click(function(){b("div.jq-selectbox").filter(".opened").length&&f.onSelectClosed.call(b("div.jq-selectbox").filter(".opened"));a.focus();if(!y){var c=b(window),d=n.data("li-height"),e=g.offset().top,k=c.height()-C-(e-c.scrollTop()),p=a.data("visible-options");if(void 0===p||""===p)p=f.selectVisibleOptions;var s=5*d,h=d*p;0<p&&6>p&&(s=h);0===p&&(h="auto");var p=function(){m.height("auto").css({bottom:"auto",top:D});var a=function(){q.css("max-height",Math.floor((k-20-I)/d)*d)};a();q.css("max-height",
h);"none"!=J&&q.css("max-height",J);k<m.outerHeight()+20&&a()},r=function(){m.height("auto").css({top:"auto",bottom:D});var a=function(){q.css("max-height",Math.floor((e-c.scrollTop()-20-I)/d)*d)};a();q.css("max-height",h);"none"!=J&&q.css("max-height",J);e-c.scrollTop()-20<m.outerHeight()+20&&a()};!0===w||1===w?k>s+I+20?(p(),g.removeClass("dropup").addClass("dropdown")):(r(),g.removeClass("dropdown").addClass("dropup")):(!1===w||0===w)&&k>s+I+20&&(p(),g.removeClass("dropup").addClass("dropdown"));
g.offset().left+m.outerWidth()>c.width()&&m.css({left:"auto",right:0});b("div.jqselect").css({zIndex:v-1}).removeClass("opened");g.css({zIndex:v});m.is(":hidden")?(b("div.jq-selectbox__dropdown:visible").hide(),m.show(),g.addClass("opened focused"),f.onSelectOpened.call(g)):(m.hide(),g.removeClass("opened dropup dropdown"),b("div.jq-selectbox").filter(".opened").length&&f.onSelectClosed.call(g));E.length&&(E.val("").keyup(),A.hide(),E.keyup(function(){var c=b(this).val();n.each(function(){b(this).html().match(RegExp(".*?"+
c+".*?","i"))?b(this).show():b(this).hide()});""===l.first().text()&&""!==a.data("placeholder")&&n.first().hide();1>n.filter(":visible").length?A.show():A.hide()}));n.filter(".selected").length&&(""===a.val()?q.scrollTop(0):(0!==q.innerHeight()/d%2&&(d/=2),q.scrollTop(q.scrollTop()+n.filter(".selected").position().top-q.innerHeight()/2+d)));x(q)}});n.hover(function(){b(this).siblings().removeClass("selected")});n.filter(".selected").text();n.filter(":not(.disabled):not(.optgroup)").click(function(){a.focus();
var c=b(this),d=c.text();if(!c.is(".selected")){var e=c.index(),e=e-c.prevAll(".optgroup").length;c.addClass("selected sel").siblings().removeClass("selected sel");l.prop("selected",!1).eq(e).prop("selected",!0);r.text(d);g.data("jqfs-class")&&g.removeClass(g.data("jqfs-class"));g.data("jqfs-class",c.data("jqfs-class"));g.addClass(c.data("jqfs-class"));a.change()}m.hide();g.removeClass("opened dropup dropdown");f.onSelectClosed.call(g)});m.mouseout(function(){b("li.sel",m).addClass("selected")});
a.on("change.styler",function(){r.text(l.filter(":selected").text()).removeClass("placeholder");n.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");l.first().text()!=n.filter(".selected").text()?g.addClass("changed"):g.removeClass("changed")}).on("focus.styler",function(){g.addClass("focused");b("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide()}).on("blur.styler",function(){g.removeClass("focused")}).on("keydown.styler keyup.styler",
function(b){var c=n.data("li-height");""===a.val()?r.text(H).addClass("placeholder"):r.text(l.filter(":selected").text());n.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");if(38==b.which||37==b.which||33==b.which||36==b.which)""===a.val()?q.scrollTop(0):q.scrollTop(q.scrollTop()+n.filter(".selected").position().top);40!=b.which&&39!=b.which&&34!=b.which&&35!=b.which||q.scrollTop(q.scrollTop()+n.filter(".selected").position().top-q.innerHeight()+c);13==
b.which&&(b.preventDefault(),m.hide(),g.removeClass("opened dropup dropdown"),f.onSelectClosed.call(g))}).on("keydown.styler",function(a){32==a.which&&(a.preventDefault(),L.click())});G.registered||(b(document).on("click",G),G.registered=!0)}function e(){var e=new c,f=b("<div"+e.id+' class="jq-select-multiple jqselect'+e.classes+'"'+e.title+' style="display: inline-block; position: relative"></div>');a.css({margin:0,padding:0}).after(f);d();f.append("<ul>"+t+"</ul>");var h=b("ul",f).css({position:"relative",
"overflow-x":"hidden","-webkit-overflow-scrolling":"touch"}),k=b("li",f).attr("unselectable","on"),e=a.attr("size"),y=h.outerHeight(),u=k.outerHeight();void 0!==e&&0<e?h.css({height:u*e}):h.css({height:4*u});y>f.height()&&(h.css("overflowY","scroll"),x(h),k.filter(".selected").length&&h.scrollTop(h.scrollTop()+k.filter(".selected").position().top));a.prependTo(f).css({position:"absolute",left:0,top:0,width:"100%",height:"100%",opacity:0});if(a.is(":disabled"))f.addClass("disabled"),l.each(function(){b(this).is(":selected")&&
k.eq(b(this).index()).addClass("selected")});else if(k.filter(":not(.disabled):not(.optgroup)").click(function(c){a.focus();var d=b(this);c.ctrlKey||c.metaKey||d.addClass("selected");c.shiftKey||d.addClass("first");c.ctrlKey||(c.metaKey||c.shiftKey)||d.siblings().removeClass("selected first");if(c.ctrlKey||c.metaKey)d.is(".selected")?d.removeClass("selected first"):d.addClass("selected first"),d.siblings().removeClass("first");if(c.shiftKey){var e=!1,f=!1;d.siblings().removeClass("selected").siblings(".first").addClass("selected");
d.prevAll().each(function(){b(this).is(".first")&&(e=!0)});d.nextAll().each(function(){b(this).is(".first")&&(f=!0)});e&&d.prevAll().each(function(){if(b(this).is(".selected"))return!1;b(this).not(".disabled, .optgroup").addClass("selected")});f&&d.nextAll().each(function(){if(b(this).is(".selected"))return!1;b(this).not(".disabled, .optgroup").addClass("selected")});1==k.filter(".selected").length&&d.addClass("first")}l.prop("selected",!1);k.filter(".selected").each(function(){var a=b(this),c=a.index();
a.is(".option")&&(c-=a.prevAll(".optgroup").length);l.eq(c).prop("selected",!0)});a.change()}),l.each(function(a){b(this).data("optionIndex",a)}),a.on("change.styler",function(){k.removeClass("selected");var a=[];l.filter(":selected").each(function(){a.push(b(this).data("optionIndex"))});k.not(".optgroup").filter(function(c){return-1<b.inArray(c,a)}).addClass("selected")}).on("focus.styler",function(){f.addClass("focused")}).on("blur.styler",function(){f.removeClass("focused")}),y>f.height())a.on("keydown.styler",
function(a){38!=a.which&&37!=a.which&&33!=a.which||h.scrollTop(h.scrollTop()+k.filter(".selected").position().top-u);40!=a.which&&39!=a.which&&34!=a.which||h.scrollTop(h.scrollTop()+k.filter(".selected:last").position().top-h.innerHeight()+2*u)})}var l=b("option",a),t="";a.is("[multiple]")?h||y||e():z()};M();a.on("refresh",function(){a.off(".styler").parent().before(a).remove();M()})}else if(a.is(":reset"))a.on("click",function(){setTimeout(function(){a.closest(f.wrapper).find("input, select").trigger("refresh")},
1)})},destroy:function(){var c=b(this.element);c.is(":checkbox")||c.is(":radio")?(c.removeData("_"+h).off(".styler refresh").removeAttr("style").parent().before(c).remove(),c.closest("label").add('label[for="'+c.attr("id")+'"]').off(".styler")):c.is('input[type="number"]')?c.removeData("_"+h).off(".styler refresh").closest(".jq-number").before(c).remove():(c.is(":file")||c.is("select"))&&c.removeData("_"+h).off(".styler refresh").removeAttr("style").parent().before(c).remove()}};b.fn[h]=function(c){var a=
arguments;if(void 0===c||"object"===typeof c)return this.each(function(){b.data(this,"_"+h)||b.data(this,"_"+h,new z(this,c))}).promise().done(function(){var a=b(this[0]).data("_"+h);a&&a.options.onFormStyled.call()});if("string"===typeof c&&"_"!==c[0]&&"init"!==c){var f;this.each(function(){var y=b.data(this,"_"+h);y instanceof z&&"function"===typeof y[c]&&(f=y[c].apply(y,Array.prototype.slice.call(a,1)))});return void 0!==f?f:this}};G.registered=!1});
 /**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 */
!function(e){e.fn.touchwipe=function(t){var n={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:!0};return t&&e.extend(n,t),this.each(function(){function e(){this.removeEventListener("touchmove",t),o=null,c=!1}function t(t){if(n.preventDefaultEvents&&t.preventDefault(),c){var i=t.touches[0].pageX,h=t.touches[0].pageY,a=o-i,s=u-h;Math.abs(a)>=n.min_move_x?(e(),a>0?n.wipeLeft():n.wipeRight()):Math.abs(s)>=n.min_move_y&&(e(),s>0?n.wipeDown():n.wipeUp())}}function i(e){1==e.touches.length&&(o=e.touches[0].pageX,u=e.touches[0].pageY,c=!0,this.addEventListener("touchmove",t,!1))}var o,u,c=!1;"ontouchstart"in document.documentElement&&this.addEventListener("touchstart",i,!1)}),this}}(jQuery);


/* Fancybox Select plugin */
(function(){var a;a=window.jQuery||window.Zepto||window.$;a.fn.fancySelect=function(d){var c,b;if(d==null){d={}}b=a.extend({forceiOS:false,includeBlank:false,optionTemplate:function(e){return e.text()},triggerTemplate:function(e){return e.text()}},d);c=!!navigator.userAgent.match(/iP(hone|od|ad)/i);return this.each(function(){var e,i,g,j,f,h,k;j=a(this);if(j.hasClass("fancified")||j[0].tagName!=="SELECT"){return}j.addClass("fancified");j.css({width:1,height:1,display:"block",position:"absolute",top:0,left:0,opacity:0});j.wrap('<div class="fancy-select form-control">');k=j.parent();if(j.data("class")){k.addClass(j.data("class"))}k.append('<div class="trigger">');if(!(c&&!b.forceiOS)){k.append('<ul class="options">')}f=k.find(".trigger");g=k.find(".options");i=j.prop("disabled");if(i){k.addClass("disabled")}h=function(){var l;l=b.triggerTemplate(j.find(":selected"));return f.html(l)};j.on("blur.fs",function(){if(f.hasClass("open")){return setTimeout(function(){return f.trigger("close.fs")},120)}});f.on("close.fs",function(){f.removeClass("open");return g.removeClass("open")});f.on("click.fs",function(){var l,m;if(!i){f.toggleClass("open");if(c&&!b.forceiOS){if(f.hasClass("open")){return j.focus()}}else{if(f.hasClass("open")){m=f.parent();l=m.offsetParent();if((m.offset().top+m.outerHeight()+g.outerHeight()+20)>a(window).height()+a(window).scrollTop()){g.addClass("overflowing")}else{g.removeClass("overflowing")}}g.toggleClass("open");if(!c){return j.focus()}}}});j.on("enable",function(){j.prop("disabled",false);k.removeClass("disabled");i=false;return e()});j.on("disable",function(){j.prop("disabled",true);k.addClass("disabled");return i=true});j.on("change.fs",function(l){if(l.originalEvent&&l.originalEvent.isTrusted){return l.stopPropagation()}else{return h()}});j.on("keydown",function(n){var m,o,l;l=n.which;m=g.find(".hover");m.removeClass("hover");if(!g.hasClass("open")){if(l===13||l===32||l===38||l===40){n.preventDefault();return f.trigger("click.fs")}}else{if(l===38){n.preventDefault();if(m.length&&m.index()>0){m.prev().addClass("hover")}else{g.find("li:last-child").addClass("hover")}}else{if(l===40){n.preventDefault();if(m.length&&m.index()<g.find("li").length-1){m.next().addClass("hover")}else{g.find("li:first-child").addClass("hover")}}else{if(l===27){n.preventDefault();f.trigger("click.fs")}else{if(l===13||l===32){n.preventDefault();m.trigger("click.fs")}else{if(l===9){if(f.hasClass("open")){f.trigger("close.fs")}}}}}}o=g.find(".hover");if(o.length){g.scrollTop(0);return g.scrollTop(o.position().top-12)}}});g.on("click.fs","li",function(m){var l;l=a(this);j.val(l.data("raw-value"));if(!c){j.trigger("blur.fs").trigger("focus.fs")}g.find(".selected").removeClass("selected");l.addClass("selected");f.addClass("selected");return j.val(l.data("raw-value")).trigger("change.fs").trigger("blur.fs").trigger("focus.fs")});g.on("mouseenter.fs","li",function(){var m,l;l=a(this);m=g.find(".hover");m.removeClass("hover");return l.addClass("hover")});g.on("mouseleave.fs","li",function(){return g.find(".hover").removeClass("hover")});e=function(){var l;h();if(c&&!b.forceiOS){return}l=j.find("option");return j.find("option").each(function(n,m){var o;m=a(m);if(!m.prop("disabled")&&(m.val()||b.includeBlank)){o=b.optionTemplate(m);if(m.prop("selected")){return g.append('<li data-raw-value="'+(m.val())+'" class="selected">'+o+"</li>")}else{return g.append('<li data-raw-value="'+(m.val())+'">'+o+"</li>")}}})};j.on("update.fs",function(){k.find(".options").empty();return e()});return e()})}}).call(this);

/* Checkbox & Radio plugin */
(function(c){var g="iCheck",e=g+"-helper",q="checkbox",a="radio",s="checked",x="un"+s,i="disabled",h="determinate",b="in"+h,r="update",t="type",d="click",w="touchbegin.i touchend.i",p="addClass",f="removeClass",l="trigger",z="label",o="cursor",n=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);c.fn[g]=function(N,E){var J='input[type="'+q+'"], input[type="'+a+'"]',L=c(),B=function(O){O.each(function(){var P=c(this);if(P.is(J)){L=L.add(P)}else{L=L.add(P.find(J))}})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(N)){N=N.toLowerCase();B(this);return L.each(function(){var O=c(this);if(N=="destroy"){u(O,"ifDestroyed")}else{v(O,true,N)}if(c.isFunction(E)){E()}})}else{if(typeof N=="object"||!N){var F=c.extend({checkedClass:s,disabledClass:i,indeterminateClass:b,labelHover:true},N),G=F.handle,I=F.hoverClass||"hover",M=F.focusClass||"focus",K=F.activeClass||"active",C=!!F.labelHover,H=F.labelHoverClass||"hover",D=(""+F.increaseArea).replace("%","")|0;if(G==q||G==a){J='input[type="'+G+'"]'}if(D<-50){D=-50}B(this);return L.each(function(){var Z=c(this);u(Z);var R=this,O=R.id,S=-D+"%",aa=100+(D*2)+"%",T={position:"absolute",top:S,left:S,display:"block",width:aa,height:aa,margin:0,padding:0,background:"#fff",border:0,opacity:0},U=n?{position:"absolute",visibility:"hidden"}:D?T:{position:"absolute",opacity:0},V=R[t]==q?F.checkboxClass||"i"+q:F.radioClass||"i"+a,X=c(z+'[for="'+O+'"]').add(Z.closest(z)),W=!!F.aria,Q=g+"-"+Math.random().toString(36).substr(2,6),Y='<div class="'+V+'" '+(W?'role="'+R[t]+'" ':""),P;if(W){X.each(function(){Y+='aria-labelledby="';if(this.id){Y+=this.id}else{this.id=Q;Y+=Q}Y+='"'})}Y=Z.wrap(Y+"/>")[l]("ifCreated").parent().append(F.insert);P=c('<div class="checker"></div>').appendTo(Y);Z.data(g,{o:F,s:Z.attr("style")}).css(U);!!F.inheritClass&&Y[p](R.className||"");!!F.inheritID&&O&&Y.attr("id",g+"-"+O);v(Z,true,r);if(X.length){X.on(d+".i mouseover.i mouseout.i "+w,function(ad){var ab=ad[t],ac=c(this);if(!R[i]){if(ab==d){if(c(ad.target).is("a")){return}v(Z,false,true)}else{if(C){if(/ut|nd/.test(ab)){Y[f](I);ac[f](H)}else{Y[p](I);ac[p](H)}}}if(n){ad.stopPropagation()}else{return false}}})}Z.on(d+".i focus.i blur.i keyup.i keydown.i keypress.i",function(ad){var ac=ad[t],ab=ad.keyCode;if(ac==d){return false}else{if(ac=="keydown"&&ab==32){if(!(R[t]==a&&R[s])){if(R[s]){y(Z,s)}else{k(Z,s)}}return false}else{if(ac=="keyup"&&R[t]==a){!R[s]&&k(Z,s)}else{if(/us|ur/.test(ac)){Y[ac=="blur"?f:p](M)}}}}});P.on(d+" mousedown mouseup mouseover mouseout "+w,function(ad){var ac=ad[t],ab=/wn|up/.test(ac)?K:I;if(!R[i]){if(ac==d){v(Z,false,true)}else{if(/wn|er|in/.test(ac)){Y[p](ab)}else{Y[f](ab+" "+K)}if(X.length&&C&&ab==I){X[/ut|nd/.test(ac)?f:p](H)}}if(n){ad.stopPropagation()}else{return false}}})})}else{return this}}};function v(B,H,G){var C=B[0],E=/er/.test(G)?b:/bl/.test(G)?i:s,F=G==r?{checked:C[s],disabled:C[i],indeterminate:B.attr(b)=="true"||B.attr(h)=="false"}:C[E];if(/^(ch|di|in)/.test(G)&&!F){k(B,E)}else{if(/^(un|en|de)/.test(G)&&F){y(B,E)}else{if(G==r){for(var D in F){if(F[D]){k(B,D,true)}else{y(B,D,true)}}}else{if(!H||G=="toggle"){if(!H){B[l]("ifClicked")}if(F){if(C[t]!==a){y(B,E)}}else{k(B,E)}}}}}}function k(K,D,B){var G=K[0],M=K.parent(),L=D==s,C=D==b,H=D==i,N=C?h:L?x:"enabled",F=m(K,N+j(G[t])),J=m(K,D+j(G[t]));if(G[D]!==true){if(!B&&D==s&&G[t]==a&&G.name){var E=K.closest("form"),I='input[name="'+G.name+'"]';I=E.length?E.find(I):c(I);I.each(function(){if(this!==G&&c(this).data(g)){y(c(this),D)}})}if(C){G[D]=true;if(G[s]){y(K,s,"force")}}else{if(!B){G[D]=true}if(L&&G[b]){y(K,b,false)}}A(K,L,D,B)}if(G[i]&&!!m(K,o,true)){M.find("."+e).css(o,"default")}M[p](J||m(K,D)||"");if(!!M.attr("role")&&!C){M.attr("aria-"+(H?i:s),"true")}M[f](F||m(K,N)||"")}function y(I,D,B){var F=I[0],K=I.parent(),J=D==s,C=D==b,G=D==i,L=C?h:J?x:"enabled",E=m(I,L+j(F[t])),H=m(I,D+j(F[t]));if(F[D]!==false){if(C||!B||B=="force"){F[D]=false}A(I,J,L,B)}if(!F[i]&&!!m(I,o,true)){K.find("."+e).css(o,"pointer")}K[f](H||m(I,D)||"");if(!!K.attr("role")&&!C){K.attr("aria-"+(G?i:s),"false")}K[p](E||m(I,L)||"")}function u(B,C){if(B.data(g)){B.parent().html(B.attr("style",B.data(g).s||""));if(C){B[l](C)}B.off(".i").unwrap();c(z+'[for="'+B[0].id+'"]').add(B.closest(z)).off(".i")}}function m(B,D,C){if(B.data(g)){return B.data(g).o[D+(C?"":"Class")]}}function j(B){return B.charAt(0).toUpperCase()+B.slice(1)}function A(C,D,E,B){if(!B){if(D){C[l]("ifToggled")}C[l]("ifChanged")[l]("if"+j(E))}}})(window.jQuery||window.Zepto);

/* File Input plugin */
(function(d){var a={},j="inputfile",c="upload-button",h="previous-file",f="deleted",i="upload-button-link",e="upload-button-remove";function b(m){var q=d(m.currentTarget),o=q.parents("."+j),l=o.find("."+h),n=l.find("a"),p=o.find('input[type="checkbox"]');l.show();p.attr("disabled","disabled");l.removeClass(f);n.attr("href","#");n.html(q.val());n.on("click",function(){return false})}function g(m){var q=d(m.currentTarget),o=q.parents("."+j),l=o.find('input[type="file"]'),r=q.parent(),n=r.find("a"),p=o.find('input[type="checkbox"]');if(l.attr("data-value")){if(r.hasClass(f)){p.removeAttr("checked");p.attr("disabled","disabled");r.removeClass(f)}else{if(n.attr("href")!==l.attr("data-value")){n.attr("href",l.attr("data-value"));n.html(l.attr("data-text"))}else{p.attr("checked","checked");p.removeAttr("disabled");r.addClass(f)}}}else{r.hide();r.addClass(f);p.removeAttr("disabled","disabled");n.html("");l.replaceWith(l.clone(true))}return false}function k(l){this.each(function(){var t=d(this),v=t.data("value"),q=t.data("text"),r=d.extend({},t.inputfile.config,l),n,x,p,s,w,m,o,u;t.wrap('<div class="'+j+'"><div class="'+c+'"></div></div>');n=t.parent();x=n.parent();p=d('<div class="'+h+'"></div>').appendTo(x);s=d('<a href="#" class="'+i+'" target="_blank">Добавить фото/видео</a>').appendTo(p);if(l.dontRemove){w=d('<button class="'+e+" "+r.removeButtonClass+'"></button>').appendTo(p);w.append(d(r.removeText).addClass("remove-icon"));w.append(d(r.restoreText).addClass("restore-icon"));m=r.removeName||t.attr("name");o=d('<input type="checkbox" name="'+m+'" value="'+r.removeValue+'" disabled/>');o.hide().appendTo(w)}if(!v){}else{s.attr("href",v);s.html(q||v)}u=d('<button class="'+r.uploadButtonClass+'">'+r.uploadText+"</button>").insertBefore(t);t.on("change",b);if(w){w.on("click",g)}})}d.fn.inputfile=function(l){if(a[l]){return a[l].apply(d(this),Array.prototype.slice.call(arguments,1))}else{if(!l||(l&&l.constructor===Object)){return k.apply(this,arguments)}}};d.fn.inputfile.config={uploadText:'Обзор',removeText:'<i class="icon-trash"></i>',restoreText:'<i class="icon-undo"></i>',uploadButtonClass:"btn btn-upload",removeButtonClass:"btn",removeName:"",removeValue:1,dontRemove:false}}(jQuery));

$(function(){
	var frequentlyUsedElements = {};
	$('.pop').click(function(e){
		e.preventDefault();
	});
	$('.pop').popover({
						  trigger: 'focus'
					  });
	$('.select').fancySelect();
	$('.check').iCheck();
	$('input[type="file"]').not('.zip-file').inputfile({});
    //ресайзы слайдера, перерисовка количества колонок в нем
    $(document).ready(function(){
        var elementWidth = 110,
            endPageWidth = 980,
            elements = $('#wefix .brand'),
            elemCount = elements.length;

        $( window ).resize(function() {
            generateSlides($('#wefix .carousel-inner').width());
            var wraperOffsetTop = $();
        });

        function generateSlides(curWidth){
            var sideEmptySpace = curWidth % 110;

            var elemsPerRow = Math.floor(curWidth / elementWidth),
                marginPerElem = ((sideEmptySpace / elemsPerRow) / 2) - 0.1;
                elements.css({
                    'margin-left' : marginPerElem + 'px',
                    'margin-right' : marginPerElem + 'px'
                });
                //


            var elemsPerSlide = 3 * elemsPerRow;
            //
            //расчитываем количество слайдов
            var slideCount = Math.ceil(elemCount / elemsPerSlide);
            var slides = [];
            var curJ = 0;

            for (var i = 0; i < slideCount; i++){
                var slide = $('<div class="item">')[0];
                var wraper = $('<div class="brandWrap">')[0];
                $(slide).append(wraper);

                if (!i){
                    slide.classList.add('active');
                }
                for (var j = 0; j < elemsPerSlide; j++){
                    if (elements[curJ]){
                        //
                        $(wraper).append(elements[curJ]);
                        curJ++;
                    }
                }
                slides.push(slide);
            }
            $('#wefix  .carousel-inner').empty();
            for (var i = 0; i < slideCount; i++){
                $('#wefix .carousel-inner').append(slides[i]);
            }

        }
        generateSlides($('.carousel-inner').width());
    });
	$(window).scroll(function(){

		//Элемент-меню
		frequentlyUsedElements.$ScrollMenuElement = $('#header');

		//Элемент, после пролистывания которого появляется меню
		frequentlyUsedElements.$showMenuElement = $('#aside').find('.sidelinks').eq(0).find('.menuSectionHead');
		frequentlyUsedElements.showMenuElementHeight = frequentlyUsedElements.$showMenuElement.height();
		//Позиция нижнего левого угла элемента, после пролистывания которого появляется меню
		frequentlyUsedElements.showMenuElementLeftBottom = frequentlyUsedElements.$showMenuElement.offset().top+
														   frequentlyUsedElements.showMenuElementHeight;

		//Меню, которое надо вставить в header
		//frequentlyUsedElements.$navMenu = $('#nav');



		if(window.pageYOffset>frequentlyUsedElements.showMenuElementLeftBottom
		   &&!frequentlyUsedElements.$ScrollMenuElement.is('.show-scroll-menu')){

			//Переносим меню в хедер
			frequentlyUsedElements.$ScrollMenuElement.find('.col-md-9.head-cols.text-right').
				prepend(frequentlyUsedElements.$navMenu);

			frequentlyUsedElements.$ScrollMenuElement.addClass('show-scroll-menu').show();
            $(window).trigger('resize');
		}

		else if(window.pageYOffset<=frequentlyUsedElements.showMenuElementLeftBottom
				&&frequentlyUsedElements.$ScrollMenuElement.is('.show-scroll-menu')){

				//Возвращаем меню на место
				$('.page').prepend(frequentlyUsedElements.$navMenu);
            //alert($('#header .row .col-md-9').width());
            //if ($('#header .row .col-md-9').width()>1120) {
                $('#header.show-scroll-menu .head-cols').css({
                    //width: '70%'
                });
            //}
            //else
            //{
            // $('#header.show-scroll-menu .head-cols').css({
            //        width: '70%'
            //    });
            //}

			frequentlyUsedElements.$ScrollMenuElement.removeClass('show-scroll-menu').removeAttr('style');

		}
	});
});
/**
 * Created by iu7 on 05.03.15.
 */
$(document).ready(function(){
	var frequentlyUsedElements = {};
	frequentlyUsedElements.$modalRecallMe = $('#modal-recall-me');
	frequentlyUsedElements.$buttonRecallMe = $('#button-recall-me');
	frequentlyUsedElements.$formRecall = $('#form-recall');
	frequentlyUsedElements.$inputName = frequentlyUsedElements.$formRecall.find('input[name="name"]');
	frequentlyUsedElements.$inputEmail = frequentlyUsedElements.$formRecall.find('input[name="phone-number"]');
	frequentlyUsedElements.$inputSubmit = frequentlyUsedElements.$formRecall.find('input[type="submit"]');
	frequentlyUsedElements.$buttonRecallMe.click(function(){
		frequentlyUsedElements.$modalRecallMe.addClass('active');
	});

	frequentlyUsedElements.$modalRecallMe.find('a.close').click(function(){
		frequentlyUsedElements.$modalRecallMe.removeClass('active');
	});
	frequentlyUsedElements.$inputName.on("blur", function(){
		if(isEmpty($(this))){
			$(this).addClass('error');
		}
		else{
			$(this).removeClass('error');
		}
	});
	frequentlyUsedElements.$inputEmail.on("blur", function(){
		if(isEmpty($(this))||!isValidPhone($(this))){
			$(this).addClass('error');
		}
		else{
			$(this).removeClass('error');
		}
	});
	frequentlyUsedElements.$formRecall.focus(function(e){
		$(e.target).removeClass('error');
	});
	frequentlyUsedElements.$inputSubmit.click(function(e){
		if(isEmpty(frequentlyUsedElements.$inputName)||
		isEmpty(frequentlyUsedElements.$inputEmail)||
		!isValidPhone(frequentlyUsedElements.$inputEmail)){
			e.preventDefault();
			frequentlyUsedElements.$formRecall.find('input').trigger('blur');
		}
		else{
			e.preventDefault();
			var name_feed=$('#input-name-feed').val();
			var phone_feed=$('#input-phone-feed').val();
			$.get("/include/ajax/call-me.php",
				  {
					  name: name_feed,
					  phone: phone_feed
				  },
				  function(msg)
                  {
                      console.log('ggggg');
                      //frequentlyUsedElements.$formRecall.replaceWith('<b class="success">Ваша заявка отправлена. В течение 15 минут менеджер свяжется с Вами.</b>');
				  }
			);
		}
	});
});
function isValidPhone($element){

	var value = $element.val().trim();
	var regex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

	$element.val(value);

	return value.match(regex);
}
function isEmpty($element){
	/*нужна проверка текста элемента без пробелов т.к. иначе проверка обходится введением пробелов */
	var elementValue = $element.val().trim();
	$element.val(elementValue);
	return !elementValue.length;
}
$(document).ready(function(){
    $('.js-open-dialog-all').on('click',function(){
        var _this = $(this);
        _this.parents('.dialog').find('.dialog-hidden').show();
    });
    $('.js-click-button-recall-me').on('click',function(){
        $('#button-recall-me').click();
    });
     $('.benefits-head').on('click',function(){
         $(this).toggleClass('active');
        $(this).parent().find('.benefits-hidden').stop().slideToggle(200);
     });
    addFixedBarPosition('.js-fixed-bar-position');
    addColumnsFloatTable();
    var winD = $(window);
     $('.fixed-bar-left-menu').height(winD.height());
        $('.fixed-bar-right-menu').height(winD.height());
    $(window).on('scroll resize',function(){
        addFixedBarPosition('.js-fixed-bar-position');
        $('.fixed-bar-left-menu').height(winD.height());
        $('.fixed-bar-right-menu').height(winD.height());

    });
    $(window).on('resize',function(){
        addColumnsFloatTable();
         initJcarousel('.jcarusel-wrap-body');
    });
    $('.js-open-right-menu').on('click touchstart',function(){
         $('.fixed-bar-left-menu').removeClass('open');
         $('.fixed-bar-left').removeClass('fixed-bar-left--open');
         var _thisBody = $('html,body');
        $('.fixed-bar-right-menu').addClass('open');
        $('.fixed-bar-right').addClass('fixed-bar-right--open');
        _thisBody.addClass('body-hidden');
        $(document).on('click',function(event){
            if ($(event.target).parents('.fixed-bar-right').length != 1) {
                $('.fixed-bar-right-menu').removeClass('open');
                $('.fixed-bar-right').removeClass('fixed-bar-right--open');
                _thisBody.removeClass('body-hidden');
                //_thisBody.height('auto');
            }
        });
        $(document).touchwipe({
            wipeRight:function() {
                $('.fixed-bar-right-menu').removeClass('open');
                $('.fixed-bar-right').removeClass('fixed-bar-right--open');
                _thisBody.removeClass('body-hidden');
                //_thisBody.height('auto');
            },
            preventDefaultEvents: false
        });
         $('.fixed-bar-right-menu-item-arr-close').on('click',function(event){
            $('.fixed-bar-right-menu').removeClass('open');
            $('.fixed-bar-right').removeClass('fixed-bar-right--open');
            _thisBody.removeClass('body-hidden');
        });
        return false
    });
    $('.js-open-left-menu').on('click touchstart',function(){
        $('.fixed-bar-right-menu').removeClass('open');
         $('.fixed-bar-right').removeClass('fixed-bar-right--open');
        var _thisBody = $('html,body');
        $('.fixed-bar-left-menu').addClass('open');
        $('.fixed-bar-left').addClass('fixed-bar-left--open');
        _thisBody.addClass('body-hidden');
        $(document).on('click',function(event){
            if ($(event.target).parents('.fixed-bar-left').length != 1) {
                $('.fixed-bar-left-menu').removeClass('open');
                $('.fixed-bar-left').removeClass('fixed-bar-left--open');
                _thisBody.removeClass('body-hidden');
                //_thisBody.height('auto');
            }
        });
        $(document).touchwipe({
            wipeLeft:function() {
                 $('.fixed-bar-left-menu').removeClass('open');
                $('.fixed-bar-left').removeClass('fixed-bar-left--open');
                _thisBody.removeClass('body-hidden');
            },
            preventDefaultEvents: false
        });
        $('.fixed-bar-left-menu-item-arr-close').on('click',function(event){
            $('.fixed-bar-left-menu').removeClass('open');
            $('.fixed-bar-left').removeClass('fixed-bar-left--open');
            _thisBody.removeClass('body-hidden');
        });
        return false
    });
    $('.fixed-bar-left-menu-item-head').on('click',function(){
        var _this = $(this);
        _this.toggleClass('active');
        _this.parent().find('.fixed-bar-right-menu-list').stop().slideToggle();
    });
    initFormStyler('.styled-select');
    initJcarousel('.jcarusel-wrap-body');
     $('.js-open-comments-add-body').on('click',function(){
        var _this = $(this);
        _this.parents('.comments-add').find('.comments-add-body').stop().toggle();
    });
});
// function initJcarousel
function initJcarousel(a) {
    var _this = $(a);
    var _thisW = _this.width();
    var _thisParWindows = $(window).width();
    var _thisParLenPrev = '-=1';
    var _thisParLenNext = '+=1';
    if(_thisParWindows>600){
        _this.find('.jcarusel-wrap-body-list-item').outerWidth(_thisW/4);
        _thisParLenPrev = '-=4';
        _thisParLenNext = '+=4';
    }else{
        _this.find('.jcarusel-wrap-body-list-item').outerWidth(_thisW/3);
        _thisParLenPrev = '-=3';
        _thisParLenNext = '+=3';
    }
    if(_thisParWindows<400){
        _this.find('.jcarusel-wrap-body-list-item').outerWidth(_thisW/2);
        _thisParLenPrev = '-=2';
        _thisParLenNext = '+=2';
    }
    if (_this.length > 0) {
        if(!$('.jcarusel-wrap-arr-left').length){
            _this.parent().append('<a href="#" class="jcarusel-wrap-arr-left jcarousel-control-prev"><span class="icon icon-left"></span></a><a href="#" class="jcarusel-wrap-arr-right jcarousel-control-next"><span class="icon icon-right"></span></a>');
        }
        _this
            .jcarousel({
                animation:   300,
                wrap:'circular'
            });
        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                // Options go here
                target: _thisParLenPrev
            });
        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                // Options go here
                target: _thisParLenNext
            });
        _this.touchwipe({
            wipeLeft: function() {
                _this.jcarousel('scroll', _thisParLenNext)
            },
            wipeRight: function() {
                _this.jcarousel('scroll', _thisParLenPrev)
            },
            preventDefaultEvents: false
        });
    }
}
 // function addFixedBarPosition
 function addFixedBarPosition(a){
     var _this = $(a);
    var paramFixedBar = $('#nav').height();
    var paramFixedBarH = _this.find('.fixed-bar-btn').innerHeight();
    _this.css('top',-paramFixedBarH);
    var paramWindows = $(document).scrollTop();
    if(paramWindows > paramFixedBar){
        _this.addClass('fixed-bar--mod')
    }else{
        _this.removeClass('fixed-bar--mod')
    }
}
// function addColumnsFloatTable
 function addColumnsFloatTable(){
     var _this = $('.table-style-float');
     var _thisPar = _this.parent().find('.table-style-wrap td:first-child').outerWidth();
     _this.width(_thisPar+5);
}
//function initFormStyler
function initFormStyler(a){
    if($(a).length){
        $(a).styler({
            selectPlaceholder:'',
            selectSearch:true
        });
    }
}

