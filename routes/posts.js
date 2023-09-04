const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_controllers');
const passport = require('passport');

router.post('/create',passport.checkAuth,postController.create);

module.exports = router;