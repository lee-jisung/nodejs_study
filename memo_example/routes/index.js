const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongoURI = require('../config/dev');

mongoose.connect(mongoURI.mongoURI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB Connected');
});

const memoSchema = mongoose.Schema({
  author: String,
  contents: String,
  date: Date,
});

const memoModel = mongoose.model('Memo', memoSchema);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/load', (req, res, next) => {
  memoModel.find({}, (err, data) => {
    res.json(data);
  });
});

router.post('/write', (req, res, next) => {
  const memo = new memoModel();

  memo.author = req.body.author;
  memo.contents = req.body.contents;
  memo.date = Date.now();
  memo.comments = [];

  memo.save(err => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

router.post('/del', (req, res, next) => {
  const _id = req.body._id;
  memoModel.deleteOne({ _id: _id }, (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

router.post('/modify', (req, res, next) => {
  const _id = req.body._id;
  const contesnts = req.body.contents;

  memoModel.findOne({ _id: _id }, (err, memo) => {
    if (err) throw err;
    memo.contents = contents;
    memo.save(err => {
      if (err) throw err;
      res.json({ status: 'success' });
    });
  });
});

module.exports = router;
