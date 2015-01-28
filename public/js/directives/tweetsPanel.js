(function() {
  'use strict';

  function tweetsPanel() {

    function tweetLink(scope, element, attr) {

      element.bind('dragstart', function(e) {
        scope.$emit('dragFrom', attr.position);
        element[0].className += ' moving';
      });

      element.bind('dragenter', function(e) {
        scope.$emit('dragTo', attr.position);
        element[0].className += ' prospect';
      });

      element.bind('dragleave', function(e) {
        element[0].className = element[0].className.replace(/ ?prospect/, '');
      });

      element.bind('dragend', function(e) {
        element[0].className = element[0].className.replace(/ ?moving/, '');
        scope.$apply('reorder()');
      });

      scope.$watch('tweets.' + attr.user, function(newVal, oldVal) {
        console.log('tweets', newVal, oldVal);
      });

    }

    return {
      template: "<div><h3>@{{user}}</h3>Loading {{cms.maxTweets}} tweets...<br><small>{{cms.timeFrom}} ~ {{cms.timeTo}}</small></div>",
      link: tweetLink
    };

  }

  angular.module('twitter-demo').directive('tweetsPanel', [tweetsPanel]);

})();
