(function() {
  'use strict';

  function tweetsPanel() {

    function tweetLink(scope, element, attr) {

      element.on('change', function() {
        var opt = {};
        opt[attr.cmsModel] = this.value;
        scope.$emit('cms.setKey', opt);
      });

      scope.$watch('cms.' + attr.cmsModel, function(newVal, oldVal) {
        element.val(newVal);
      });

    }

    return {
      directive: 'cmsController',
      replace: true,
      template: '<input type="time" size="6" />',
      link: tweetLink
    };

  }

  angular.module('twitter-demo').directive('dateTime', [tweetsPanel]);

})();
