const express = require('express');


const router = express.Router();
const postApi = require("../../../config/api/v1/post_api");

router.get('/',postApi.index);
router.delete('/:id',postApi.destroy);

module.exports = router;