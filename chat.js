var WebSocketServer = require("ws").Server
var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))
app.use("/styles",express.static(__dirname + "/styles"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

var server = http.createServer(app);
server.listen(port);

var wss = new WebSocketServer({server: server});
console.log("websocket server created");

wss.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on("close", function(){
    console.log('websocket connection closed');
  });
});
