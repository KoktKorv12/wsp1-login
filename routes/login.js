const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {query} = require('../models/db');
const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('form', {title: 'Login exempel'});
});

/* GET login listing. */
router.get('/kryptan/:pwd', function(req, res, next) {
const myPlaintextPassword = req.params.pwd;

  bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
    // Store hash in your password DB.
    res.json({
      pwd:hash
     });
  });
});

/* post login */
router.post('/',
  body('username').notEmpty().trim(),
  body('password').notEmpty(),
  async function(req, res, next) {

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    try {
      const sql = 'SELECT password FROM users WHERE name = ?';
      const result = await query(sql, username, password);

      bcrypt.compare(password, result[0].password, function(err, result){
        res.json({
          result
        });
      });

    } catch (e) {
      next (e);
      console.error(e);
    }
  }
}),
  //logga in med DOLD tvåFaktorLogin

//   if (password == "losenord") {
//     res.send('Du är inloggad');
//   } else {
//     // kommentera ut vid felsökning
//     res.redirect('/login');
//   }
// });

module.exports = router;
