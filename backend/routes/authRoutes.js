const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const authControllers = require('../controllers/auth/authController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

const registerSchema = Joi.object({
  username: Joi.string().min(2).max(13).required(),
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});

router.post(
  '/register',
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  '/login',
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

// PRIVATE
router.get('/test', verifyToken, (req, res) => {
  res.send('Yipee It worked');
});
// cookie-parser npm
// router.get('/logout', verifyToken, (req, res) => {
//   authControllers.controllers.postLogout(req, res);
// });
module.exports = router;
