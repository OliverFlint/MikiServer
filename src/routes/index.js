var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');
var path = require('path');

var loadmarkdown = function(filepath) {
  var md = null;
  try {
    var filecontents = fs.readFileSync(filepath, 'utf8');
    md = marked(filecontents);
    return md;
  } catch(e) {
    e.status = 404;
    e.message = "Unable to open markdown file: " + filepath
    throw e;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var md = loadmarkdown(path.join(settings.contentFolder, req.url.replace(/%20/g, ' '), 'index.md'));
  var navHtml = loadmarkdown(navFile);
  res.render('index', { title: settings.title, theme: settings.theme, markdown: md, navHtml: navHtml, url: 'index.md' });
});

router.get('/credits.md', function(req, res, next) {
  var md = loadmarkdown(ceditsFile);
  var navHtml = loadmarkdown(navFile);
  res.render('index', { title: settings.title, theme: settings.theme, markdown: md, navHtml: navHtml, url: req.url });
});

router.get('/*.md', function(req, res, next) {
  var md = loadmarkdown(path.join(settings.contentFolder, req.url.replace(/%20/g, ' ')));
  var navHtml = loadmarkdown(navFile);
  res.render('index', { title: settings.title, theme: settings.theme, markdown: md, navHtml: navHtml, url: req.url });
});

module.exports = router;
