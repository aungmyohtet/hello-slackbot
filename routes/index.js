var express = require("express");
var router = express.Router();
var slack = require("slack");
var request = require("request");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/hello", function(req, res, next) {
  res.render("hello", { title: "Hello slackbot" });
});

router.get("/register", function(req, res, next) {
  if (!req.param("code")) {
    res.json("No code");
    return;
  }
  var permissionRequestData = {
    client_id: "57141088304.242744617409",
    client_secret: "fe9100cc60001da2ab018b91417b26bc",
    code: req.param("code"),
    redirect_uri: "http://amh-slackbot.herokuapp.com/register"
  };

  slack.oauth.access(permissionRequestData, (err, data) => {
    console.log(">>>>>>> data is " + JSON.stringify(data));
    request(
      {
        url: data.incoming_webhook.url,
        method: "POST",
        json: {
          text: 'Hello!'
        }
      },
      function(error, response, resData) {
        if (resData) {
          console.log(JSON.stringify(resData));
        }
      }
    );
  });

  res.redirect('/');
});

module.exports = router;
