const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], validate, register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists(),
], validate, login);

module.exports = router;
