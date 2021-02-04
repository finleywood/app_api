const mongoose = require('mongoose');
const { default: router } = require('../routes/authentication');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://finley:Kira2014!@app.diylb.mongodb.net/app');

var userSchema = new Schema({
    username: String,
    password: String
});

var userModel = mongoose.model('Users', userSchema);

module.exports = userModel;