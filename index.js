var express = require('express');
var app = express();
var http = require('http')
var socketIO = require('socket.io');
var server;
var io;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server = http.Server(app); // here we tell http we want to use express app to hanlde http requests

// Starting a server by providing a port
server.listen(5000, () => {
    console.log(`Server listening on PORT 5000`)
});

// Giving server to socket.io to listen 
io = socketIO(server);

io.on('connection', function (socket) {
    socket.emit('greeting-from-server', {
        greeting: 'Hello client'
    });
    socket.on('greeting-from-client', function (message) {
        console.log(message);
    });
});