const express = require('express');
const router = express.Router();
const {getLogs} = require('../handlers/log');

router.route('/')
    .get(getLogs);

module.exports = router;