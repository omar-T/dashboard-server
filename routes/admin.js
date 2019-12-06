const express = require('express');
const router = express.Router({mergeParams: true});
const {getAdmins, deleteAdmin, updateAdmin} = require('../handlers/admin');

router.route('/')
    .get(getAdmins);

router.route('/:admin_id')
    .delete(deleteAdmin)
    .put(updateAdmin);

module.exports = router;