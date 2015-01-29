var utils = {
  createTwitterLinks: function(text) {
    return text.replace(/@([\_a-z0-9]+)/gim, '<a href="https://twitter.com/$1" target="_blank">@$1</a>');
  }
};
