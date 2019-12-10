const express = require('express');
const router = express.Router({mergeParams: true});
const {createUser} = require('../handlers/user');

router.route('/').post(createUser);

module.exports = router;