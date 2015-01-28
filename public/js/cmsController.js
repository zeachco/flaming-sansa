(function() {
  'use strict';

  function cmsController($scope) {

    var maxTweets_min = 0;
    var maxTweets_max = 300;

    $scope.editMode = false;

    $scope.cms = {
      panels: ['AppDirect', 'laughingsquid', 'techcrunch'],
      maxTweets: 30
    };

    $scope.cmsToggle = function() {
      $scope.editMode = !$scope.editMode;
      if(!$scope.editMode){
        $scope.saveChanges();
      }
    };

    // keep maxTweets value to be a finite number and assure it's withint a range
    $scope.$watch('cms.maxTweets', function(newVal, oldVal) {
      if (isNaN(newVal)) {
        $scope.cms.maxTweets = oldVal;
      } else {
        $scope.cms.maxTweets = parseInt(Math.min(Math.max(+newVal, maxTweets_min), maxTweets_max));
      }
    });

    $scope.$on('dragFrom', function(e, data) {
      $scope.dragFrom = data;
      $scope.dragTo = data;
    });

    $scope.$on('dragTo', function(e, data) {
      $scope.dragTo = data;
    });

    $scope.reorder = function() {
      //console.log('reorder', $scope.dragFrom, $scope.dragTo);
      if ($scope.dragFrom != $scope.dragTo) {
        $scope.cms.panels.splice($scope.dragTo, 0, $scope.cms.panels.splice($scope.dragFrom, 1)[0]);
      }
    };

    $scope.loadStorage = function() {
      if(localStorage.cms){
        $scope.cms = JSON.parse(localStorage.cms);
      }
    };

    $scope.loadStorage();

    $scope.saveChanges = function() {
      localStorage.cms = JSON.stringify($scope.cms);
    };

  }

  angular.module('twitter-demo').controller('cmsController', ['$scope', cmsController]);

})();
