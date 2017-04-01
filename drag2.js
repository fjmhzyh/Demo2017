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
	function Drag(config){
		// 用户配置项
		this.config =  {
			el: null,		// 要拖动的元素
			outScreen: false,	// 是否可以拖出屏幕外
			autoCenter:false,	// 元素自动居中
			autoCenterWhenResize:false	//屏幕缩放时,元素自动居中
		}
	}

	// 定义变量
	var draggable = false,
		maxX = 0,
		maxY = 0,
		diffX = 0,
		diffY = 0;

	Drag.prototype = {
		enable:	function(options){
			var config = null;
			for(key in options){
				this.config[key] = options[key];
				config = this.config;
			};
			var style = config.el.currentStyle? config.el.currentStyle : window.getComputedStyle(config.el, null);
			if(style.position != 'absolute'){
				config.el.style.position = 'absolute';
			} 
			maxX = document.documentElement.clientWidth - config.el.offsetWidth;
			maxY = document.documentElement.clientHeight - config.el.offsetHeight;
			if(config.autoCenter){
				autoCenter(config.el)
			}
			if(config.autoCenterWhenResize){
				autoCenterWhenResize(config.el)
			}
			document.addEventListener('mousedown',this.handler);
			document.addEventListener('mousemove',this.handler);
			document.addEventListener('mouseup',this.handler);
		},
		disable:function(){
			document.removeEventListener('mousedown',handler);
			document.removeEventListener('mousemove',handler);
			document.removeEventListener('mouseup',handler);
		},
		handler:function (e){
			var config = this.config; 
			var e = e || window.event;
			var target = e.target || e.srcElement;
			switch(e.type){
				case 'mousedown':
					if(config.el.contains(target)){
						draggable = true;
						diffX =	e.clientX - config.el.offsetLeft;
						diffY =	e.clientY - config.el.offsetTop;
					}
					break;
				case 'mousemove':
					if(config.el && draggable){
						var x = e.clientX - diffX;
						var y = e.clientY - diffY;
						if(config.outScreen == false){
							x =	Math.min( maxX , Math.max(0,x));
							y = Math.min( maxY , Math.max(0,y));
						}
						config.el.style.left = x + 'px';
						config.el.style.top = y + 'px';
					} 
					break;
				case 'mouseup':
					draggable = false; 
					break;
			}
		}
	}

	function autoCenter(ele){
		ele.style.left = maxX / 2 + 'px';
		ele.style.top = maxY / 2 + 'px';
	};
	// 有bug
	function autoCenterWhenResize(ele){
		var element = ele;
		window.onresize = function(){ autoCenter(element)}
	};
	// return {
	// 	enable:new Drag().enable,
	// 	disable:new Drag().disable
	// }
	return Drag
}));


