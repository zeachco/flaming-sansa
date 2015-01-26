

(function() {
  'use strict';

  function cmsController($scope) {

    $scope.options = {
      twitterUsers: ['AppDirect', 'laughingsquid', 'techcrunch'],
      maxTweets: 30
    };
    var maxTweets_min = 0;
    var maxTweets_max = 300;

    $scope.$watch('options.maxTweets', function(newVal, oldVal) {
      if (isNaN(newVal)) {
        $scope.options.maxTweets = oldVal;
      } else {
        $scope.options.maxTweets = parseInt(Math.min(Math.max(+newVal, maxTweets_min), maxTweets_max));
      }
    });

    $scope.$watch('options.twitterUsers', function(newVal, oldVal) {
      $scope.panels = $scope.options.twitterUsers.map(function(d, i) {
        return {
          user: d,
          position: i
        };
      });
    });

    $scope.getPanels = function() {
      return $scope.panels.sort(function(a, b) {
        return a.position - b.position;
      });
    };

    $scope.changePanelOrder = function(index, newIndex) {
      $scope.panels.splice(newIndex, 0, $scope.panels.splice(index, 1)[0]);
    };

    // keep maxTweets value to be a finite number and assure it's withint a range

    $scope.loadChanges = function() {

    };

    $scope.saveChanges = function() {

    };

  }

  angular.module('twitter-demo').controller('cmsController', ['$scope', cmsController]);

})();
