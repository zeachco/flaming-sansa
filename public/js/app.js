addEventListener("load", function startCMS() {
  removeEventListener("load", startCMS);

  window.cms = new CMS();

  cms.createTwitterPanels({
    el: document.getElementById('twitterPanels'),
    users: ['AppDirect', 'laughingsquid', 'techcrunch']
  });

});
