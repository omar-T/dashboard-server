const db = require('../models');

// GET - /api/logs
exports.getLogs = async function(req, res, next){
    try{
        let logs = await db.Log.find()
                            .sort({createdAt: 'desc'});
        return res.status(200).json(logs);
    }catch(err){
        return next(err);
    }
}

// POST - /api/logs
exports.createLog = async function(req, res, next){
    try{
        let log = await db.Log.create(req.body);
        return res.status(200).json(log);
    }catch(err){
        return next(err);
    }
}