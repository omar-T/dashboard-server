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
        let adminData = req.body;
        let decode = Buffer.from(req.body.accessToken, 'base64').toString();
        let newAuthCred = '';

        // handling accessToken
        if(req.body.email && req.body.password){
            newAuthCred = `${req.body.email}:${req.body.password}`;
            adminData.accessToken = Buffer.from(newAuthCred).toString('base64');
        }else if(req.body.email){
            oldPass = decode.split(":")[1];
            newAuthCred = `${req.body.email}:${oldPass}`;
            adminData.accessToken = Buffer.from(newAuthCred).toString('base64');
        }else if(req.body.password){
            oldEmail = decode.split(":")[0];
            newAuthCred = `${oldEmail}:${req.body.password}`;
            adminData.accessToken = Buffer.from(newAuthCred).toString('base64');
        }

        let updatedAdmin = await db.Admin.findOneAndUpdate({_id: req.params.admin_id}, adminData, {new: true});
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