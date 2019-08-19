var WebSocketServer = require('websocket').server;
var http = require('http');
var connections = [];

console.log('WebSocketServer is on.');
var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  connections.push(connection);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    console.log(message);
    connections.forEach((newConnection) => {
      if (connection !== newConnection) {
        newConnection.send(message.utf8Data);
      }
    });
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});
