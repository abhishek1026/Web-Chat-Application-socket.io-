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
<<<<<<< HEAD
    }
    else if (nicknames.length >= 10) {
      callback("full");
    }
=======
    }
    else if(nicknames.length >= 10){
      callback("full");
    }
>>>>>>> f17c20ca431ec078fa223f1e7b6280fc8360aaf9
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
<<<<<<< HEAD
    io.emit('loser', socket.nickname);
=======
>>>>>>> f17c20ca431ec078fa223f1e7b6280fc8360aaf9
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
<<<<<<< HEAD
    if (nicknames.indexOf(nick) == 9) {
      callback("olive");
    }

  });

  socket.on('full', function (user) {
    console.log(user + ' cannot enter full lobby!');
  });

  socket.on('grabtime', function (some, callback) {
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    if (min >= 0 && min < 10) {
      min = "0" + min;
    }
    if (hour > 12) {
      if (hour < 21) {
        hour = "0" + (hour - 12);
      }
      else {
        hour = (hour - 12);
      }
    }
    else if (hour == 0) {
      hour = "12";
    }
    else if (hour > 0 && hour < 10) {
      hour = "0" + hour;
    }
    var ftime = hour + ":" + min;
    if(some == socket.nickname){
      console.log('message sent on: ' + ftime + " by " +some);
    }
    
    callback(ftime);
  });

  socket.on('checkself', function (data, callback) {
    if (socket.nickname == data.nick) {
      callback(true);
    }
    else {
      callback(false);
    }
=======
    if (nicknames.indexOf(nick) == 9){
      callback("olive");
    }

>>>>>>> f17c20ca431ec078fa223f1e7b6280fc8360aaf9
  });

});

http.listen(3000, function () {
  console.log('listening on port:3000');
});
