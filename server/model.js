const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {type: String,required: true},
    pwd: {type: String,required: true},
    type: {type: String,required: true},
    avatar: {type: String},
    desc: {type: String},
    title: {type: String},
    company: {type: String},
    money: {type: String}
})

const User = mongoose.model('User',userSchema);

module.exports = User