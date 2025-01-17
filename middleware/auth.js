const jwt = require('jsonwebtoken');

// make sure the user is logged in - Authentication
exports.loginRequired = function(req, res, next){
    try{
        // Bearer <jwt>
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next();
            }else{
                return next({
                    status: 401,
                    message: 'Please log in first!'
                });
            }
        });
    }catch(err){
        return next({
            status: 401,
            message: 'Please log in first!'
        });
    }
}
