/**
 * 本文件用来测试 `https.request` 的用法
 * 后台接口 http://api.myjson.com/bins/wszkv
 */

const https = require('https')

const options = {
    hostname: 'api.myjson.com',
    port: 443,
    path: '/bins/wszkv',
    method: 'GET'
}

console.log(options)

const req = https.request(options, res => {
    console.log(res.statusCode, res.headers)

    res.setEncoding('utf8')

    res.on('data', chunk => {
        console.log(chunk, typeof chunk)
        const obj = JSON.parse(chunk)
        console.log(obj.data)
    })
})

req.on('error', e => {
    console.error(`problem with request: ${e.message}`)
})

req.end()
