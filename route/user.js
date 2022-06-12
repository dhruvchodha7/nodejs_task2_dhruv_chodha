const express = require('express');
const router  = express.Router();
const { registerScreen, register,  login, loginScreen, listUsers, verifyEmail } = require('../controller/userController')
const nodemailer = require('nodemailer');
router.route('/register').get(registerScreen);
router.route('/register').post(register);

router.route('/login').get(loginScreen);
router.route('/login').post(login);

router.route('/').get(listUsers);
router.route('/verify-email').get(verifyEmail);

module.exports = router;