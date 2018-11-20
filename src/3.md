# TCP 服务器

在 Node.js 中，提供了一个 `net` 模块，专用于实现 TCP 服务器与 TCP 客户端之间的通信。

## 创建

在 Node.js 中，可以很方便地创建一个 TCP 服务器，只需调用 net 模块中的 `createServer` 方法即可。

下面是一个简单的聊天服务器，来自《Node即学即用》

```js
var net = require("net");

var chatServer = net.createServer();
var clientList = [];

chatServer.on("connection", function(client) {
    client.name = client.remoteAddress + ":" + client.remotePort;
    client.write("Hi " + client.name + "!\n");
    console.log(client.name + " joined");

    clientList.push(client);

    client.on("data", function(data) {
        broadcast(data, client);
    });

    client.on("end", function() {
        console.log(client.name + " quit");
        clientList.splice(clientList.indexOf(client), 1);
    });

    client.on("error", function(e) {
        console.log(client.name + " has error: ", e);
    });
})

function broadcast(message, client) {
    var cleanup = [];

    for (var i = 0; i < clientList.length; i++) {
        if (client !== clientList[i]) {
            if (clientList[i].writable) {
                clientList[i].write(client.name + " says " + message);
            } else {
                cleanup.push(clientList[i]);
                clientList[i].destroy();
            }
        }
    }

    for (i = 0; i < cleanup.length; i++) {
        clientList.splice(clientList.indexOf(cleanup[i]), 1);
    }
}

chatServer.listen(9000);
```

连接时使用 `telnet 127.0.0.1 9000` 即可。

## REF

- [net.createServer][createServer]

[createServer]: https://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener