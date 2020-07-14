const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');

router
  .get('/login', login)
  .post('/register', register)

module.exports = router;
