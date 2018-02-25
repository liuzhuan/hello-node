# 加密解密

在 Node.js 中，使用 `crypto` 模块来实现数据的加密和解密处理。

## crypto 模块概述

在 Node.js 中，使用 OpenSSL 类库作为其内部实现加密与解密处理的基础手段，封装在 `crypto` 模块中。

crypto 模块中包含了类似 MD5 或 SH-2 之类的散列算法。开发者也可以通过 crypto 模块来实现 HMAC 运算。

> HMAC（Hash-based Message Authentication Code，散列运算消息认证码）运算利用散列算法，以一个密钥和一个消息为输入，生成一个消息摘要作为输出。HMAC 运算可以用来验证两段数据是否匹配，以确认该数据没有被篡改。

在 crypto 模块中，为每种加密算法定义了一个类。可以使用 `getCiphers` 方法来查看 Node.js 中能够使用的所有加密算法。使用方法如下：

```js
crypto.getCiphers()
/**
* [ 'aes-128-cbc', 'aes-128-cbc-hmac-sha1', .... ] 
* 共 119 个数组元素，Node.js v8.0.0
*/
```

可以使用 `getHashes` 方法来查看所有散列算法。用法如下：

```js
crypto.getHashes()
// => [ 'DSA', 'DSA-SHA', ... ]
```

## 散列算法

散列（也称哈希）算法用来实现一些重要处理，例如，在允许对一段数据进行验证的前提下，将数据模糊化，或者为一大段数据提供一个校验码。

在 Node.js 中，为了使用散列算法，首先应该使用 `createHash` 方法创建一个 `hash` 对象：

```js
const hash crypto.createHash(algorithm)
```

`createHash` 方法的参数是一个算法名称，比如 'sha1', 'md5', 'sha256', 'sha512' 和 'ripemd160' 等，用于指定需要使用的散列算法。该方法返回被创建的 hash 对象。

在创建了一个 hash 对象后，可以通过使用该对象的 `update` 方法创建一个摘要：

```js
hash.update(data, [input_encoding])
```

`data` 为必选参数，类型为 Buffer 或字符串。`input_encoding` 参数指定摘要内容所需使用的编码格式，可以为 'utf8', 'ascii' 或 'binary'。如果不使用 `input_encoding` 参数，则 `data` 参数值必须为一个 `Buffer` 对象。可以在摘要被输出前使用多次 `update` 方法来添加摘要内容。

可以使用 hash 对象的 `digest` 方法来输出摘要内容。在使用了 hash 对象的 `digest` 方法后，不能再向 hash 对象中追加摘要内容。使用方法如下：

```js
hash.digest([encoding])
```

`digest` 有一个可选参数，用于指定输出摘要的编码格式，可指定参数值为 'hex', 'binary' 及 'base64'。如果使用了该参数，digest 返回字符串格式的摘要内容，否则，返回一个 Buffer 对象。在 hash 对象的 `digest` 方法被调用之后，该对象不能再被使用。

下面是一个散列算法的使用示例：

```js
const crypto = require('crypto')
const fs = require('fs')

const shasum = crypto.createHash('sha1')
const s = fs.createReadStream('./app.js')
s.on('data', function(d) {
    shasum.update(d)
})
s.on('end', function() {
    var d = shasum.digest('hex')
    console.log(d)
})
```

## HMAC 算法

HMAC 算法将散列算法与一个密钥结合在一起，以阻止对签名完整性的破坏。

在 Node.js 中，为了使用 HMAC 算法，首先应该使用 `createHmac` 方法创建一个 hmac 对象：

```js
/**
* @param {string} algorithm - 使用的散列算法，比如 'sha1', 'md5' 等
* @param {string} key - 指定一个 PEM 格式密钥
*/
const hmac = crypto.createHmac(algorithm, key)
```

在 OpenSSL 中，可以使用如下命令创建一个密钥：

```sh
openssl genrsa -out key.pem 1024
```

创建 hmac 对象后，可以通过使用该对象的 `update` 方法来创建一个摘要：

```js
/**
* @param {Buffer|string} data - 用于指定摘要内容
*/
hmac.update(data)
```

可以在摘要被输出前使用多次 `update` 方法来添加摘要内容。

使用 hmac 对象的 `digest` 方法输出摘要内容：

```js
/**
* @param {string?} encoding - 指定输出摘要的编码格式，比如 'hex', 'binary' 和 'binary'
* @return {Buffer|string}
*/
hmac.digest(encoding)
```

下面是一个使用 HMAC 算法的案例：

```js
const crypto = require('crypto')
const fs = require('fs')
const pem = fs.readFileSync('key.pem')
const key = pem.toString('ascii')
const shasum = crypto.createHmac('sha1', key)
const s = fs.createReadStream('./app.js')
s.on('data', d => shasum.update(d))
s.on('end', () => {
    const d = shasum.digest('hex')
    console.log(d)
})
```

## 公钥加密



## REF

- [Journey into cryptography - khan][khan]
- [Node.js 权威指南 - 第11章 加密和压缩][essential]，陆凌牛，2014/04/01，机械出版社

[khan]: https://www.khanacademy.org/computing/computer-science/cryptography
[essential]: https://book.douban.com/subject/25892704/