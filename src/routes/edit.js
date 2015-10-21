var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/*.md/edit', function(req, res, next) {
  var filepath = path.join(contentFolder, req.url.replace(/%20/g, ' ').replace('/edit', ''));
  var md = null;
  try {
    var filecontents = fs.readFileSync(filepath, 'utf8');
  } catch(e) {
    e.status = 500;
    e.message = "Unable to edit markdown"
    throw e;
  }
  res.render('edit', { title: 'Miki - Edit',
    theme: settings.theme,
    markdown: filecontents,
    filepath: filepath,
    url: '/edit' + req.url.replace('/edit', '') + '/save'
  });
});

router.post('/*.md/save', function(req, res, next) {
  fs.writeFileSync(req.body.filepath, req.body.markdown);
  res.redirect(req.url.replace('/edit', '').replace('/save', ''));
});

module.exports = router;
