

// ctx
{
	"request": {
		"method": "GET",
		"url": "/",
		"header": {
			"host": "localhost:3000",
			"connection": "keep-alive",
			"cache-control": "max-age=0",
			"upgrade-insecure-requests": "1",
			"user-agent": "Mozilla/5.0",
			"accept": "text/html,application/xhtml+xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
			"accept-encoding": "gzip, deflate, br",
			"accept-language": "zh-CN,zh;q=0.8,en;q=0.6",
			"cookie":"cookie"
		}
	},
	"response": {
	"status": 200,
	"message": "OK",
	"header": {
		"content-type": "application/json; charset=utf-8",
	}
	},
	"app": {
		"subdomainOffset": 2,
		"proxy": false,
		"env": "development"
	},
	"originalUrl": "/",
	"req": "<original node req>",
	"res": "<original node res>",
	"socket": "<original node socket>"
}


// next
function next() {
  return dispatch(i + 1)
}


// await next();
执行下一个中间件