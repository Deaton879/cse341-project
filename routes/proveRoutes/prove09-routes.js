const express = require('express');
const router = express.Router();
const controller = require('../../controllers/prove09');

router.get('/', controller.getPage);
module.exports = router;