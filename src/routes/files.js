var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
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

  var fileslist = fs.readdirSync(filesDir);
  console.log(JSON.stringify(fileslist));

  res.render('files', { title: 'Miki - Settings',
    theme: settings.theme,
    settings: settings,
    navHtml: navHtml,
    files: fileslist
  });
});

router.post('/upload', function(req, res, next) {

  res.redirect('/files');
});

router.post('/delete', function(req, res, next) {

  res.redirect('/files');
});

module.exports = router;
