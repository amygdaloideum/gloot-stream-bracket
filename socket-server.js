var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('an user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('SHOW_PAIR', function(msg){
    console.log('message: ' + msg);
    io.emit('SHOW_PAIR', msg);
  });
  socket.on('UPDATE_SCORE', function(msg){
    console.log('score: ' + msg);
    io.emit('UPDATE_SCORE', msg);
  });
  socket.on('SET_HIDDEN', function(msg){
    console.log('hidden: ' + msg);
    io.emit('SET_HIDDEN', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});