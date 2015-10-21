var express = require('express');
var router = express.Router();
var fs = require('fs');
var mkdirp = require('mkdirp');

router.get('/', function(req, res, next) {
  res.render('admin', { title: settings.title, theme: settings.theme, navHtml: null });
});

router.post('/createfile', function(req, res, next) {
  var body = req.body;
  var folder = body.path.substring(0, body.path.lastIndexOf('\\'));
  //res.send(folder);
  mkdirp.sync(folder);
  fs.writeFileSync(body.path, '# ' + body.url);
  res.redirect(body.url);
});

module.exports = router;
