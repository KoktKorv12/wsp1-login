var express = require('express');
var router = express.Router();

/* GET topsekret page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('home');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;