const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile', userController.profile);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-up' }
), userController.createSession);

module.exports = router;