var domUtils = {
  style: function(css, value) {
    var re = new RegExp(css + ';?');
    this.style.cssText = this.style.cssText.replace(re, '') + value + ';';
  },
  attr: function(key, value) {
    this.setAttribute(key, value);
  }
};
