
// 监听DOM渲染完毕  类似window.onload
$(document).ready(function(){ })
$( function(){} )



// JQ 对象  是一个类数组的对象  即使该元素不存在

var $box = $('#box')  // jq对象
var box = $box[0]     // js对象
var box = $box.get(0) // js对象

var box = document.getElementById('box');
var $box = $(box)   // jq对象


// 创建节点  $("html")
var child = $("<li><span>hello</span></li>")
$("ul").append(child)		// 插后面
$("ul").prepend(child)		// 插前面

// 删除节点  remove()
$("ul li:eq(2)").remove()   //清空该节点以及子节点

// 清空子节点
$("ul li:eq(2)").empty()	// 清空子节点

// 复制节点
$("ul li:eq(2)").clone(true).appendTo('ul')	 // 复制节点 参数true表示复制节点和绑定的事件


// 获取样式
$(".box").attr("class")   			// 获取class
$(".box").attr("class","active")    // 设置class为active
$(".box").addClass("active")    	// 添加class active
$(".box").removeClass("active")    	// 添加class active
$(".box").toggleClass("active")    	// 切换class active

$(".box").hasClass("active")    	// 是否有class active


// 获取css
$(".box").css("color")				// 获取color
$(".box").css("color":"red")		// 设置color
$(".box").height()					// 获取实际高度
$(".box").width()					// 获取实际宽度
$(".box").offset().left				// 左偏移
$(".box").offset().right			// 右偏移


// 获取文本
$(".box").text()  			// 获取innerText
$(".box").html()  			// 获取innerHTML
$(".box").val()  			// 获取value


// 事件
focus()    			// onfocus()
blur()     			// onblur()
hover(enter,leave)
toggle(fn1,fn2,fn3...)


// 阻止冒泡
e.stopPropagation()
// 阻止默认行为
e.preventDefault()



// 节点
$('div').children('p')   	// children() 方法只考虑子元素而不考虑其他后代
$('div').next('p')   		// div的后面第一个兄弟元素p
$('div').prev('p')   		// div的前面第一个兄弟元素p
$('div').siblings('p')   	// div的所有兄弟元素p

$('div').parents()   		// div的所有祖先元素
$('div').parent()   		// div的父元素



// 选择器
$('div > p')   			// div的子元素P
$('div  p')   			// div的后代元素P
$('div + p')   			// div的第一个兄弟元素P
$('div : first')   		// 第一个div
$('div : even')   		// 偶数div
$('div : eq(5)')   		// 第五个div
$('div : gt(5)')        // 第五个之后div
$('div : animated')     // 正在执行动画的div
$("div[title]")   		// 拥有title属性的div
$("div[title!=list]")   // title属性不等于list的div
$("div:visible")   		// 所有可见的div
$(":hidden")   			// 所有隐藏的元素
$('div.one')   			// class为one的div





// 表单操作
$(":focus")  	// 当前聚焦的元素
$(":enabled")   // 可用元素
$(":disabled")  // 不可用元素
$(":checked")   // 选中的元素
$(":selected")  // 选中的元素

$(":input")			// 所有 input
$(":text")			// 所有 type=text 的input
$(":button")		// 所有 type=button 的input


// 是否选中
if(box.checked)  		  // js
if($box.is(":checked"))   // jq




// 禁用右键菜单
$(document).bind("contextmenu",function(e){
	return false
})


