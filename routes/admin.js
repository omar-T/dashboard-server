const express = require('express');
const router = express.Router({mergeParams: true});
const {getAdmin, getAdmins, deleteAdmin, updateAdmin, createAdmin} = require('../handlers/admin');

router.route('/')
    .get(getAdmins)
    .post(createAdmin);

router.route('/:admin_id')
    .get(getAdmin)
    .delete(deleteAdmin)
    .put(updateAdmin);

module.exports = router;