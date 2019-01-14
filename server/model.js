const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {type: String,require: true},
    pwd: {type: String,require: true},
    type: {type: String,require: true},
    avatar: {type: String},
    desc: {type: String},
    title: {type: String},
    company: {type: String},
    money: {type: String}
})

const User = mongoose.model('User',userSchema);

module.exports = User