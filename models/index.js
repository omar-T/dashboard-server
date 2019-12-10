const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promis = Promise;
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
});

module.exports.Admin = require('./admin');
module.exports.User = require('./user');