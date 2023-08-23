const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));

//export the router
module.exports = router;
