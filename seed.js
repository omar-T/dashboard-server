const db = require('./models');
// const faker = require('faker');

const email = 'otaha@aisolt.com';
const password = '123';
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
            db.Admin.create(superAdmin, (err, createdAdmin) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(createdAdmin);
                }
            });
        }
    }catch(err){
        return next(err);
    }
}

// exports.seedLogs = async function(req, res, next){
//     let users = await db.User.find();
//     users.forEach(u => {
//         let id = u._id;
//         for(let i = 0; i < 4; i++){
//             let random = Math.ceil(Math.random() * 4);
//             let logData = {
//                 userId: id,
//                 clickedDoc: faker.lorem.word(),
//                 createdAt: faker.date.recent(random)
//             };
//             db.Log.create(logData, (err, log) => {
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log(log);
//                 }
//             });
//         }
//     });
// }