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

/* POST login */
router.post('/',
  body('username').notEmpty().trim(),
  body('password').notEmpty(),
  async function(req, res, next) {

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render('login', { errors: errors.array()});
       // return res.status(400).json({ errors: errors.array() });
      }

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    try {
      const sql = 'SELECT password FROM users WHERE name = ?';
      const result = await query(sql, username);

      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, function(err, result) {
          if (result == true) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/topsecret');
          } else {
            res.render('login',{ error: 'Wrong username or password!'});
          }
        });
      } else {
        res.render('login',{ error: 'Wrong username or password!'});
      }
    } catch (e) {
      next(e);
      console.error(e);
    }
  } else {
    res.render('login',{ error: 'Wrong username or password!'});
  }
});


module.exports = router;
