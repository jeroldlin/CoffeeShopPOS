var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use("/lib", express.static(__dirname + '/lib'));

app.get('/kitchen/', function(req, res){
  res.sendFile(__dirname + '/kitchen.html');
});

app.use("/kitchen/lib", express.static(__dirname + '/lib'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});


//for POS

io.on('connection', function(socket){
  socket.on('new order', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('new order', function(msg){
    io.emit('new order to kitchen', msg);
  });
});