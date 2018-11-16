var http = require("http");
var qs = require("querystring");

var server = http.createServer(function(req, res) {
    console.log("\n");
    console.log(req.method, req.url);

    console.log("\nHeaders:\n", req.headers);

    let body = "";
    req.on("data", function(chunk) {
        body += chunk;
    })

    req.on("end", function() {
        console.log("\nBody\n", body);

        res.writeHead(200, "{ Content-Type: application/json }");
        res.end('{ "msg": "well done!" }');
    })
})

server.listen(8000);

console.log(`Server running on 172.16.31.160:8000`);