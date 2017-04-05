
// 同步方法快于异步,同步方法不会延迟执行。但同步方法会阻塞线程

// 继承
util.inherits(a,b);  // a继承b在原型链上的属性和方法,构造函数内部的属性和方法无法继承
// 封装了ES5 的 Object.create()  node中将父类的构造函数保存在super_属性中
function MusicPlayer(){
	events.EventEmitter.call(this)
}
util.inherits(MusicPlayer,events.EventEmitter);
console.log(MusicPlayer.super_ === events.EventEmitter)


// 继承 构造函数中的属性和方法
function B(){
	this.age =22;
}
B.prototype.height = 170

function A() {
	o.call(this);
	this.juice = 'apple';
}


// 当前文件
fs.createReadStream(__filename)  // 读取当前文件


// assert 断言
assert.equal(count,1)  //比较是否相等


// 全局对象 能被用在所有的模块中
process  // 用来与操作系统通信
Buffer   // 对二进制数据的支持
module   // 仅仅存在于当前模块


// npm 
npm search express  // 搜索模块 可以使用正则

// 模块加载
// 一个模块被加载以后,它将被缓存,这通常是高效的,不用担心重复加载的开销
require.resolve.(id)  //返回文件的绝对路径  repl模式下

// 将目录作为模块  创建一个index.js,通过require加载各个文件
// grounp/index.js
module.exports ={
	one:requre('one'),
	two:require('two')
}
// 加载
var group = require('group');
group.one();
group.two();



// 路径
__filename   //  当前文件 
__dirname    //  当前文件的绝对路径   C:\Users\115A\Desktop\git\node
var index = __dirname + 'index.js';  //拼接路径   windows 和 UNIX 支持
var index = path.join(__dirname,'index.js')  // 更安全


// 标准IO 和 console
process.stdin.resume()   // 从操作系统中读入
process.stdin.setEncoding('utf8');
process.stdin.on('data',function(text){
	process.stdin.write(text.toUpperCase())  // 输出到操作系统进程
})

// 平台信息
process.arch  // x64 / ia32  系统架构
process.platform  // win32   平台信息
process.memoryUsage()   // {ress:常住内存大小,heapTotal:动态分配的可用内存,heapUsed:已使用的堆大小}
process.pid  // 当前进程的进程号

// 传递命令行 参数
process.argv  // 数组  如果有,前两个参数是node和这个脚本的名字
[ 
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\115A\\Desktop\\git\\node\\test.js',
  '2007',
  '0403'
]
// 常用参数解析模块
commander  optimist


// 退出程序,指定退出码
process.exit(1)  // node默认返回0的退出状态,非0的状态被认为是一个错误


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



// 基准测试
console.time()
console.timeEnd()


// Buffer
const buf = Buffer.alloc(5, 'a');   //  分配5个字节,Buffer的长度,用a填充
var text = buf.toString(encoding)   // 默认转换为utf8格式,接收其他类型编码,如base64,ascii
Buffer.from(string[, encoding])   //  第二个参数是第一个参数的类型


// 异常处理
// 当一个EventEmitter 实例发生错误时,通畅会发出一个error事件。
// 在node中,error事件被当做特殊的情况,加入没有监听器,默认打印一个堆栈,并退出程序



// 无论你在使用什么模块, 找一下emit 和 on 这两个方法
// Express的app对象就有这些方法,并且它们非常适合在应用中发消息

// EventEmitter 本质上是观察者模式


 
// stream   异步  流的进化是为了提供事件驱动的API搞笑解决非阻塞IO的问题
stream.Readable  // 可读流
stream.writable  // 可写流
stream.Duplex  // 双工流
stream.Transform  // 转换流
var rs = require('fs').createReadStream('index.js');
console.log(rs instanceof stream.Readable)  // true




// 在cmd输出
console.log('haha');       // 同步
process.stdout.write('haha');   // 同步
fs.writeSync(1,'hahahahahaha');  // 使用文件描述符fd
fs.write(1,'hahahahahaha');		 // 异步方法



// 使用文件锁  防止多个进程同时修改一个文件

// x标记,以独占模式代开
fs.writeFile('config.lock','wx',function(err){

})

// 写入进程号
fs.writeFile('config.lock',process.pid,{flags:'wx'},function(err){

})

//将锁文件创建出一个文件夹  mkdir是一个原子性的操作,没有并发,支持跨平台。目录存在时,操作将失败


// http请求是非阻塞的




















// 返回二进制数据   一次性读取到内存,不适合大文件
fs.readFile('index.js',function(err,buf){
	Buffer.isBuffer(buf)  // true
	var text = buf.toString()   // 默认转换为utf8格式
})


// 同步版本,返回文件内容,如果有错误,将自动抛出。异步方法把error作为回调函数的第一个参数
fs.readFileSync(file[, options]) 

// 使用try-catch 捕获同步的错误
var fs = require('fs');
try{
	fs.readFileSync('a.txt');
}catch(err){
	console.error(err);
}



fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});

// 第一个参数是 string / fd
// 第二个参数是 Buffer / string









//事实上脚本文件的扩展名不一定是 .js，例如我们将脚本保存为 script.txt，使用 node script.txt 命令同样可
//以运行。扩展名使用 .js 只是一个约定而已，遵循了 JavaScript 脚本一贯的命名习惯。

// 在开发 Node.js 实现的 HTTP 应用时会发现，无论你修改了代码的哪一部份，都必须终止
// Node.js 再重新运行才会奏效。这是因为 Node.js 只有在第一次引用到某部份时才会去解析脚
// 本文件，以后都会直接访问内存，避免重复载入，而 PHP 则总是重新读取并解析脚本（如
// 果没有专门的优化配置）。Node.js的这种设计虽然有利于提高性能，却不利于开发调试，因
// 为我们在开发过程中总是希望修改后立即看到效果，而不是每次都要终止进程并重启。

//require 不会重复加载模块，也就是说无论调用多少次 require， 获得的模块都是同一个。

var server = new http.Server();
server.on('request',function (request, response) { })  //两者等价
http.createServer(function (request, response) { })   //两者等价


//exapmle
> require('url').parse('/status?name=ryan')
{
  href: '/status?name=ryan',
  search: '?name=ryan',
  query: 'name=ryan',
  pathname: '/status'
}
> require('url').parse('/status?name=ryan', true)
{
  href: '/status?name=ryan',
  search: '?name=ryan',
  query: {name: 'ryan'},
  pathname: '/status'
}



fs.write(fd, data, function(err, written, string){ ' written 指传入的字符串被写入多少字节'})
// 必须是已存在的文件,否则报错
// 第一个参数必须是fd---file description, 否则报错
// 以追加的方式写入文件末尾

// 多次对同一文件使用 fs.write 且不等待回调，是不安全的。 对于这种情况，强烈推荐使用 fs.createWriteStream。
// 在 Linux 上，当文件以追加模式打开时，指定位置的写入是不起作用的。 内核会忽略位置参数，并总是将数据追加到文件的末尾。

fs.writeFile(file, data, function(err){ "只有一个参数err" } )
// 可以是文件名或fd,如果是fd,则文件不会被自动关闭
// 如果文件已经存在，则替代文件

//多次对同一文件使用 fs.writeFile 且不等待回调，是不安全的。 对于这种情况，强烈推荐使用 fs.createWriteStream。


fs.writeSync(file, data, options)
// fs.write() 的同步版本。返回写入的字节数。

fs.writeFileSync(file, data, options)
// 同步版本,返回undefined




fs.existsSync(path)
// 返回true/false


//文件的属性读写
fs.stat(path, function(err,stats){
    //stats is a fs.Stats object
    stats.isFile()
    stats.isDirectory()
})


//文件权限
fs.fchmod(fd, mode,function(err){})
//fd：文件描述符
//mode:文件的权限,如0777


fs.open(path, flags, mode, function(err,fd){})
// a, 以追加模式打开文件。如果文件不存在，则会被创建。


复制并移动文件
fs.link("ccc.txt", "C:/Users/Administrator/Desktop/ccc.txt", function(err){
    if (err) {
        throw err;
    } 
})

删除文件
fs.unlink(path,function(err){ })
fs.unlinkSync(path) //返回undefined


新建文件
fs.mkdir(path, mode, function(err){ })   
fs.mkdirSync(path, mode)   //返回undefined


//移动文件
fs.rename(oldPath, newPath, callback)   //重命名并移动
fs.renameSync(oldPath, newPath)     //重命名并移动


//遍历目录
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}


//node取参数的三种方式
req.params   req.body   req.query


var express = require('express');
var app = express();
//获取get请求的参数
app.get("*", function(req, res) {
　　console.log(req.query.参数名);
　　res.send("测试query属性!");
});

request的一些属性
// complete 客户端请求是否已经发送完成
// httpVersion HTTP 协议版本，通常是 1.0 或 1.1
// method HTTP 请求方法，如 GET、POST、PUT、DELETE 等
// url 原始的请求路径，例如 /static/image/x.jpg 或 /user?name=byvoid
// headers HTTP 请求头
// trailers HTTP 请求尾（不常见）
// connection 当前 HTTP 连接套接字，为 net.Socket 的实例
// socket connection 属性的别名
// client client 属性的别名


request的三个事件
//data ：当请求体数据到来时，该事件被触发。该事件提供一个参数 chunk ，表示接收到的数据。
//end ：当请求体数据传输完成时，该事件被触发，此后将不会再有数据到来。
//close:用户当前请求结束时，该事件被触发。不同于end,如果用户强制终止了传输，也还是调用 close 。


//events 模块只提供了一个对象:events.EventEmitter 。 
//EventEmitter 的核心就是事件发射与事件监听器功能的封装。
var events = require('events');
var emitter = new events.EventEmitter();
//常用接口
EventEmitter.on(event, listener) 
//为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数 listener 。
EventEmitter.emit(event, [arg1], [arg2], [...]) 
//发射 event 事件，传递若干可选参数到事件监听器的参数表。
EventEmitter.once(event, listener) 
//为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。
EventEmitter.removeListener(event, listener) 
//移除指定事件的某个监听器， listener 必须是该事件已经注册过的监听器。


//npm 提供了一个有趣的命令 npm link， 它的功能是在本地包和全局包之间创建符号链
//接。我们说过使用全局模式安装的包不能直接通过 require 使用，但通过 npm link 命令
//可以打破这一限制。