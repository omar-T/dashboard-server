const db = require('./models');

const email = 'otaha@aisolt.com';
const password = 'winter';
const accessToken = Buffer.from(`${email}:${password}`).toString('base64');
const superAdmin = {
    name: 'Omar',
    surname: 'Taha',
    email,
    isSuper: true,
    isActive: true,
    accessToken
};

exports.seedSuperAdmin = async function(req, res, next){
    try{
        let admin = await db.Admin.findOne({email});
        if(!admin){
            db.Admin.create(superAdmin);
        }
    }catch(err){
        return next(err);
    }
}