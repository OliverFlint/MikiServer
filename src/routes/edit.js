var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');
var router = express.Router();

/* GET home page. */
router.get('/new', function(req, res, next) {
  res.render('edit', { title: 'Editor', url: "", markdown: "" });
});

router.get('/*', function(req, res, next) {
  var data = fs.readFileSync(mdRoot + req.url + '.md');
  res.render('edit', { title: 'Editor: ' + req.url, url: req.url, markdown: data });
});

router.post('/new', function(req, res) {
  if (!req.body) return res.sendStatus(400)
  var data = req.body.mdtextbox;
  var url = req.body.name
  var folder = url.substring(1, url.lastIndexOf("/"));
  mkdirp.sync(mdRoot + folder);
  fs.writeFileSync(mdRoot + url + '.md', data);
  res.redirect('/page/' + url);
});

router.post('/*', function(req, res) {
  if (!req.body) return res.sendStatus(400)
  var data = req.body.mdtextbox;
  fs.writeFileSync(mdRoot + req.url + '.md', data);
  res.redirect('/page' + req.url);
});

module.exports = router;
