var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('form', {title: 'Login exempel'});
});

/* post login */
router.post('/', function(req, res, next) {

  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  //logga in med DOLD tvåFaktorLogin

  if (password == "lösenord") {
    res.send('Du är inloggad');
  } else {
    // kommentera ut vid felsökning
    res.redirect('/login');
  }
});

module.exports = router;
