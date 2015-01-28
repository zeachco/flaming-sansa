var express = require('express');
var Twitter = require('twitter');
var url = require("url");
var app = express();

var config = {
  server_port: 3000
};

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var twitterAuth = require('./env/twitterAuth.json');
console.log(twitterAuth);
var client = new Twitter(twitterAuth);

var re_twitterUser = /twitter-proxy\/user\/([a-z]+)/;

app.get(re_twitterUser, function(req, res) {
  var uri = url.parse(req.url);

  var user = re_twitterUser.exec(uri.path)[1];

  console.log('fetching tweets for', user);

  client.get('statuses/user_timeline', {
    screen_name: user
  }, function(error, tweets, response) {
    if (!error) {
      res.json(tweets);
    } else {
      console.log(error);
      res.json(error);
    }
  });

});

var server = app.listen(config.server_port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
