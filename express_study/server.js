const app = require('http').createServer(handler);
const io = require('socket.io').listen(app);
const fs = require('fs');

app.listen(3000);

function handler(req, res) {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', socket => {
  socket.emit('news', { serverData: 'server running' });
  socket.on('client login', data => {
    console.log(data);
  });
  socket.on('disconnect', () => {
    console.log('Disconnect');
  });
});

// 1 ~ 16 line => 접속했을 때, index.html page를 불러오고, error를 handling
// 18line => connectoin은 socket.io의 기본 event로 user가 웹사이트를 열면 자동으로 발생하는 event
//           event안의 함수에는 접속한 user의 socket이 parameter로 전달되는데, 접속한 각 client에
//           관련한 event를 작성하려면 이 connection listner 함수안에서 socket을 사용하면 됨

// connection안에 각 event를 작성할 때는 socket.on('event 이름', 함수)의 형식으로 작성
// 함수 대신 전달하고 싶은 값이 있다면, 변수를 넣어줘도 됨

// socket.emit은 event를 발생시키는 함수. server쪽에서 event를 발생시키면 client page의
// 해당 event listner에서 처리함. 위는 emit을 이용해 'news' event를 발생시켯음
//  - socket.emit을 이용하면 해당 socket을 통해 상대편으로 전달,
//  - io.emit을 이용하면 server가 현재 접속해 있는 모든 client에게 event를 전달함.
// 위의 코드에서는 user가 맨 처음 접속했을 때, news event가 발생하며, serverData라는 변수에
// 문자열을 넣어 user에게 전달해줌

// 20 line => client login event를 만들어서 console.log로 data를 찍어줌

// 23 line => disconnect도 connection처럼 socket.io와 같은 기본 event인데, user의 접속이
//            끊어지면 자동으로 발생. 단, disconnect event는 개별 user가 접속이 끊어졌을 때
//            발생하는 event이므로 io.on이 아닌 socket.on으로 작성해줘야 함

//
