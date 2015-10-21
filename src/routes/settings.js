var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');

/* GET home page. */
router.get('/', function(req, res, next) {
  var navHtml = null;
  var navmd = null;
  try {
    navmd = fs.readFileSync(navFile, 'utf8');
    navHtml = marked(navmd);
  } catch(e) {
    e.status = 404;
    e.message = "Unable to open navigation markdown"
    throw e;
  }
  res.render('settings', { title: 'Miki - Settings',
    theme: settings.theme,
    settings: settings,
    navmarkdown: navmd,
    navHtml: navHtml
  });
});

router.post('/general', function(req, res, next) {
  settings = req.body;
  fs.writeFileSync(settingsFile, JSON.stringify(settings));
  res.redirect('/settings');
});

router.post('/navigation', function(req, res, next) {
  var md = req.body.navmarkdown;
  fs.writeFileSync(navFile, md);
  res.redirect('/settings');
});

module.exports = router;
