const db = require('../models');

// /api/logs
exports.getLogs = async function(req, res, next){
    try{
        let logs = await db.Log.find()
                            .sort({createdAt: 'desc'});
        return res.status(200).json(logs);
    }catch(err){
        return next(err);
    }
}