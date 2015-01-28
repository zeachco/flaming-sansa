(function() {
  'use strict';

  function TwitterFactory($http) {
    return {
      getUserTweets: function(user, callback) {
        $http.get('/twitter-proxy/user/' + user).success(function(data) {
          callback(data);
        });
      }
    };
  }

  angular.module('twitter-demo').factory('TwitterFactory', ['$http', TwitterFactory]);

})();
