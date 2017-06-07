url slug

// 不合理的url结构
http://taobo.com/products/65cd4fa5f41a2f6

// 有意义的url结构
http://taobo.com/products/skirt-6202

// 这种用户友好的永远链接通常叫做slug,我们通常推荐为文档做一个slug字段来构建有意义的url
// 这种字段通常唯一索引，以加速查询和确保唯一


url 中的域名不区分大小写，但是路径和文件名可能会区分大小写




// session 和 cookie
设置httponly 以后 ，客户端JS无法读取到，也无法看到cookie

服务端session丢失以后，客户端将退出登录
同一用户的每次登录都会生成一个不一样的session

session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}。
当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 
set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过
带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user。