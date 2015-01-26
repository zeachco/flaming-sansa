var express = require('express');
var Twitter = require('twitter');
var url = require("url");
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});

var config = {
  server_port : 3000,
  oauth_access_token : 'token-here',
  oauth_access_token_secret : 'token-here',
  consumer_key : 'token-here',
  consumer_secret : 'token-here',
  base_url : 'https://api.twitter.com/1.1/'
};

app.get('/proxy/*', function(req, res) {
  var uri = url.parse(req.url);
  res.json(uri);
});

var server = app.listen(config.server_port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
