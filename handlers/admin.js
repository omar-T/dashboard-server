const db = require('../models');

// /api/admins
exports.getAdmins = async function(req, res, next){
    try{
        let admins = await db.Admin.find()
                            .sort({createdAt: 'desc'});
        return res.status(200).json(admins);
    }catch(err){
        return next(err);
    }
}

// /api/admins/:admin_id
exports.getAdmin = async function(req, res, next){
    try{
        let foundAdmin = await db.Admin.findById(req.params.admin_id);
        return res.status(200).json(foundAdmin);
    }catch(err){
        return next(err);
    }
}

// DELETE - /api/admins/:admin_id
exports.deleteAdmin = async function(req, res, next){
    try{
        let foundAdmin = await db.Admin.findById(req.params.admin_id);
        await foundAdmin.remove();
        return res.status(200).json({
            success: {
                message: 'Admin deleted successfully.'
            }
        });
    }catch(err){
        next(err);
    }
}

// UPDATE - /api/admins/:admin_id
exports.updateAdmin = async function(req, res, next){
    try{
        console.log(req.body);
        let updatedAdmin = await db.Admin.findOneAndUpdate({_id: req.params.admin_id}, req.body, {new: true});
        return res.status(200).json({
            updatedAdmin,
            success: {
                message: 'Admin updated successfully.'
            }
        });
    }catch(err){
        return next(err);
    }
}