var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.loggedin) {
    res.send('du är inloggad');
  } else {
    res.send('Please login to view this page!');
  }
});

module.exports = router;