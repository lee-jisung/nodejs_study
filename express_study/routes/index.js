var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome to page' });
});

router.get('/test', function (req, res, next) {
  res.render('test', { title: 'Test', message: 'welcome' });
});

module.exports = router;
