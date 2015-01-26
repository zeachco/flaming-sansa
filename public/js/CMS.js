function CMS() {
  'use strict';

  var self = this;

  this.createTwitterPanels = function(opts) {
    var container = opts.el;
    var users = opts.users || [];
    var dragFrom, dragTo;

    this.panels = [];

    users.forEach(function(user, index) {
      var panel = new TwitterPanel(user);
      panel.index = index;
      self.panels.push(panel);
      container.appendChild(panel);

      panel.addEventListener('dragstart', function panelDrag(e) {
        dragFrom = e.target.index;
      });

      panel.addEventListener('dragenter', function panelMove(e) {
        dragTo = e.target.index;
      });

      panel.addEventListener('dragend', function panelDrop(e) {
        
        console.log('dragend', dragFrom, dragTo);
      });

    });

  };



}
