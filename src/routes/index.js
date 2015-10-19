var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  var filecontents = fs.readFileSync(path.join(contentFolder, req.url.replace(/%20/g, ' '), 'index.md'), 'utf8');
  var md = marked(filecontents);
  res.render('index', { title: settings.title, theme: settings.theme, markdown: md });
});

router.get('/*.md', function(req, res, next) {
  var filecontents = fs.readFileSync(path.join(contentFolder, req.url.replace(/%20/g, ' ')), 'utf8');
  var md = marked(filecontents);
  res.render('index', { title: settings.title, theme: settings.theme, markdown: md });
});

module.exports = router;
