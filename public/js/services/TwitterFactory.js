(function() {
  'use strict';

  function TwitterFactory($http) {
    return {
      getUserTweets: function(opt, callback) {
        $http.get('/twitter-proxy/user/' + opt.user, opt).success(function(data) {
          callback(data);
        });
      }
    };
  }

  angular.module('twitter-demo').factory('TwitterFactory', ['$http', TwitterFactory]);

})();
