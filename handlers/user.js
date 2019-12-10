const db = require('../models');

// GET - /api/users
exports.getUsers = async function(req, res, next){
    try{
        let users = await db.User.find()
                            .sort({createdAt: 'desc'});
        return res.status(200).json(users);
    }catch(err){
        return next(err);
    }
}

// POST - /api/users
exports.createUser = async function(req, res, next){
    try{
        let user = await db.User.create(req.body);
        return res.status(200).json(user);
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

// DELETE - /api/users/:user_id
exports.deleteUser = async function(req, res, next){
    try{
        let foundUser = await db.User.findById(req.params.user_id);
        await foundUser.remove();
        return res.status(200).json({
            success: {
                message: 'User deleted successfully.'
            }
        });
    }catch(err){
        next(err);
    }
}

// UPDATE - /api/users/:user_id
exports.updateUser = async function(req, res, next){
    try{
        let updatedUser = await db.User.findOneAndUpdate({_id: req.params.user_id}, req.body, {new: true});
        return res.status(200).json({
            updatedUser,
            success: {
                message: 'User updated successfully.'
            }
        });
    }catch(err){
        next(err);
    }
}