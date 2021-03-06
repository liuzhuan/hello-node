# TCP 通信

在 Node.js 中，提供了一个 net 模块，专用于实现 TCP 服务器与 TCP 客户端之间的通信。

## 创建 TCP 服务器

在 Node.js 中，可以很方便地创建一个 TCP 服务器，只需调用 net 模块中的 `createServer` 方法即可：

```js
var server = net.createServer([options], [connectionListener])
```

下面是一个例子：

```js
const net = require('net')

const server = net.createServer(c => {
    console.log('client connected')
    c.on('end', () => {
        console.log('client disconnected')
    })
    c.write('hello\r\n')
    c.pipe(c)
})

server.on('error', err => {
    throw err
})

server.listen(8124, () => {
    console.log('server bound')
})
```

使用 `telnet` 就可以测试：

```sh
telnet localhost 8124
```

## REF

- [net.createServer][createServer]

[createServer]: https://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener