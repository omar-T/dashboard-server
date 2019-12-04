const db = require('../models');
const jwt = require('jsonwebtoken');

// /api/auth/signin
exports.signin = async function(req, res, next){
    try{
        let admin = await db.Admin.findOne({
            email: req.body.email
        });
        let {id, email, accessToken, isSuper, isActive} = admin;
        let authCreds = `${req.body.email}:${req.body.password}`;
        let incomingToken = Buffer.from(authCreds).toString('base64');
        let isMatch = accessToken === incomingToken;
        if(isMatch){
            if(isActive){
                // create token (signing a token)
                let token = jwt.sign({
                    id, 
                    email
                }, process.env.SECRET_KEY);
                return res.status(200).json({
                    id,
                    email,
                    isSuper,
                    token
                });
            }else{
                return next({
                    status:400,
                    message: 'Your account is not activated yet!'
                });    
            }
        }else{
            return next({
                status:400,
                message: 'Invalid Email/Password'
            });
        }
    }catch(err){
        return next({
            status:400,
            message: 'Invalid Email/Password'
        });
    }
}

exports.signup = async function(req, res, next){
    try{
        // create an admin
        const newAdmin = {...req.body};
        const authCreds = `${newAdmin.email}:${newAdmin.password}`;
        newAdmin.accessToken = Buffer.from(authCreds).toString('base64');
        await db.Admin.create(newAdmin);
        return res.status(200).json({
            message: 'Signed Up successfully, please wait for the activation.'
        });
    }catch(err){
        // if a validation fails!
        if(err.code === 11000){
            err.message = 'Sorry, that email is already taken!'
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}