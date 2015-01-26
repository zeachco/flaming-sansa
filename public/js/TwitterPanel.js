function TwitterPanel(user) {

  var container = document.createElement('tweets-panel');

  this.prototype = container;
  container.setAttribute('draggable', true);
  container.className = '';

  container.style = function(css, value) {
    var re = new RegExp(css + ';?');
    this.style.cssText = this.style.cssText.replace(re, '') + value + ';';
  };

  container.user = user;

  var on = {
    dragstart: function() {
      container.className += ' moving';
    },
    dragenter: function() {
      container.className += ' prospect';
    },
    dragleave: function() {
      container.className = container.className.replace(/ ?prospect/, '');
    },
    dragend: function() {
      container.className = container.className.replace(/ ?moving/, '');
    }
  };

  for (var event in on) {
    container.addEventListener(event, on[event]);
  }

  return container;
}
