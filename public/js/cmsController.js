(function(){
  'use strict';

  function cmsController($scope){
    var maxTweets_min = 0;
    var maxTweets_max = 300;

    $scope.maxTweets = 30;

    // keep maxTweets value to be a finite number and assure it's withint a range
    $scope.$watch('maxTweets', function(newVal, oldVal) {
      if(isNaN(newVal)){
        $scope.maxTweets = oldVal;
      }else{
        $scope.maxTweets = +(Math.min(Math.max(newVal, maxTweets_min), maxTweets_max));
      }
    });

  }

  angular.module('twitter-demo').controller('cmsController', ['$scope', cmsController]);

})();
