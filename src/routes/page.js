var express = require('express');
var fs = require('fs');
var router = express.Router();
var marked = require('marked');
var menubuilder = require('../menu.js')

router.get('/', function(req, res, next) {
  res.render('page', { title: req.url, url: req.url, markdown: "", menu: menubuilder() });
});

router.get('/*', function(req, res, next) {
  var url = req.url.replace(/%20/g, ' ');
  console.log("Serving markdown: " + url + ".md");
  var data = fs.readFileSync(mdRoot + url + '.md', 'utf8');
  data = marked(data);
  res.render('page', { title: url, url: url, markdown: data, menu: menubuilder() });
});

module.exports = router;
