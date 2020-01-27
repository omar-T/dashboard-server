const db = require('../models');

// GET - /api/users
exports.getUsers = async (req, res, next) => {
    try{
        const perPage = 8;
        const pageQuery = parseInt(req.query.page);
        const pageNumber = pageQuery ? pageQuery : 1;
        let users = await db.User.find()
            .sort({createdAt: 'desc'})
            .skip((perPage * pageNumber) - perPage)
            .limit(perPage);
        let count = await db.User.countDocuments();
        return res.status(200).json({
            allUsers: users,
            currentPage: pageNumber,
            pages: Math.ceil(count/perPage)
        });
    }catch(err){
        return next(err);
    }
}

// POST - /api/users
exports.createUser = async (req, res, next) => {
    try{
        let user = await db.User.create(req.body);
        return res.status(200).json({
            message: 'User added successfully.'
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

// DELETE - /api/users/:user_id
exports.deleteUser = async (req, res, next) => {
    try{
        let foundUser = await db.User.findById(req.params.user_id);
        await foundUser.remove();
        return res.status(200).json({
            success: {
                message: 'User deleted successfully.'
            }
        });
    }catch(err){
        return next(err);
    }
}

// UPDATE - /api/users/:user_id
exports.updateUser = async (req, res, next) => {
    try{
        let updatedUser = await db.User.findOneAndUpdate({_id: req.params.user_id}, req.body, {new: true});
        return res.status(200).json({
            updatedUser,
            success: {
                message: 'User updated successfully.'
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

// GET - /api/users/count
exports.getUsersCount = async (req, res, next) => {
    try{
        let usersCount = await db.User.countDocuments();
        return res.status(200).json({
            usersCount
        });
    }catch(err){
        return next(err);
    }
}