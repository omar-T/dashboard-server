const express = require('express');
const router = express.Router({mergeParams: true});
const {createUser, getUsers, deleteUser, updateUser, getUsersCount} = require('../handlers/user');

router.route('/')
    .post(createUser)
    .get(getUsers);

router.route('/:user_id')
    .delete(deleteUser)
    .put(updateUser);

router.route('/count')
    .get(getUsersCount);

module.exports = router;