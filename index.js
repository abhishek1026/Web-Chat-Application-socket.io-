var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
nicknames = [];

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('random user landed!');

  socket.on('new user', function (data, callback) {
    console.log('username registration attempt');
    if (nicknames.indexOf(data) != -1 || data == '') {
      callback("taken");
    }
    else if(nicknames.length >= 10){
      callback("full");
    }
    else {
      socket.nickname = data;
      nicknames.push(socket.nickname);
      updateNicknames();
      callback(true);
    }
  });

  function updateNicknames() {
    io.sockets.emit('usernames', nicknames);
  }

  socket.on('chat message', function (msg) {
    io.emit('chat message', { msg: msg, nick: socket.nickname });
    console.log('message delivered by ' + socket.nickname + ': ' + msg);
  });

  socket.on('disconnect', function () {
    if (!socket.nickname) {
      console.log('random user fled!');
      return;
    }
    console.log(socket.nickname + ' disconnected');
    nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    updateNicknames();
  });

  socket.on('userentry', function (user) {
    console.log(user + ' successfully joined chat room!');
  });

  socket.on('invalid', function (crap) {
    console.log('login attempt failed:');
    if (crap != '') {
      console.log(crap + ' is already in the system!');
    }
    else
      console.log('random user tried to enter blank username!');
  });

  socket.on('message attempt', function (msg) {
    console.log(socket.nickname + ' is attempting to send a message!');
  });

  socket.on('message fail', function (msg) {
    console.log(socket.nickname + ' failed to send message because content is blank!');
    io.emit('yousuck', socket.nickname);
  });

  socket.on('getUserColor', function (nick, callback) {

    if (nicknames.indexOf(nick) == 0) {
      callback("blue");
    }
    if (nicknames.indexOf(nick) == 1) {
      callback("brown");
    }
    if (nicknames.indexOf(nick) == 2) {
      callback("green");
    }
    if (nicknames.indexOf(nick) == 3) {
      callback("pink");
    }
    if (nicknames.indexOf(nick) == 4) {
      callback("purple");
    }
    if (nicknames.indexOf(nick) == 5) {
      callback("maroon");
    }
    if (nicknames.indexOf(nick) == 6) {
      callback("navy");
    }
    if (nicknames.indexOf(nick) == 7) {
      callback("silver");
    }
    if (nicknames.indexOf(nick) == 8) {
      callback("teal");
    }
    if (nicknames.indexOf(nick) == 9){
      callback("olive");
    }

  });

});

http.listen(3000, function () {
  console.log('listening on port:3000');
});
