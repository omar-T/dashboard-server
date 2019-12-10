const express = require('express');
const router = express.Router({mergeParams: true});
const {createUser, getUsers, deleteUser, updateUser} = require('../handlers/user');

router.route('/')
    .post(createUser)
    .get(getUsers);

router.route('/:user_id')
    .delete(deleteUser)
    .put(updateUser);

module.exports = router;