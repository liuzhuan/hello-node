# HTTP 客户端

在 `http` 模块中，可以使用 `request` 方法请求数据。使用方式如下：

```js
var req = http.request(options, callback)
```

其中，`options` 为一个对象或字符串，用于指定请求的目标 URL 地址。若是对象，可以使用的属性包括：

- `host` 域名或 IP 地址
- `hostname` 
- `port`
- `method` 请求方法，默认为 `GET`
- `path` 指定请求路径及查询字符串
- `headers`

返回值是一个 `http.ClientRequest` 实例。该实例是可写流。如果需要通过 POST 方法上传文件，可以向 `ClientRequest` 实例写数据。

例子如下：

```js
const postData = querystring.stringify({
    'msg': 'Hello World!'
})

const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
}

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
    res.setEncoding('utf8')

    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`)
    })

    res.on('end', () => {
        console.log('No more data in response')
    })
})

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`)
})

req.write(postData)
req.end()
```

详见[例子][demo]。

注意，每个 `request()` 方法必须有一个 `end()` 函数，用来指示请求的结束。

## REF

- [http.request][http.request]

[http.request]: https://nodejs.org/api/http.html#http_http_request_options_callback
[demo]: ./app.js