const express = require('express');
//const bodyParser= require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: true });

const router = express.Router();

const usersApi = require('../../../controllers/api/v1/user_api');

router.post('/create-session',usersApi.createSession);

module.exports = router;
