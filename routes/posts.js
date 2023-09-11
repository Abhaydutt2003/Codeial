const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_controllers');
const passport = require('passport');

router.post('/create',passport.checkAuth,postController.create);
router.get('/destroy/:id',passport.checkAuth,postController.destroy);

module.exports = router;