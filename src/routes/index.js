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

  res.render('index', { title: settings.title, theme: settings.theme, markdown: md, navHtml: navHtml });
});

router.get('/*.md', function(req, res, next) {
  var filecontents = fs.readFileSync(path.join(contentFolder, req.url.replace(/%20/g, ' ')), 'utf8');
  var md = marked(filecontents);

  var navmd = fs.readFileSync(navFile, 'utf8');
  var navHtml = marked(navmd);

  res.render('index', { title: settings.title, theme: settings.theme, markdown: md, navHtml: navHtml });
});

module.exports = router;
