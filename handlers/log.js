const db = require('../models');
const Moment = require('moment');

// GET - /api/logs
exports.getLogs = async (req, res, next) => {
    try{
        let logs = await db.Log.find()
                            .sort({createdAt: 'desc'});
        return res.status(200).json(logs);
    }catch(err){
        return next(err);
    }
}

// POST - /api/logs
exports.createLog = async (req, res, next) => {
    try{
        let log = await db.Log.create(req.body);
        return res.status(200).json(log);
    }catch(err){
        return next(err);
    }
}

// GET - /api/logs/mostActiveUsers
exports.getMostActiveUsers = async (req, res, next) => {
    try{
        let logsData = await db.Log.aggregate([
            {
                $group: {
                    _id: {userId: '$userId'},
                    count: {$sum: 1}
                }
            },
            {
                $match: {
                    count: {$gte: 2}
                }
            },
            {
                $sort: {count: -1}
            },
            {
                $limit: 4
            }
        ])

        let promiseData = logsData.map(log => {
            return db.User.findById(log._id.userId, 'name surname')
        })

        Promise.all([...promiseData])
            .then((values) => {
                let usersData = logsData.map((log, index) => {
                    return {
                        ...values[index]._doc,
                        count: log.count
                    }
                });
                return res.status(200).json({
                    usersData
                });
            })
            .catch(err => {
                return next(err);
            });
    }catch(err){
        return next(err);
    }
}

// GET - /api/logs/activityLastFiveDays
exports.getActivityLastFiveDays = async (req, res, next) => {
    try{
        let labels = getDates(5, 'days');
        let logs = await db.Log.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: labels[0]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        day: {$dayOfMonth: '$createdAt'}
                    },
                    count: {$sum: 1},
                    date: {$min: '$createdAt'}
                }
            },
            { $sort: {_id: 1} },
            { $project: { date: "$date", count: 1, _id: 0} }
        ]);
        let fiveDaysLogs = [];
        for(let i = 1; i < labels.length; i++){
            let index = logs.findIndex(log => {
                return Moment(log.date).format('YYYY-MM-DD') === Moment(labels[i]).format('YYYY-MM-DD')
            });
            if(index === -1){
                fiveDaysLogs.push({
                    count: 0,
                    date: labels[i]
                });
            }else{
                fiveDaysLogs.push({
                    ...logs[index]
                });
            }
        }
        return res.status(200).json({
            fiveDaysLogs
        });
    }catch(err){
        return next(err);
    }
}

// GET - /api/logs/activityLastFourWeeks
exports.getActivityLastFourWeeks = async (req, res, next) => {
    try{
        let labels = getDates(4, 'weeks');
        console.log(labels);
        return res.status(200).json({
            labels
        });
    }catch(err){
        return next(err);
    }
}

const getDates = (diff, type) => {
    let dateLabels = [];
    const end = Moment();
    let start = Moment().subtract(diff, type);
    for(let m = start; m.diff(end, type) <= 0; m.add(1, type)){
        dateLabels.push(new Date(new Date(m).setHours(23, 59, 59)));
    }
    return dateLabels;
}