var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello slackbot' });
});

router.get('/register', function(req, res, next) {
  res.json(req);
});

module.exports = router;
