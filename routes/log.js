const express = require('express');
const router = express.Router();
const {
    getLogs, 
    getMostActiveUsers, 
    getActivityLastFiveDays,
    getActivityLastFourWeeks
} = require('../handlers/log');

router.route('/')
    .get(getLogs);

router.route('/mostActiveUsers')
    .get(getMostActiveUsers);

router.route('/activityLastFiveDays')
    .get(getActivityLastFiveDays);

router.route('/activityLastFourWeeks')
    .get(getActivityLastFourWeeks);
    
module.exports = router;