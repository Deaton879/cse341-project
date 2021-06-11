const express = require('express');
const router = express.Router();
var json = require('../../controllers/ta08');

router.get('/', json.processJson)
      .post('/', json.getIndex)
module.exports = router;