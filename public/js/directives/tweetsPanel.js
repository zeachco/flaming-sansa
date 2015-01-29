(function() {
  'use strict';

  function tweetsPanel() {

    function link(scope, element, attr) {

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
      function render(data) {

        element[0].innerHTML = '...';
        if (typeof data === 'object' && data.length) {

          console.log(data.length + ' tweets from ' + attr.from);

          var html = '';
          data.forEach(function(tweet) {
            var time = new Date(tweet.created_at);
            html += '<tweet-row>';
            html += '<time-stamp>' + time.toLocaleTimeString() + '</time-stamp> ';
            html += tweet.text;
            html += '</tweet-row>';
          });
          element.html(utils.createTwitterLinks('<h2>' + data.length + ' tweets from @' + attr.from + '</h2><scroll-view>' + html + '</scroll-view>'));
        }

      }

      scope.$watch('tweets.' + attr.from, function(data) {
        render(data);
      });

    }

    return {
      link: link,
      transclude: true
    };

  }

  angular.module('twitter-demo').directive('tweetsPanel', [tweetsPanel]);

})();
