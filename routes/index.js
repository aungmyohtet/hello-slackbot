var express = require('express');
var router = express.Router();

// We need this to build our post string
var querystring = require('querystring');
var https = require('https');
var fs = require('fs');
var axios = require('axios');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello slackbot' });
});

router.get('/register', function(req, res, next) {
  if (!req.param('code')) {
      req.json('No code');
      return;
  }
  var post_data = querystring.stringify({
      'client_id' : '57141088304.242744617409',
      'client_secret': 'fe9100cc60001da2ab018b91417b26bc',
      'code': req.param('code'),
      'redirect_uri' : 'http://amh-slackbot.herokuapp.com/register'
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'slack.com',
      port: '80',
      path: '/api/oauth.access',
      method: 'GET',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('>>>>>>>>>>>>>>>>>>>>>>>Response: ' + chunk);
      });
  });

  // post the data
  //if (req.param('code')) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>posting data') ;
    //post_req.write(post_data);
    //post_req.end();
  //}

  // Send a POST request
axios({
  method: 'post',
  url: 'https://slack.com//api/oauth.access',
  data: {
    'client_id' : '57141088304.242744617409',
      'client_secret': 'fe9100cc60001da2ab018b91417b26bc',
      'code': req.param('code'),
      'redirect_uri' : 'http://amh-slackbot.herokuapp.com/register'
  }
}).then(function(data) {
    console.log(">>>>>>>>>>>>>data is " + data)
});

  res.json(req.param('code'));
});



module.exports = router;
