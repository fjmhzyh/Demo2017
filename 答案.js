shift+右键打开命令行
文件拖到cmd输入路径
ctrl+shift + 上下

// git
github 上有5个文件,本地有3个文件,git push后本地覆盖了github
github 上的文件和本地冲突时, git pull 会合并到本地文件

// 执行环境
执行环境 定义了变量或函数有权访问的其他数据

// 变量对象  执行环境里的变量
每个执行环境 都有一个与之关联的变量对象
环境中定义的所有变量和函数都保存在这个 变量对象 中

// 活动对象
如果当前执行的是一个函数,函数里的变量就是活动对象

//垃圾回收
存在 引用 则不会回收
将变量设置为null,切断对值的引用,让值脱离执行环境。垃圾回收器下次运行时,会自动删除这些值并释放内存


//解除事件监听
第二个参数不能是匿名函数,否则无法解除监听
//------------失败案例--------------
document.addEventListener('mousedown',function(){a.say()})
document.removeEventListener('mousedown',function(){a.say()})
//------------失败案例--------------
document.addEventListener('mousedown',a.say.bind(a))
document.removeEventListener('mousedown',a.say.bind(a))
//------------失败案例--------------
document.addEventListener('mousedown',function(){console.log(88)} )
document.removeEventListener('mousedown',function(){console.log(88)} )
//------------成功案例--------------
document.addEventListener('mousedown',b1.say)
document.removeEventListener('mousedown',b1.say)

Object是Function的实例,所以可以直接调用方法   Obejcet.assign(a,b)


bind()方法会创建一个新函数。
当这个新函数被调用时,bind()的第一个参数将作为它运行时的 this, 
之后的一序列参数将会在传递的实参前传入作为它的参数。


// xhr
var me = this
var xhr = new XMLHttpRequest();
xhr.setRequestHeader("ContentType":"application/x-www-form-urlencoded");
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            var lastGist = JSON.parse(xhr.responseText);
            console.log(lastGist);
            me.setState({
              username: lastGist.description,
              lastGistUrl: lastGist.url
            });
        }
    }
}
xhr.open('get',me.props.source,true);
xhr.send(null);









// 1.获取字符串的长度
'hello'.length;

// 2.为什么字符串可以有属性和方法  
基本类型值是没有属性和方法的,String包装类型可以

// 3.var s = 'hello'  获取'e'的6种方法
'hello'[1]
'hello'.slice(1,2)
'hello'.substr(1,1)
'hello'.substring(1,2)
'hello'.charAt(1)

[].slice.call('hello')[1] 
Function.prototype.call.bind(Array.prototype.slice)('hello')[1]
Array.from('hello')[1]   //ES6

// 4.var s = 'hello'  获取'e'的索引的方法
'hello'.indexOf('e')
'hello'.search('e')

// 5.字符串去空格
'  hello  '.trim()  

// 6.var s = 'hello',字符串转数组的三种方法
[].slice.call('hello')  //ES5
var slice = Function.prototype.call.bind(Array.prototype.slice)
slice('hello')     //ES5

Array.from('hello')   //ES6

// 7.var s='cat,mat,fat,rat',把所有at换成on
'cat,mat,fat,rat'.replace(/at/g,'on')
string.replace(str,function(str,s){
    //str可以传入后面的函数
})


// 9.字符串和数值的转换
var n = 5;
var s = n.toString()  //'5'
var N = parseInt(s,10) //5 永远加上进制
parseInt('',10)  //空字符串返回NaN  
Number('')    //空字符串返回0

eval('4')===4  //true
eval('a')===a  //true


// 10.字符串转数组的三种方法
[1,2,3].join('|')  //"1|2|3"
[1,2,3].toString() //"1,2,3"

"1,2,3".split(',')  //["1", "2", "3"]

[].slice.call('123') //["1", "2", "3"]

Array.from('123')   //["1", "2", "3"]
Array.from("1,2,3") //["1", ",", "2", ",", "3"]


// 11.多个字符串转换成数组的方法
var a='hello',b='world'
Array.of(a,b)  //["hello", "world"]
[a,b]


// 12.字符串和对象的转换
var o={
    'first name':'123',
    'last name':[4,5,6],
    'age':6,
    'color':'blue'
}
o.toString() //"[object Object]" 
String(o)   //"[object Object]" 

var s = JSON.stringify(o,function(key,value){   //"{"first name":"hello","last name":"hello","age":6,"color":"blue"}"
    switch(key){
        case 'first name':
        case 'last name':
            return 'hello'
        default:
            return value
    }
})      
var s = JSON.stringify(o,['age','color'])  //"{"age":6,"color":"blue"}"
var o = JSON.parse(s)


//JSON.stringify(object,array/function,number/string)   //第二个参数是过滤器,第三个参数是否保留缩进


// 11.把'a1'变成a1
var a1 =10;
eval('a1') //10

// 12.求数组最大值和最小值
Math.max.apply(null,[1,3,4,5])
Math.min.apply(null,[1,3,4,5])

// 13.数组求和
[1,2,3,4,5].reduce(function(pre,cur,index,array){
    return pre+cur
})

var total=0
for(let i=0;i<[1,2,3,4,5].length;i++){
    total+=[1,2,3,4,5][i]
}

// 14.数组去重
Array.from(new Set(arr))

// 1.location的3个方法
location.assign()
location.replace()
location.reload(boolean)  //不加参数则从缓存加载,true则从服务器加载
// 2.页面跳转的方法
window.location='https://www.baidu.com/'  //location对象会把url解析为独立的片段
location.href='https://www.baidu.com/'    //href中保存着完整的url
location.assign('https://www.baidu.com/')  //上面两种方法都是调用了location.assign()方法

//3.禁止用户后退的页面跳转
location.replace('https://www.baidu.com/')

// 4.前进或后退一页
history.length
history.go(-1)
history.back()
history.go(1)
history.forward()

// 2.navigator对象
navigator.onLine  //是否可以上网
navigator.geolocation  //定位
navigator.cookieEnabled   //cookie是否可用
//online和offline是html新增的两个dom事件

// 3.localStorage和sessionStorage
sessionStorage  //针对一个session进行数据存储,当用户关闭浏览器窗口后,数据会被删除
localStorage    //没有时间限制的数据存储

// 1.获取html标签名
//<div id='myelement'></div>
var e=document.getElementById('myelement')
e.tagName==e.nodeName  //'DIV'

// 2.判断是否是某个html标签
if(e.tagName.toLowerCase() =='div'){      //一定要toLowerCase()
    //do sth. here
}

//获取style里面的css
e.style对象
e.style.width
e.style.height
e.style.cssText

//获取元素实际样式
e.currentStyle? e.currentStyle : window.getComputedStyle(e, null);  //第二个参数是伪类,不需要就写null


// 2.获取class
//<div id='myelement' class='red green blue'></div>
var e=document.getElementById('myelement')

e.className  //"red blue green"   字符串
e.classList  //["red", "blue", "green", value: "red blue green"]   object

// 3.curd class
e.className = 'black'
e.classList.add('black')
e.classList.remove('black')
e.classList.toggle('black')

// 4.curd属性
e.special='abc';
e.getAttribue('special')  //null  无法获取

e.getAttribue('title')
e.setAttribue('title','mytitle')
e.removeAttribue('title')

 // 5.获取当前获得焦点的元素
 document.activeElement

 // 6.检查网页是否获得焦点
 document.hasFocus() //return boolean

 // 7.如何访问data*属性  <div data-apple='pie' data-orange='juice'></div>
apple = div.dataset.apple    //dataset属性只支持IE11+
orange = div.dataset.orange  //dataset属性只支持IE11+
div.data-apple   //无法访问

 // 8.innerHTML和innerText
 innerHTML返回调用元素的所有子节点和对应的html标记,可以使用innerHTML插入html
 innerText返回调用元素的所有文本节点

// 1.如何获取所有表单,form提交和重置
document.forms   //返回一个数组,通过下标或name访问
document.forms[0].submit()
document.forms.name.reset()

// 2.获得表单的某个字段
var f = doucment.forms[0]
f.element[0]
f.element[name]

// 3.表单自动切换焦点  P427


// 1.获取时间戳
var t = +new Date();
var t = Date.now()

//不传参数时,自动获得当前日期和时间
var a = new Date() //Tue Dec 27 2016 13:18:04 GMT+0800 (中国标准时间) 

//传入时间戳,获取特定时间
var c = new Date(1482815447151)  //Tue Dec 27 2016 13:10:47 GMT+0800 (中国标准时间)

//.Date的toJSON()方法
var t = new Date()  //返回一个对象
t.toJSON()  //"2016-12-29T05:22:41.841Z"  //字符串


// 1.检测是否为数组,函数,正则
// Object在toString时和array和function不一样
function isArray(value){
    return Object.prototype.toString.call(value) == "[object Array]"
}
function isFunction(value){
    return Object.prototype.toString.call(value) == "[object Function]"
}
function isRegExp(value){
    return Object.prototype.toString.call(value) == "[object RegExp]"
}
function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

// 检查属性是否继承而来
function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

// 2.判断字符串是否为空,null或undefined
if(str){}
if(str!=null && str!=undefined && str !='')

// 2.浏览器的能力检测
在可能的情况下,尽量使用typeof进行能力检测.而不是检测某个属性是否存在
function isSortable(o){
    return typeof object.sort =='function'
}

// 3.事件对象
触发DOM上的某个事件时,会产生一个事件对象event.这个event会被传入事件处理程序
btn.onclick = function(event){
    alert(event.target === this)   //true
}

btn.addEventListener('click',function(event){
    alert(event.target === this)   //true
})

// 4.IE中的事件对象 和 监听方法
btn.onclick = function(event){
    var event = window.event
    alert(event.srcElement === this)   //true
}

btn.attachEvent('click',function(event){
    var event = window.event
    alert(event.srcElement === this)   //true
})


// 原生JS实现$(input[type='text'])


// 1.<input type="file" id='files-list'>  如何获取上传的文件
var filesList = document.getElementById('files-list');
filesList.addEventListener('change',function(event){
    var event = event?event:window.event;
    var target = event.target||event.srcElement;
    var files = target.files
})
//可读取的属性
name:"avatar.jpg";size:5466;type:"image/jpeg"

// 2.什么是fileReader类型,以及它的方法,事件
//fileReader类型是一种异步读取文件的读取机制。和XMLHttpRequest一样,只不过它读取的是文件系统
var files = target.files
files[0].readAsText(file,encoding)
files[0].readAsDataURL(file)
//progress事件 50ms触发一次
//error事件 无法读取
//load事件  加载成功


// 3.什么是Image()
var i = new Image(100,200) //接收两个参数,width和height  等价于document.createElement('img') 
i.src = 'picture.jpg';
console.log(i);  //<img width="100" height="200" src="picture.jpg">

// 4.<img width="100" height="200" src="picture.jpg">  获取图片宽度高度
var i = document.getElementsByTagName('img');
var width = i.naturalWidth      //图片实际大小
var height = i.naturalHeight    //图片实际大小
var w = i.width   //100 img标签的大小


// 3.什么是FormData类型
var data = new FormData()
data.append("name","fjm")
var data = new FormData(document.forms[0]);
//使用FormData不必在XHR对象上设置请求头


// 111.对象属性的两种访问方式和优点
object['name']  //方括号访问时,属性名必须是字符串的形式
var args='alias'
object[args]  //优点:可以通过变量来访问
object['first name']  //优点: 属性名包含可能导致语法错误的字符
object.name  //更简洁



正则表达式
var text = 'ab123,AB123,CD123'
var m = new RegExp('ab','ig');   //构造函数的形式
var m = /ab/    // 字面量的形式  二者等价
var m = new RegExp(/[a-zA-Z]{2}/,'ig');
// text是要匹配的字符 或 正则 
// ig 表示忽略大小写,全局匹配
m.test(text)  //  返回true/false
m.exec(text)  //  返回匹配的文字,只返回一个

String.prototype.match()  // 返回一个空数组
// 接受一个正则,如果是字符串,则隐式调用new RegExp,转换成正则



// .这个符号意味着可以匹配任意一个字符
//c.t 可以匹配cat, cot, czt c.t等等   可以通过\转义  c\.t

// []  匹配其中的任何一个字符
// [0123456789]  匹配所有的数字   \\d
// [a]  匹配单字符a
// [b-f]与[b,c,d,e,f]相同，都是匹配一个字符”b”或”c”或”d”或”e”或”f”
// [A-Z]   匹配任意一个大写字母
// [0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] 匹配YYYY-MM-DD格式的日期


// ^ 反义
// [^a] 匹配任何不是a的字符
// [^0-9] 匹配非数字     \\D
// [^a-zA-Z0-9] 匹配任何不是字母也不是数字的字符

//   \\d  匹配所有数字
//   \\D  匹配非数字
//   \\w  匹配一个数字或字母字符
//   \\W  匹配一个不是数字也不是字母的字符
//   \\s  匹配一个空字符（空格，制表符，回车或者换行）
//   \\S  匹配一个非空字符。


// {} 重复
// a{3}表示匹配字符串“aaa”  
// colou{0,1}r  匹配colour或者color   0-1次
// a{3,5}   匹配aaaaa或者aaaa或者aaa


// ?与{0,1}相同，比如，colou?r表示匹配colour或者color
// *与{0,}相同。比如，.*表示匹配任意内容


// | 选择匹配
// cat|dog表示匹配”cat”或者”dog”
// red|blue|以及red||blue以及|red|blue都表示匹配red或者blue或者一个空字符串


//  ^表示匹配行的开始位置
//  $表示匹配行的结束位置


//  不要使用正则表达式验证邮箱地址的正确性
//  第二，即使一个电子邮件地址可以成功匹配正则表达式，也不代表这个邮箱实际存在。
//  邮箱的唯一验证方法，是发送验证邮件。


//http

//cache-control和expires
//Cache-control策略（重点关注）：Cache-Control与Expires的作用一致，都是指明当前资源的有效期，
//控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。只不过Cache-Control的选择更多，
//设置更细致，如果同时设置的话，其优先级高于Expires。

//Last-Modified/If-Modified-Since：Last-Modified/If-Modified-Since要配合Cache-Control使用。

//Etag/If-None-Match：Etag/If-None-Match也要配合Cache-Control使用。

//Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，
//能够更加准确的控制缓存。Last-Modified与ETag一起使用时，服务器会优先验证ETag。


// 1.webpack如何避免重复打包

//webpack会打包入口文件所在目录的所有文件

// 2.webpack 常用命令
// webpack --watch  自动监听打包  
// webpack -p    //压缩混淆脚本，这个非常非常重要！
// webpack --progress --colors   进度条和颜色
// npm install webpack-dev-server -g  安装服务器
// webpack-dev-server --progress --colors  运行服务器   8080端口


// Document 对象
// 每个载入浏览器的 HTML 文档都会成为 Document 对象。
// Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问。
document.all[]  //  返回所有元素
document.links[]   // 返回对Area 和 Link 对象引用
document.images[]  //  返回img
document.forms[]  //  返回form

document.body  //  返回body
document.cookie  //  返回cookie
document.domain  //  返回domain
document.referrer  //  返回referrer
document.URL   // 返回URL
document.title  //  返回title
document.documentElement 

document.write()
document.open(mimetype,replace)
document.getElementById()
document.getElementsByName()
document.getElementsByTagName()


// 1. id作为window对象的属性存在
// <div id="div">我是div</div>  
window.div  // <div id="div">我是div</div>  

// 2. 错误处理

try{

}catch(err){

}

// 防止报错的最后一道防线,尽量不使用,适当使用try-catch
window.onerror = function(message,url,line,columnNo, error){
    console.log(url);
    console.log(line);
    return true;
};


// 鼠标坐标
clientX     //不随页面滚动而改变
pageX       //兼容性：除IE6/7/8不支持外，其余浏览器均支持
offsetWidth   // 元素的宽度,包括元素的 边框、内边距和滚动条
offsetHeight  //元素高度,包括元素的 边框、内边距和滚动条
offsetTop     //上面距离
offsetLeft    //左边距离
// 只读属性。要确定的这两个属性的值，首先得确定元素的 offsetParent 。
// offsetParent 指的是距该元素最近的 position 不为static的祖先元素，如果没有则指向 body 元素。

scrollHeight   //只读属性。返回元素内容的整体尺寸，包括元素看不见的部分（需要滚动才能看见的）。
// 返回值 包括padding，但不包括margin和border 。


// 箭头函数
var double = (x) => x*2;
// 箭头函数是匿名函数
//  箭头函数省略了括号和return
x => x * x
//返回一个对象
// SyntaxError:
x => { foo: x }
// 正确写法,加个括号
x => ({ foo: x })
// 2个以上参数
(x,y) => x+y


setTimeout()
// 定时器仅仅只是计划代码在未来的某个时间执行。执行的时机也是不能保证的。并不是线程

绝对定位元素
// 绝对定位元素的宽度需要自己设置
// left:0;right:0 撑满屏幕


window.resizeTo(800,600)
window.moveTo(200,200)
window.open('https://www.baidu.com',"_blank",'width=200,height=200')


// 变量类型透明,最小化语句
var count = 0,
    draggable = false,
    now = new Date(),
    lists = [];

//松散耦合
// 应用的某一部分过于依赖另一部分,就是耦合过紧,难以维护
// html和js卸耦,避免在js中大量创造dom
// css 和js卸耦,添加或删除class




// HTMLCollection
var d = document.getElementsByTagName('div')  //返回一个动态的HTMLCollection集合
var d = document.querySelectorAll('div')    //返回一个nodelist,非动态



// 严格模式
// 严格模式使用较为严格的错误模式检测,可以尽早发现代码中的错误


// 判断b 是 a 的子节点
node.contains( otherNode ) 

// for in  遍历数据 
//  key 永远是一个字符串
var scores = [10,11,12];
var total = 0;

for(var key in scores){
  total += key;
}

var mean = total/scores.length;
console.log(mean);



//  this 指向
setTimeout() document.addEventListener() 
//  会使this指向全局对象,使用bind()绑定正确的对象


//  延迟运行
var id =setTimeout()  // 返回一个ID
clearTimeout(id)  // 阻止定时函数执行

//process.nextTick 允许你把一个回调放到下一次事件轮训队列的头上
process.nextTick(function(){
    // do sth here
})


//Map是一组键值对的数据结构，具有极快的查找速度。
var m = new Map();
console.log(typeof m);    //object
m.set('Ann', 67); // 添加新的key-value
m.has('Ann'); // 是否存在key 'Adam': true   
m.get('Ann'); // 67
m.delete('Ann'); // 删除key 'Adam'

//Set也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。
var s = new Set([1, 2, 3, 3, '3']);  // Set {1, 2, 3, "3"}  自动过滤了重复的key
console.log(s);
console.log(typeof s);    //object
//新增和删除
s.add(4)
s.delete(4)
//size属性
//map和set都有一个size属性,相当于length。



//Generator函数
function* helloWorldGenerator() {
  yield 'hello';    //yield语句就是暂停标志。
  yield 'world';    //next方法遇到yield就暂停执行后面的操作
  return 'ending';
}

var hw = helloWorldGenerator(); //Generator函数并不执行,而是记录了函数内部状态的指针
console.log(hw.next())  //{value: "hello", done: false}
console.log(hw.next())  //{value: "world", done: false}
console.log(hw.next())  //{value: "ending", done: true} done为true表示迭代结束
console.log(hw.next())  //{value: undefined, done: true}    

//解构赋值
//按照对应位置，对变量赋值。
var [a, b, c] = [1, 2, 3]; //a=1 b=2 c=3
let [ , , third] = ["foo", "bar", "baz"];  // third='baz'
let [head, ...tail] = [1, 2, 3, 4];   // head=1 tail=[2,3,4]
let [x, y, ...z] = ['a'];   // x='a' y=undefined z=[]

//交换变量的值
var x=1,y=2;
[x, y] = [y, x];  // x=2 y=1

//对象
var { foo, bar } = { foo: "aaa", bar: "bbb" }; //foo='aaa' bar='bbb'
//变量必须与属性同名，才能取到正确的值。
var { baz } = { foo: "aaa", bar: "bbb" };  // baz =undefined


// ES6 object
// getter setter

var o ={
    _age:1,
    get age () {
        return this._age;
    },
    set age (value) {
        if (value < this._age) {
          console.log('数值太小了！');
        }
        this._age = value;
    }
}

o.age    // 调用getter
o.age=5  // 调用setter
delete o.age  // 删除getter

// ES5 写法
var o = {
    _age:1
}
// 使用getter 和 setter 时,不允许使用writable和value这两个属性
Object.defineProperty(o,"age",{
    get:function (){
        return this._age;    
    },
    set:function (value){
        this._age = value;
    }
});


// Object.defineProperty(obj, prop, descriptor)
Object.defineProperty(obj,"test",{
    configurable:true,          // 是否可以删除或重写属性
    enumerable:true,            // 是否可以枚举
    value:任意类型的值,
    writable:true               // 是否可以修改value
});







// Object.create()
var o;

// 创建一个原型为null的空对象
o = Object.create(null);

o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);


//Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info("Shape moved.");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // 继承超类构造函数的属性
}

Rectangle.prototype = Object.create(Shape.prototype);  // 继承超类原型链属性

var rect = new Rectangle();

// Object.assign  适用于浅拷贝
// 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
var o1 = { a: 1 };var o2 = { b: 2 };var o3 = { c: 3 };
var obj = Object.assign(o1, o2, o3);   // 合并3个对象,返回target对象
// 属性名冲突时,用source的属性替换target的属性




Object.values()    //  返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
Object.keys(obj)   //  枚举自身属性,返回一个属性数组
for in   // 包括原型链上的属性



//  Object
Object.constructor === Function  // true 



//引用类型是由多个值构造的对象
//基本类型是简单的数据段

//引用类型可以添加属性和方法,也可以改变和删除方法

//基本类型添加属性会返回undefined
var she = "lemon";
she.age = 20;
console.log(she.age);   //undefined

//复制 -- 基本类型
var  price1 = 100;  //占用不同的内存空间
var  price2 = price1;//互不影响
price2 = 99 ;
console.log(price1 == price2)   //false 

//复制 -- 引用类型
var obj1 = new Object();
var obj2 = obj1;    //两个变量引用的是同一个对象
obj1.size = 10;     //添加属性时操作的是对象
console.log(obj1.size == obj2.size) //true

//操作a2时,也改变了a1的值,引用了同一个数组对象
var a1 = [1,2,3];
var a2 = a1;
a2.push(4);
console.log(a1) //[1, 2, 3, 4]



//基本类型检测 -- typeof
var s = "lemon"; console.log(typeof s) //string
var n = null;   console.log(typeof n) //object
var u;  console.log(typeof u)  //undefined

//引用类型检测 -- instanceof

//通过length增加or删除项
arr.length = 2; //删除了最后一项3  //arr.pop()
arr[arr.length] = "new";    //arr.push()
console.log(arr);   //[1, 2, "new"]



//变量是值的另一种形式
//函数名本身是一个变量,是函数的指针
var fn = function(){}
function(){}()    //  报错,function关键字是函数申明的开始,不能加()
(function(){})()  //  此时不在报错

//匿名函数模仿块级作用域
function check(count){
    (function(){
        for(var i=0;i<count;i++){
            alert(i);
        }
    })()
    alert(i);  //未定义 匿名函数执行结束,里面的变量被销毁
}



// ES5 和ES6 的构造函数
function C(age){
    this.age = age;
}   

var c = new C();
c.age = undefined;

class C {
    constructor(age) {
        this.age = age;
    }
}
var c = new C();
c.age = undefined;


// ES6 class
// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
// 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
class A {
    constructor(age) {
        this.age = age
    }
}

//  extends关键字实现继承
class B extends A {
    // 此时 A 和 B 一模一样
    // 这里隐式调用了constructor方法,并调用了super()方法
}

class B extends A {
    constructor(age) {
        // constructor 里面 不调用 super() 会报错,实例的this为undefined
    }
}

var b = new B()  // Uncaught ReferenceError: this is not defined
 

class B extends A{
  constructor(x, y,age) {
    // 构造函数
    super(age);  //  A.prototype.constructor.call(this)  //调用父类的构造函数
  }
    // 方法之间不需要逗号分隔，加了会报错。
  toString() {
    // 原型链方法
  }
}


// static 关键字,无法被实例调用
class StaticMethodCall {
    static staticMethod() {
        return 'hello';
    }
    static anotherStaticMethod() {
        return this.staticMethod() + ' world';
    }
}
StaticMethodCall.staticMethod();

var s = new StaticMethodCall();
s.staticMethod()  // s.staticMethod is not a function


// __proto__
// ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性



// import 和 export
// 这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，
// 效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
import { stat, exists, readFile } from 'fs';   //加载 fs 的三个属性

// 由于import是静态执行，所以不能使用表达式和变量，以及if语句，这些只有在运行时才能得到结果的语法结构。
// 报错
import { 'f' + 'oo' } from 'my_module';   // 表达式

// 报错
let module = 'my_module';      // 变量
import { foo } from module;

// 报错
if (x === 1) {                // if语句 
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}


// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

export function multiply(x, y) {
  return x * y;
};

// 报错
export 1;

// 报错
var m = 1;
export m;

// 上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，
// 第二种写法通过变量m，还是直接输出1。1只是一个值，不是接口。正确的写法是下面这样。

// 正确写法
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

// export default   导入时可以用任意名字
// export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。
// export-default.js
export default function () {
  console.log('foo');
}
// import-default.js
import customName from './export-default';
customName(); // 'foo'



























*/