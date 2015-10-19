var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('settings', { title: 'Miki - Settings', theme: settings.theme,
    themes: ['cerulean', 'an other'],
    sitetitle: settings.title
  });
});

router.post('/', function(req, res, next) {

  res.send('Changes Saved!');
});

module.exports = router;
