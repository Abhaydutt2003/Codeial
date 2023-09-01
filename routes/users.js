const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile', passport.checkAuth, userController.profile);

router.get('/sign-up', passport.checkSignedIn, userController.signUp);
router.get('/sign-in', passport.checkSignedIn, userController.signIn);

router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/users/sign-up',
        //successRedirect: '/profile'
    }
), userController.createSession);

module.exports = router;