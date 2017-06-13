


nodejs 抛出错误后，代码将不在执行

// npm
npm config set save-exact true

// express

中间件的加载顺序很重要！比如：通常把日志中间件放到比较靠前的位置，
后面将会介绍的 connect-flash 中间件是基于 session 的，所以需要在 express-session 后加载。


// 路由的精准匹配
app.get("/a/b",function(req,res){		// 无法匹配 /a/b/c  可以匹配/a/b?name=eee
    res.write("SB");
    res.end();
})


// 可以把函数挂载到app.locals下，这样就可以全局使用
app.locals.moment = require("moment");


// 安装 bcrypto
npm install -g node-gyp  // 先安装这个


// express-formidable 
body-parser 只能解析表单数据，不能处理文件上传  可以用express-formidable比较方便



// cookie-parser
通过 req.cookies 可以取到传过来的cookie，并把它们转成对象。

// express-session   已经不在依赖cookie-parser
将 session 存在 服务器 内存中 会导致 内存泄露,难以扩展 等问题

// connect-mongo   MongoDB session store for Connect and Express


ejs
// 需要对输出变了进行处理时可以在输出时直接使用JS进行处理
// <td><%= moment(movie.meta.createAt).format("YYYY-MM-DD") %></td>


// mongoose
Mongoose 通过 Schema 支持文档校验，虽说 mongodb是no schema的，但在生产环境中使用Schema有两点好处。
一是对文档做校验，防止非正常情况下写入错误的数据到数据库，
二是可以简化一些代码，如类型为 ObjectId 的字段查询或更新时可通过对应的字符串操作，
不用每次包装成 ObjectId 对象。

查询到的数据返回的是一个数组，判断是否存在用length

先new 一个 model的实例，可以调用save方法保存数据到数据库


// express session
session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，
当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 
将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的
session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user。



// session  cookie
同一用户的每次登录都会生成一个不一样的session

设置httponly 以后 ，客户端JS无法读取到，也无法看到cookie

服务端session丢失以后，客户端将退出登录

用户退出登录时，应该删除服务端的session




var id ="   "; id.length是3 id不为空
可以用id.trim()来判断



静态方法,不需要实例化,也可以调用


// bootstrap
data-dismiss="modal"  // 控制模态框显示隐藏
data-toggle			  // 动作
data-target			  // 目标
