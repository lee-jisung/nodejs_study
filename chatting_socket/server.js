const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('chat'); // root page로 접속 시 chat.pug rendering
});

let count = 1;
io.on('connection', socket => {
  // 채팅방에 접속했을 때
  console.log('user connected: ', socket.id); //socket id별로 console에 찍음
  let name = '익명' + count++; // 새로운 name 생성 (user가 들어왓던 수를 뒤에 붙여줌)
  console.log(name);
  socket.name = name; // user의 socket에 name을 부여
  io.to(socket.id).emit('create name', name); // socket.id를 가진 user에게 create name event 발생시키고, name 전달
  io.emit('new_connect', name);

  socket.on('disconnect', () => {
    // 채팅방 접속이 끊어졌을 때
    console.log(`user disconnected: ${socket.id} ${socket.name}`);
    io.emit('new_disconnect', socket.name);
  });

  // send message event로 client가 발생시켰을 때
  // 해당 user의 name과 text를 parameter로 받아옴
  socket.on('send message', (name, text) => {
    // 메세지를 보냈을 때
    const msg = `${name} : ${text}`; // 이름 + text로 msg 구성
    if (name != socket.name) io.emit('change name', socket.name, name);
    socket.name = name; // user가 name을 변경했을 때를 대비하여 socket에 이름 부여
    console.log(msg);
    io.emit('receive message', msg); // 모든 user에게 receive message event를 발생시키고, msg 전달
  });
});

http.listen(3000, () => {
  console.log('server on...');
});

// 추가 기능 -> 실시간으로 접속중인 유저 이름 list 표현
//          -> UI 더 이쁘게
//          -> ...
