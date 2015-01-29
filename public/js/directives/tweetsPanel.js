(function() {
  'use strict';

  function tweetsPanel() {

    return function tweetLink(scope, element, attr) {

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

      // tweets

      var html = '';

      function render(data) {
        if (typeof data === 'object' && data.length) {

          console.log('tweets from ' + attr.from);

          data.forEach(function(tweet) {
            console.info(attr.from, tweet.text);
            html += '<p class="tweet">' + tweet.text + '</p>';
          });

          element.html(html);

        }
      }

      scope.$watch('tweets.' + attr.from, function(data) {
        render(data);
      });

    };

  }

  angular.module('twitter-demo').directive('tweetsPanel', [tweetsPanel]);

})();
