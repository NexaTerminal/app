const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/signup', authController.getSignup);
router.post('/signup', authController.signup);
router.get('/login', authController.getLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/settings', authController.getSettings);


// New routes for password reset
// router.get('/reset-password', authController.getResetPassword);
// router.post('/reset-password', authController.postResetPassword);
// router.get('/reset-password/:token', authController.getNewPassword);
// router.post('/new-password', authController.postNewPassword);

module.exports = router;
