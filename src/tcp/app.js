var net = require("net");

var server = net.createServer(function(socket) {
    console.log("Client and server have been connected");
    server.getConnections(function(err, count) {
        console.log("There are current %d clients connected.", count);
        server.maxConnections = 2;
        console.log("The maximum of TCP connections is %d.", server.maxConnections);
    })

    server.close(function() {
        console.log("TCP Server is closed.");
    })
});

server.listen(3333, "localhost", function() {
    console.log("Server starts to listening");
    const address = server.address();
    console.log("The address listened is %j:", address);
})

server.on("error", function(e) {
    console.log("error:", e);
})