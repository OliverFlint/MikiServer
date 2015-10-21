var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  var filecontents = fs.readFileSync(path.join(contentFolder, req.url.replace(/%20/g, ' '), 'index.md'), 'utf8');
  var md = marked(filecontents);

  var navmd = fs.readFileSync(navFile, 'utf8');
  var navHtml = marked(navmd);

  res.render('index', { title: settings.title, theme: settings.theme, markdown: md, navHtml: navHtml, url: 'index.md' });
});

router.get('/*.md', function(req, res, next) {
  var filepath = path.join(contentFolder, req.url.replace(/%20/g, ' '))

  var md = null;
  try {
    var filecontents = fs.readFileSync(filepath, 'utf8');
    md = marked(filecontents);
  } catch(e) {
    e.status = 404;
    e.message = "Unable to open markdown"
    throw e;
  }

  var navHtml = null;
  try {
    var navmd = fs.readFileSync(navFile, 'utf8');
    navHtml = marked(navmd);
  } catch(e) {
    e.status = 404;
    e.message = "Unable to open navigation markdown"
    throw e;
  }
  res.render('index', { title: settings.title, theme: settings.theme, markdown: md, navHtml: navHtml, url: req.url });
});

module.exports = router;
