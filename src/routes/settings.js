var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('settings', { title: 'Miki - Settings',
    theme: settings.theme,
    settings: settings
  });
});

router.post('/', function(req, res, next) {
  settings = req.body;
  fs.writeFileSync(settingsFile, JSON.stringify(settings));
  res.redirect('/settings');
});

module.exports = router;
