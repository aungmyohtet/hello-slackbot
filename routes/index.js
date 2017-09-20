var express = require('express');
var router = express.Router();
var slack = require('slack');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello slackbot' });
});

router.get('/register', function(req, res, next) {
  if (!req.param('code')) {
      res.json('No code');
      return;
  }
  var post_data = {
      'client_id' : '57141088304.242744617409',
      'client_secret': 'fe9100cc60001da2ab018b91417b26bc',
      'code': req.param('code'),
      'redirect_uri' : 'http://amh-slackbot.herokuapp.com/register'
  };

  slack.oauth.access(post_data, (err, data) => { console.log(">>>>>>> data is " + data)});

  res.json(req.param('code'));
});



module.exports = router;
