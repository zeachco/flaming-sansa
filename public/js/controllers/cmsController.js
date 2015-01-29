(function() {
  'use strict';

  function cmsController($scope, TwitterFactory) {

    var maxTweets_min = 0;
    var maxTweets_max = 300;

    $scope.editMode = false;
    $scope.isDark = false;
    $scope.tweets = {};

    $scope.cms = {
      panels: ['AppDirect', 'laughingsquid', 'techcrunch'],
      maxTweets: 30,
      timeFrom: '00:00',
      timeTo: '23:59',
      style: {
        bgColor: '#def'
      }
    };

    function getLightValue(hex) {
      hex = String(hex).replace(/[^0-9a-f]/gi, ''); // validate hex string
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }

      // convert to decimal and change luminosity
      var rgb = "#";
      var sum = 0;
      var c;
      var i;
      for (i = 0; i < 3; i++) {
        sum += parseInt(hex.substr(i * 2, 2), 16);
      }

      return sum / (255 * 3);
    }

    $scope.$watch('cms.style.bgColor', function(newVal, oldVal) {
      document.body.style.background = newVal;
      $scope.isDark = getLightValue(newVal) > 0.5;
    });

    $scope.cmsToggle = function() {
      $scope.editMode = !$scope.editMode;
      if (!$scope.editMode) {
        $scope.saveChanges();
      }
    };

    $scope.$on('cms.setKey', function(e, attr) {
      for (var n in attr) {
        $scope.cms[n] = attr[n];
      }
      $scope.$apply();
    });


    $scope.getCmsDate = function(key) {
      var d = new Date();
      try {
        var time = $scope.cms[key].split(':');
        d.setHours(time[0]);
        d.setMinutes(time[1]);
        d.setSeconds(0);
      } catch (e) {
        // return now when not formated
      }
      return d;
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

    $scope.updateTweets = function() {
      var i = 0;
      var panel;

      $scope.cms.panels.forEach(function(user) {
        TwitterFactory.getUserTweets({
          user: user,
          count: $scope.cms.maxTweets,
          from: $scope.getCmsDate('timeFrom'),
          to: $scope.getCmsDate('timeTo')
        }, function(data) {
          $scope.tweets[user] = data;
        });
      });

    };

    $scope.saveChanges = function() {
      localStorage.cms = JSON.stringify($scope.cms);
      $scope.updateTweets();
    };

    $scope.loadStorage = function() {
      if (localStorage.cms) {
        $scope.cms = JSON.parse(localStorage.cms);
        $scope.updateTweets();
      } else {
        $scope.saveChanges();
      }
    };

    $scope.loadStorage();

  }

  angular.module('twitter-demo').controller('cmsController', ['$scope', 'TwitterFactory', cmsController]);

})();
