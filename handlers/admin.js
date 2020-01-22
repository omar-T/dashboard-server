const db = require('../models');

// GET - /api/admins
exports.getAdmins = async (req, res, next) => {
    try{
        let admins = await db.Admin.find()
                            .sort({createdAt: 'desc'});
        return res.status(200).json(admins);
    }catch(err){
        return next(err);
    }
}

// POST - /api/admins
exports.createAdmin = async (req, res, next) => {
    try{
        let admin = await db.Admin.create(req.body);
        return res.status(200).json({
            message: 'Admin added successfully.'
        });
    }catch(err){
        if(err.code === 11000){
            err.message = 'Sorry, that email is already taken!'
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}

// GET - /api/admins/:admin_id
exports.getAdmin = async (req, res, next) => {
    try{
        let foundAdmin = await db.Admin.findById(req.params.admin_id);
        return res.status(200).json(foundAdmin);
    }catch(err){
        return next(err);
    }
}

// DELETE - /api/admins/:admin_id
exports.deleteAdmin = async (req, res, next) => {
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

// PUT - /api/admins/:admin_id
exports.updateAdmin = async (req, res, next) => {
    try{
        let updatedAdmin = await db.Admin.findOneAndUpdate({_id: req.params.admin_id}, req.body, {new: true});
        return res.status(200).json({
            updatedAdmin,
            success: {
                message: 'Admin updated successfully.'
            }
        });
    }catch(err){
        if(err.code === 11000){
            err.message = 'Sorry, that email is already taken!'
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}