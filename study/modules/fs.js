// API - https://nodejs.org/api/fs.html
const fs = require('fs');

// async read
fs.readFile('../data/a.txt', 'utf8', (err, data) => {
  if (err) console.log(err); // error handle
  console.log(`async read ${data}`);
});

//sync read
let text = fs.readFileSync('../data/a.txt', 'utf8');
console.log(`sync read ${text}`);

// error handling with sync read
try {
  let dt = fs.readFileSync('../data/text3.txt', data, 'utf8');
  console.log(dt);
} catch (err) {
  console.log(err);
}

let data = 'fs.writeFile test';

fs.writeFile('../data/text1.txt', data, 'utf8', err => {
  console.log('async write file complete');
});

fs.writeFileSync('../data/text2.txt', data, 'utf8');
console.log('sync write file compelte');
