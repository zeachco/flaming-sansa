function CMS() {
  'use strict';
  var maxTweets = 30;
  var self = this;

  this.createTwitterPanels = function(opts) {
    var container = opts.el;
    var users = opts.users || [];
    var dragFrom, dragTo;

    var panels = [];
    var _onReorder = function() {};

    function swapElem(moving, bumped) {
      moving.parentNode.replaceChild(moving, bumped);
      moving.parentNode.insertBefore(bumped, moving);

      var list = container.getElementsByTagName('tweets-panel');
      for (var i=0; i < list; i++) {
        console.log(list[i].user);
      }

      _onReorder(users);
    }

    users.forEach(function(user, index) {
      var panel = new TwitterPanel(user);
      panel.innerHTML = 'Loading the ' + maxTweets + ' most recent tweets from @' + user + '...';
      panel.index = index;

      panel.addEventListener('dragstart', function panelDrag(e) {
        dragFrom = e.target;
      });
      panel.addEventListener('dragenter', function panelMove(e) {
        dragTo = e.target;
        swapElem(dragFrom, dragTo);
      });
      panel.addEventListener('dragend', function panelDrop(e) {
        swapElem(dragFrom, dragTo);
      });
      container.appendChild(panel);
    });

    return {
      onReorder: function(callback) {
        _onReorder = callback;
      }
    };

  };



}
