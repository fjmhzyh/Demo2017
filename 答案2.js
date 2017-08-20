


// javascript: 伪协议  
// 是一种非标准化的协议。让我们通过一个链接来调用JS
// 在支持的浏览器中将执行JS代码。但在老的浏览器中，将尝试打开链接，并失败。
<a href="javascript:alert(1)">click</a>		// 在html中使用伪协议的做法非常不好


// #  是未指向任何目标的空连接。在某些浏览器，指向文档的开头
<a href="#"></a>


// 性能优化
尽量少访问DOM	// 只要查询DOM中的元素，浏览器会遍历整个DOM树。将DOM元素保存到变量中是一个好办法。
尽量减少HTML标签	// 过多不必要的元素只会增加DOM树的规模，进而增加遍历DOM树的时间

合并脚本	// 合并脚本，减少请求数量。
放置脚本	// 放在head中会导致浏览器无法并行加载其他文件，比如图片。放在</body>前，可以让页面加载更快
压缩脚本	// 多数情况下，应该有两个版本的文件。一个工作副本，一个精简副本。



// window.top  window.parent
window.parent 返回当前窗口的父对象，而 window.top 返回最顶层的窗口对象。


// window.self
返回一个指向当前 window 对象的引用。


// 禁止iframe嵌套
if(top.location != location){
	top.location = self.location;
}

if(top != self)
if(top.location != self.location)
if(window != top)




// iframe 的 sandbox
iframe一直被人们所诟病。挂马,XSS,ClickJacking都有它不光彩的身影。
H5中专门为iframe定义了一个新属性，叫sandbox。使用sandbox后，iframe加载的内容被视为一个独立的源。
其中的脚本将被禁止执行，表单禁止提交，插件禁止加载。


// noreferer
a标签和area标签在定义了noreferer以后，将不再发送referer


// canvas 破解验证码。
canvas 允许JS在页面中直接操作图片对象，甚至直接操作像素。



// CORS   Access-Control-Allow-Origin:http://www.a.com


// local storage 	也受到同源策略影响，每个域所拥有的信息只会保存在自己的域下。
类似非关系型数据库，由key-value 组成。



// local storage 	也受到同源策略影响，每个域所拥有的信息只会保存在自己的域下。
类似非关系型数据库，由key-value 组成。