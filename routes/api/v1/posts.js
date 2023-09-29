const express = require('express');

const passport = require('passport');
const router = express.Router();
const postApi = require("../../../controllers/api/v1/post_api");

router.get('/',postApi.index);
//session:false because we do not need sesison cookie
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);

module.exports = router;