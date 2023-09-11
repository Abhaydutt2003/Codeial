const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments_controller');
const passport = require('passport');

router.post('/create',passport.checkAuth,commentsController.create);
router.get('/destroy/:id',passport.checkAuth,commentsController.destroyComment);

module.exports = router;