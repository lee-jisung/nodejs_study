const server = require('http');
const fs = require('fs');
//events module => asnyc event 생성, 관리
const EventEmitter = require('events').EventEmitter;

const cal = require('./export');

const port = 3000;

server
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello world');
  })
  .listen(port, 'localhost');

fs.readFile('./data/a.txt', (encoding = 'utf-8'), (err, data) => {
  if (err) throw err;
  console.log(data);
});

// async
const evt = new EventEmitter();

evt.on('hello', str => {
  console.log('node' + str);
});

setTimeout(() => {
  evt.emit('hello', 'Node.js');
}, 3000);

// exports
console.log(cal.double(10));
