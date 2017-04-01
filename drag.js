;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldDrag = window.Drag;
		var api = window.Drag = factory();
		api.noConflict = function () {
			window.Drag = OldDrag;
			return api;
		};
	}
}(function () {

	// 用户配置项
	var o = {
			el: null,		// 要拖动的元素
			outScreen: false,	// 是否可以拖出屏幕外
			autoCenter:false,	// 元素自动居中
			autoCenterWhenResize:false	//屏幕缩放时,元素自动居中
		}

	// 定义变量
	var draggable = false,
		maxX = 0,
		maxY = 0,
		diffX = 0,
		diffY = 0;

	function handler(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		switch(e.type){
			case 'mousedown':
				if(o.el.contains(target)){
					draggable = true;
					diffX =	e.clientX - o.el.offsetLeft;
					diffY =	e.clientY - o.el.offsetTop;
				}
				break;
			case 'mousemove':
				if(o.el && draggable){
					var x = e.clientX - diffX;
					var y = e.clientY - diffY;
					if(o.outScreen == false){
						x =	Math.min( maxX , Math.max(0,x));
						y = Math.min( maxY , Math.max(0,y));
					}
					o.el.style.left = x + 'px';
					o.el.style.top = y + 'px';
				} 
				break;
			case 'mouseup':
				draggable = false; 
				break;
		}
	};
	function autoCenter(ele){
		ele.style.left = maxX / 2 + 'px';
		ele.style.top = maxY / 2 + 'px';
	};
	// 有bug
	function autoCenterWhenResize(ele){
		var element = ele;
		window.onresize = function(){ autoCenter(element)}
	};
	function enable(options){
		o = options;
		var style = o.el.currentStyle? o.el.currentStyle : window.getComputedStyle(o.el, null);
		if(style.position != 'absolute'){
			o.el.style.position = 'absolute';
		} 
		maxX = document.documentElement.clientWidth - o.el.offsetWidth;
		maxY = document.documentElement.clientHeight - o.el.offsetHeight;
		if(o.autoCenter){
			autoCenter(o.el)
		}
		if(o.autoCenterWhenResize){
			autoCenterWhenResize(o.el)
		}
		document.addEventListener('mousedown',handler);
		document.addEventListener('mousemove',handler);
		document.addEventListener('mouseup',handler);
	};
	function disable(){
		document.removeEventListener('mousedown',handler);
		document.removeEventListener('mousemove',handler);
		document.removeEventListener('mouseup',handler);
	};
	return {
		enable:enable,
		disable:disable
	}
}));


