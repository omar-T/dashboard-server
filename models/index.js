const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promis = Promise;
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

module.exports.Admin = require('./admin');