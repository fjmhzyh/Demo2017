
// 常用命令
nginx -s reload     // 重启nginx
nginx -s stop 		// 停止nginx
tasklist /fi "imagename eq nginx.exe"   // 查看nginx 进程


// nginx使用一个多进程模型来对外提供服务
nginx在启动后，在unix系统中会以daemon的方式在后台运行，后台进程包含一个master进程和多个worker进程。

// master 进程
master进程主要用来管理worker进程，包含：接收来自外界的信号，向各worker进程发送信号，
监控worker进程的运行状态，当worker进程退出后(异常情况下)，会自动重新启动新的worker进程。

// worker 进程
worker进程之间是平等的，每个进程，处理请求的机会也是一样的。当我们提供80端口的http服务时
，一个连接请求过来，每个进程都有可能处理这个连接。

// 独立进程 优点
采用独立的进程，可以让互相之间不会影响，一个进程退出后，其它进程还在工作，
服务不会中断，master进程则很快启动新的worker进程。


// 异步非阻塞的方式来处理请求
nginx采用多worker的方式来处理请求，每个worker里面只有一个主线程，那能够处理的并发数很有限啊，
多少个worker就能处理多少个并发，何来高并发呢？非也，这就是nginx的高明之处，
nginx采用了异步非阻塞的方式来处理请求，也就是说，nginx是可以同时处理成千上万个请求的。


// apache 的工作方式
每个请求会独占一个工作线程，当并发数上到几千时，就同时有几千的线程在处理请求了。
这对操作系统来说，是个不小的挑战，线程带来的内存占用非常大，线程的上下文切换带来的cpu开销很大，
自然性能就上不去了，而这些开销完全是没有意义的。


// worker的数量
推荐设置worker的个数为cpu的核数，在这里就很容易理解了，更多的worker数，
只会导致进程来竞争cpu资源了，从而带来不必要的上下文切换。


// connection
在nginx中connection就是对tcp连接的封装，其中包括连接的socket，读事件，写事件。
利用nginx封装的connection，我们可以很方便的使用nginx来处理与连接相关的事情，
比如，建立连接，发送与接受数据等。而nginx中的http请求的处理就是建立在connection之上的，
所以nginx不仅可以作为一个web服务器，也可以作为邮件服务器。
当然，利用nginx提供的connection，我们可以与任何后端服务打交道。

// 作为客户端
nginx也是可以作为客户端来请求其它server的数据的（如upstream模块）



// nginx 模块
nginx模块一般被分成三大类：handler、filter和upstream。
利用handler、filter这两类模块，可以使nginx轻松完成任何单机工作。
upstream模块，将使nginx跨越单机的限制，完成网络数据的接收、处理和转发。


// handler
Handler模块就是接受来自客户端的请求并产生输出的模块。


// filter
过滤（filter）模块是过滤响应头和内容的模块，可以对回复的头和内容进行处理。
它的处理时间在获取回复内容之后，向用户发送响应之前。
它的处理过程分为两个阶段，过滤HTTP回复的头部和主体，在这两个阶段可以分别对头部和主体进行修改。


// upstream
upstream属于handler，只是他不产生自己的内容，而是通过请求后端服务器得到内容，
所以才称为upstream（上游）。请求并取得响应内容的整个过程已经被封装到nginx内部
，所以upstream模块只需要开发若干回调函数，完成构造请求和解析响应等具体的工作。


// 负载均衡模块 
负载均衡模块用于从”upstream”指令定义的后端主机列表中选取一台主机。
nginx先使用负载均衡模块找到一台主机，再使用upstream模块实现与这台主机的交互。


// 1. 核心指令”ip_hash”只能在upstream {}中使用。这条指令用于通知nginx使用ip hash负载均衡算法。
// 如果没加这条指令，nginx会使用默认的round robin负载均衡模块。
upstream test {
    ip_hash;
    server 192.168.0.1;
    server 192.168.0.2;
}



// 配置项


// http
提供http服务相关的一些配置参数。例如：是否使用keepalive啊，是否使用gzip进行压缩等。

// server
http服务上支持若干虚拟主机。每个虚拟主机一个对应的server配置项，配置项里面包含该虚拟主机相关的配置。

// location
http服务中，某些特定的URL对应的一系列配置项。

// 普通的url匹配
location / {
    root   D:/web/;
    index  index.html index.htm;
}

// 精准url匹配
location = / {}  

/// 抢占式前缀匹配的路径
location ^~ / {}