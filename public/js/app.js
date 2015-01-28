addEventListener("load", function startCMS() {
  removeEventListener("load", startCMS);

  window.cms = new CMS();

  var settings = {
    twitterUsers: ['AppDirect', 'laughingsquid', 'techcrunch']
  };

  if (localStorage.settings) {
    settings = JSON.parse(localStorage.settings);
  }

  function save() {
    localStorage.settings = JSON.stringify(settings);
  }

  cms.createTwitterPanels({
    el: document.getElementById('twitterPanels'),
    users: settings.twitterUsers
  })

  .onReorder(function(users) {
    settings.twitterUsers = users;
    save();
  });

});
