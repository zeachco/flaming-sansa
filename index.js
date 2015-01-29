var express = require('express');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var request = require('request');

var url = require("url");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var config = {
  server_port: 3000
};

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var twitterAuth = require('./env/twitterAuth.json');
console.log(twitterAuth);
var client = new Twitter(twitterAuth);

var re_twitterUser = /twitter-proxy\/user\/([a-zA-Z]+)/;

app.post(re_twitterUser, function(req, res) {

  var uri = url.parse(req.url);
  console.log(req.body);

  var user = re_twitterUser.exec(uri.path)[1];

  console.log('fetching tweets for', user);


  request.get('https://api.twitter.com/1.1/search/tweets.json?q=%23zeachco&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4', function(req, res) {
    req.json(req.body);
  });
  /*
    client.get('search/tweets', {
      q: '@' + user,
      count: 22
    }, function(error, tweets, response) {
      if (!error) {
        res.json(tweets);
      } else {
        console.log(error);
        res.json(error);
      }
    });
  */
});

var server = app.listen(config.server_port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
